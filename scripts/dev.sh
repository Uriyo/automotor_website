#!/usr/bin/env bash
# Start both services for local dev.
#   - apps/agent FastAPI on :8001
#   - Next.js on :3000
# Ctrl-C stops both.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Pre-flight checks
if [ ! -f "$ROOT/apps/agent/.env" ]; then
  echo "✗ apps/agent/.env not found. Copy apps/agent/.env.example and fill it in." >&2
  exit 1
fi
if [ ! -f "$ROOT/.env" ] && [ ! -f "$ROOT/.env.local" ]; then
  echo "✗ Next .env not found. Copy .env.local.example to .env.local." >&2
  exit 1
fi
if [ ! -d "$ROOT/apps/agent/.venv" ]; then
  echo "✗ apps/agent/.venv not found. Run:" >&2
  echo "    cd apps/agent && python3.11 -m venv .venv && source .venv/bin/activate && pip install -e ." >&2
  exit 1
fi

cleanup() {
  echo
  echo "▸ stopping services..."
  kill 0 || true
}
trap cleanup EXIT INT TERM

(
  cd "$ROOT/apps/agent"
  # shellcheck disable=SC1091
  source .venv/bin/activate
  exec uvicorn app.main:app --reload --port "${AGENT_PORT:-8001}"
) &

(
  cd "$ROOT"
  exec npm run dev
) &

wait
