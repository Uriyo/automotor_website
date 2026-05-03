"""Configuration for the agent service.

All values come from environment variables (or `.env` in dev). We use
pydantic-settings for typed, validated config so a missing var fails
fast at startup instead of mysteriously at runtime.
"""

from __future__ import annotations

from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # Server
    agent_port: int = Field(default=8001)
    allowed_origins: str = Field(default="http://localhost:3000")

    # LLM
    llm_provider: Literal["gemini", "openai"] = Field(default="gemini")
    gemini_api_key: str | None = None
    openai_api_key: str | None = None

    # Supabase (shared with the Next app)
    supabase_url: str
    supabase_anon_key: str
    supabase_service_role_key: str
    supabase_jwt_secret: str

    # Checkpointing
    checkpoint_backend: Literal["sqlite", "postgres"] = Field(default="sqlite")
    checkpoint_sqlite_path: str = Field(default="./checkpoints.sqlite")
    supabase_db_url: str | None = None

    @property
    def allowed_origins_list(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]


settings = Settings()  # type: ignore[call-arg]
