"""LangGraph agent — Phase 1.

  START → agent → END

A single LLM node, but every turn checkpoints to the configured
backend so conversations resume across processes / requests.

Phase 2 will add a `tools` node and a conditional edge for tool calls.
The state shape (MessagesState) is forward-compatible.
"""

from __future__ import annotations

from typing import Any

from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.graph import END, START, MessagesState, StateGraph

from .model import get_chat_model
from .parts_search import build_system_prompt, search_parts


async def _agent_node(state: MessagesState) -> dict[str, Any]:
    """Pre-search inventory based on the most recent user message,
    then call the LLM with the system prompt + full history."""
    model = get_chat_model()

    # Find the most recent HumanMessage to drive parts pre-search.
    user_text = ""
    for msg in reversed(state["messages"]):
        if isinstance(msg, HumanMessage):
            content = msg.content
            if isinstance(content, str):
                user_text = content
            elif isinstance(content, list):
                user_text = " ".join(
                    (c.get("text") if isinstance(c, dict) else str(c))
                    for c in content
                    if (isinstance(c, str) or (isinstance(c, dict) and c.get("type") == "text"))
                )
            break

    parts = await search_parts(user_text)
    system_prompt = build_system_prompt(parts)

    # The full message list passed to the LLM: system prompt + history.
    messages = [SystemMessage(content=system_prompt), *state["messages"]]
    response = await model.ainvoke(messages)
    return {"messages": [response]}


def build_graph(checkpointer: object) -> Any:
    """Build and compile the agent graph against the given checkpointer."""
    builder = StateGraph(MessagesState)
    builder.add_node("agent", _agent_node)
    builder.add_edge(START, "agent")
    builder.add_edge("agent", END)
    return builder.compile(checkpointer=checkpointer)
