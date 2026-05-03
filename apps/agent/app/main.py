"""FastAPI app entry point for the AutoMotor agent service.

Endpoints:
  GET  /healthz                — liveness probe
  POST /chat                   — stream a turn through the agent graph

The Next.js app calls /chat server-side, forwarding the user's
Supabase access token as `Authorization: Bearer ...`. We verify the
token, run the graph with `thread_id` (= conversation_id), and stream
the assistant's text back as plain text/event-stream.
"""

from __future__ import annotations

from contextlib import asynccontextmanager
from typing import Annotated, AsyncIterator

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from langchain_core.messages import AIMessageChunk, HumanMessage
from pydantic import BaseModel, Field

from .auth import AuthUser, optional_user
from .checkpointer import make_checkpointer
from .config import settings
from .graph import build_graph


# --- App state ---


class AppState:
    """Singletons held for the lifetime of the FastAPI process."""

    graph: object | None = None
    _saver_cm = None  # contextmanager handle, kept open for process lifetime


state = AppState()


@asynccontextmanager
async def lifespan(_app: FastAPI):
    """Build the graph + checkpointer on startup; tear down on shutdown."""
    cm = make_checkpointer()
    saver = await cm.__aenter__()
    state._saver_cm = cm
    state.graph = build_graph(saver)
    print(
        f"[agent] startup — provider={settings.llm_provider} "
        f"checkpointer={settings.checkpoint_backend}"
    )
    try:
        yield
    finally:
        if state._saver_cm is not None:
            await state._saver_cm.__aexit__(None, None, None)
        state.graph = None
        state._saver_cm = None
        print("[agent] shutdown — checkpointer closed")


app = FastAPI(title="AutoMotor.AI Agent", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Schemas ---


class ImageInput(BaseModel):
    data: str  # base64 (no data: prefix)
    mime_type: str = Field(alias="mimeType")

    model_config = {"populate_by_name": True}


class ChatRequest(BaseModel):
    thread_id: str
    message: str
    image: ImageInput | None = None


# --- Routes ---


@app.get("/healthz")
async def healthz() -> dict[str, str | bool]:
    return {
        "ok": True,
        "graph": "ready" if state.graph is not None else "not-initialized",
        "provider": settings.llm_provider,
        "checkpointer": settings.checkpoint_backend,
    }


@app.post("/chat")
async def chat(
    body: ChatRequest,
    user: Annotated[AuthUser | None, Depends(optional_user)],
) -> StreamingResponse:
    if state.graph is None:
        return StreamingResponse(
            iter([b"[error: agent graph is not initialized]"]),
            media_type="text/plain",
            status_code=503,
        )

    # Compose the user message as either a plain string or multimodal
    # content array (for image inputs). LangChain normalizes both forms.
    if body.image:
        user_msg = HumanMessage(
            content=[
                {"type": "text", "text": body.message},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:{body.image.mime_type};base64,{body.image.data}",
                    },
                },
            ]
        )
    else:
        user_msg = HumanMessage(content=body.message)

    config = {
        "configurable": {
            "thread_id": body.thread_id,
            # Optional: anchor agent state by user when present so a
            # stolen thread_id can't read another user's checkpoint.
            "user_id": user.id if user else None,
        }
    }

    print(
        f"[chat] thread={body.thread_id[:8]} "
        f"user={(user.id[:8] + '…') if user else 'anon'} "
        f"msg=\"{body.message[:60]}{'…' if len(body.message) > 60 else ''}\""
    )

    async def stream() -> AsyncIterator[bytes]:
        try:
            async for event in state.graph.astream(  # type: ignore[union-attr]
                {"messages": [user_msg]},
                config=config,
                stream_mode="messages",
            ):
                # `stream_mode="messages"` yields tuples of (chunk, metadata).
                if not isinstance(event, tuple) or not event:
                    continue
                chunk = event[0]
                if not isinstance(chunk, AIMessageChunk):
                    continue
                content = chunk.content
                if isinstance(content, str) and content:
                    yield content.encode("utf-8")
                elif isinstance(content, list):
                    for part in content:
                        if isinstance(part, dict) and part.get("type") == "text":
                            text = part.get("text") or ""
                            if text:
                                yield text.encode("utf-8")
        except Exception as exc:
            print(f"[chat] graph stream error: {exc!r}")
            yield f"\n\n[error: agent run failed — {exc}]".encode("utf-8")

    return StreamingResponse(
        stream(),
        media_type="text/plain; charset=utf-8",
        headers={"X-Persistence": "checkpointed" if user else "anonymous"},
    )
