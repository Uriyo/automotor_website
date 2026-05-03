"""User auth: verify Supabase JWTs forwarded from the Next app.

The Next /api/chat route sends `Authorization: Bearer <supabase access
token>`. We decode and verify the JWT here using Supabase's JWT secret.
No round-trip to Supabase needed — the secret is symmetric.
"""

from __future__ import annotations

from dataclasses import dataclass

import jwt
from fastapi import Header, HTTPException, status

from .config import settings


@dataclass(frozen=True)
class AuthUser:
    id: str
    email: str | None


def verify_token(token: str) -> AuthUser | None:
    """Decode + verify a Supabase JWT. Returns None on failure."""
    try:
        payload = jwt.decode(
            token,
            settings.supabase_jwt_secret,
            algorithms=["HS256"],
            audience="authenticated",
        )
    except jwt.PyJWTError as exc:
        # Don't leak the reason to the client, but log for ops.
        print(f"[auth] jwt verification failed: {exc}")
        return None

    sub = payload.get("sub")
    if not sub:
        return None
    return AuthUser(id=str(sub), email=payload.get("email"))


async def optional_user(
    authorization: str | None = Header(default=None),
) -> AuthUser | None:
    """FastAPI dependency: returns the user if a valid Bearer token is
    present, None otherwise. We don't reject anonymous requests because
    the agent works for both — it just won't persist anything if there's
    no user."""
    if not authorization or not authorization.lower().startswith("bearer "):
        return None
    token = authorization.split(" ", 1)[1].strip()
    return verify_token(token)


async def required_user(
    authorization: str | None = Header(default=None),
) -> AuthUser:
    user = await optional_user(authorization)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid Authorization header.",
        )
    return user
