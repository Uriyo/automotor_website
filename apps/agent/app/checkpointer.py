"""LangGraph checkpoint saver factory.

Two backends are supported:

  - sqlite (default for dev): zero-config local file. Uses
    `AsyncSqliteSaver` from langgraph-checkpoint-sqlite.
  - postgres (production): Supabase Postgres via psycopg async pool.
    `AsyncPostgresSaver` from langgraph-checkpoint-postgres.

The saver is built once per process and reused. We expose an async
context manager so FastAPI can hold the connection open for the
service's lifetime.
"""

from __future__ import annotations

import os
from contextlib import asynccontextmanager
from typing import AsyncIterator

from .config import settings


@asynccontextmanager
async def make_checkpointer() -> AsyncIterator[object]:
    """Yield an initialized checkpointer for the configured backend.

    The yielded object is a `BaseCheckpointSaver` instance suitable for
    passing into `graph.compile(checkpointer=...)`.
    """
    if settings.checkpoint_backend == "sqlite":
        from langgraph.checkpoint.sqlite.aio import AsyncSqliteSaver

        # AsyncSqliteSaver.from_conn_string is itself an async context
        # manager that yields the saver — pass through.
        path = settings.checkpoint_sqlite_path
        os.makedirs(os.path.dirname(os.path.abspath(path)) or ".", exist_ok=True)
        async with AsyncSqliteSaver.from_conn_string(path) as saver:
            yield saver
        return

    if settings.checkpoint_backend == "postgres":
        if not settings.supabase_db_url:
            raise RuntimeError(
                "CHECKPOINT_BACKEND=postgres but SUPABASE_DB_URL is not set. "
                "Use the Supabase Session Pooler URL (Settings → Database → "
                "Connection string → Session Pooler tab)."
            )
        from langgraph.checkpoint.postgres.aio import AsyncPostgresSaver

        async with AsyncPostgresSaver.from_conn_string(
            settings.supabase_db_url
        ) as saver:
            await saver.setup()
            yield saver
        return

    raise RuntimeError(f"Unknown CHECKPOINT_BACKEND: {settings.checkpoint_backend}")
