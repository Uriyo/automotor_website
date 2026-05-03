"""Parts search backed by the Supabase `auto_parts` table.

Mirrors the previous TS implementation (`src/lib/parts-search.ts`) so
the agent's behavior is unchanged from the user's perspective.
"""

from __future__ import annotations

from supabase import Client, create_client

from .config import settings

_client: Client | None = None


def _supabase() -> Client:
    global _client
    if _client is None:
        _client = create_client(
            settings.supabase_url,
            settings.supabase_service_role_key,
        )
    return _client


async def search_parts(query: str, limit: int = 5) -> list[dict]:
    """Search auto_parts by name/description/make/model. Returns up to
    `limit` rows or an empty list. Failures are logged and swallowed
    so the agent can still respond conversationally."""
    if not query.strip():
        return []
    try:
        # PostgREST `or=` syntax via the `.or_()` chain.
        like = f"%{query}%"
        resp = (
            _supabase()
            .table("auto_parts")
            .select("*")
            .or_(
                f"part_name.ilike.{like},description.ilike.{like},"
                f"make.ilike.{like},model.ilike.{like}"
            )
            .limit(limit)
            .execute()
        )
        return resp.data or []
    except Exception as exc:
        print(f"[parts_search] query failed: {exc}")
        return []


def format_part(p: dict) -> str:
    lines = [f"- {p.get('part_name', 'Unknown part')}"]
    if pn := p.get("part_number"):
        lines.append(f"  Part #: {pn}")
    if make_or_model := " ".join(filter(None, [p.get("make"), p.get("model")])).strip():
        lines.append(f"  Vehicle: {make_or_model}")
    if (ys := p.get("year_start")) or (ye := p.get("year_end")):
        lines.append(f"  Years: {ys or '?'} – {p.get('year_end') or '?'}")
    if (price := p.get("price")) is not None:
        lines.append(f"  Price: ${price}")
    if cond := p.get("condition"):
        lines.append(f"  Condition: {cond}")
    if (mi := p.get("mileage")) is not None:
        lines.append(f"  Mileage: {mi:,} mi")
    if war := p.get("warranty"):
        lines.append(f"  Warranty: {war}")
    if desc := p.get("description"):
        lines.append(f"  {desc}")
    return "\n".join(lines)


def build_system_prompt(parts: list[dict]) -> str:
    base = (
        "You are AutoMotor AI, a helpful and knowledgeable auto parts search "
        "assistant. You help people find used auto parts — engines, "
        "transmissions, and other components.\n\n"
        "Be professional but friendly. Keep answers concise and useful. When "
        "referencing parts from the inventory, mention specific details like "
        "price, condition, and warranty."
    )

    if not parts:
        return (
            f"{base}\n\nNo matching parts were found in our current inventory "
            "for this query. Let the user know you couldn't find an exact "
            "match and suggest they try different search terms, a different "
            "year range, or a compatible part. Do NOT make up parts that "
            "aren't in the inventory."
        )

    formatted = "\n\n".join(format_part(p) for p in parts)
    return (
        f"{base}\n\nHere are the matching parts from our inventory:\n\n"
        f"{formatted}\n\nReference these specific parts in your answer. "
        "Include prices and key details. If the user asks about something "
        "not listed above, let them know it's not in current inventory."
    )
