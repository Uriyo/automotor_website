# AutoMotor.AI — Agent service

Stateful LangGraph agent that powers the AutoMotor chat. Runs as a
separate FastAPI process so it can:

- Hold long-lived stateful resources (checkpointer connections,
  LLM clients) without fighting Next.js's bundler
- Run turns longer than serverless function timeouts allow
- Be resumed by webhook (Twilio, Vapi, Stripe) without an active user
  request

The Next.js app calls this service via HTTPS for every chat turn.

## Quick start (local dev)

```bash
cd apps/agent
python3.11 -m venv .venv
source .venv/bin/activate
pip install -e .
cp .env.example .env
# Fill in: SUPABASE_*, GEMINI_API_KEY (or OPENAI_API_KEY + LLM_PROVIDER=openai),
# SUPABASE_JWT_SECRET (Supabase → Settings → API → JWT Secret)
uvicorn app.main:app --reload --port 8001
```

By default checkpoints are stored in a local SQLite file
(`./checkpoints.sqlite`). Switch to Postgres for production by setting
`CHECKPOINT_BACKEND=postgres` and `SUPABASE_DB_URL=...` (use the
Session Pooler URL).

## Endpoints

### `GET /healthz`

Returns service health. Use for load-balancer probes.

### `POST /chat`

Body:

```json
{
  "thread_id": "<conversation-uuid>",
  "message": "I need a 5.3L LS engine",
  "image": { "data": "<base64>", "mimeType": "image/jpeg" }
}
```

Headers:

- `Authorization: Bearer <supabase-access-token>` — optional. When
  present, the user is identified via JWT verification (no Supabase
  round-trip), and the response header `X-Persistence: checkpointed`
  confirms saved state. When absent, the agent still answers but
  checkpoints are anonymous (per-thread, no user binding).

Response: `text/plain` streamed body with the assistant's reply tokens.

## Configuration

See `.env.example` for all variables. The most important:

| Variable | Purpose |
| --- | --- |
| `LLM_PROVIDER` | `gemini` or `openai` |
| `GEMINI_API_KEY` / `OPENAI_API_KEY` | LLM credentials |
| `SUPABASE_URL` | Supabase project URL (shared with Next app) |
| `SUPABASE_SERVICE_ROLE_KEY` | For backend access to `auto_parts` etc. |
| `SUPABASE_JWT_SECRET` | Verifies user tokens forwarded from Next |
| `CHECKPOINT_BACKEND` | `sqlite` (dev) or `postgres` (prod) |

## Architecture notes

```
Next.js /api/chat  ──HTTPS──►  FastAPI /chat
       │                            │
       │                            ▼
       │                       LangGraph state graph
       │                            │
       │                            ▼
       │                  AsyncSqliteSaver / AsyncPostgresSaver
       │                            │
       └────► Supabase ◄────────────┘
              (auto_parts read by both;
               agent state lives in checkpointer DB only)
```

The `conversations` and `messages` tables are owned by the Next app
for sidebar display. The agent owns the checkpoint database
exclusively. Both use `auto_parts` read-only for inventory search.

## Deploying

Any Python host that supports long-lived processes works:

- Railway, Render, Fly.io, Modal, Google Cloud Run (with min 1
  instance to keep checkpointer warm), Hetzner / Digital Ocean droplet
- Use the included `Dockerfile`. Bind to `0.0.0.0:8001`.
- Set `CHECKPOINT_BACKEND=postgres` and `SUPABASE_DB_URL` to a Session
  Pooler URL for production.
