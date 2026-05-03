"""LLM provider factory.

Returns a LangChain chat model based on LLM_PROVIDER. Both providers
support tool-calling and streaming, so the graph code stays
provider-agnostic.
"""

from __future__ import annotations

from langchain_core.language_models.chat_models import BaseChatModel

from .config import settings


def get_chat_model() -> BaseChatModel:
    if settings.llm_provider == "openai":
        if not settings.openai_api_key:
            raise RuntimeError("OPENAI_API_KEY not set")
        from langchain_openai import ChatOpenAI

        return ChatOpenAI(
            api_key=settings.openai_api_key,
            model="gpt-4o-mini",
            temperature=0.4,
            streaming=True,
        )

    if not settings.gemini_api_key:
        raise RuntimeError(
            "GEMINI_API_KEY not set (or set LLM_PROVIDER=openai with OPENAI_API_KEY)."
        )
    from langchain_google_genai import ChatGoogleGenerativeAI

    return ChatGoogleGenerativeAI(
        google_api_key=settings.gemini_api_key,
        model="gemini-2.0-flash",
        temperature=0.4,
    )
