# AutoMotor.AI — Chat Agent Backend

## TL;DR

> **Quick Summary**: Replace the mock chat flow with a real AI-powered auto parts search agent. Build streaming API routes, modular LLM provider (Gemini/OpenAI), Supabase Auth, parts database with CSV import, and real conversation persistence.
> 
> **Deliverables**:
> - Streaming chat API route (`/api/chat`)
> - Modular LLM provider (Gemini + OpenAI, switchable via env)
> - Supabase Auth (email-based signup/login)
> - Auto parts table + CSV import script
> - Conversations & messages tables with RLS
> - Real chat page (replaces mock flow)
> - Real sidebar with actual past conversations
> - Auth UI (login/signup pages)
> 
> **Estimated Effort**: Large
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Task 1 (schema) → Task 3 (LLM provider) → Task 6 (chat API) → Task 8 (chat page) → Task 10 (sidebar) → Final Verification

---

## Context

### Original Request
Build the "agent part" of AutoMotor.AI — a ChatGPT-style auto parts search assistant. The UI design is complete (all mock data); now needs real backend/AI functionality.

### Interview Summary
**Key Discussions**:
- **LLM Provider**: Modular — Gemini (testing/dev) + OpenAI (production), switchable via environment variable
- **Parts Data**: CSV → import into Supabase → DB is source of truth for all parts queries
- **Conversations**: Persist ONLY for signed-up users; anonymous users get ephemeral in-memory sessions
- **Auth**: Supabase Auth with email-based signup/login
- **Agent**: Search & answer about auto parts (user query → AI searches DB → returns matching parts with details)
- **Streaming**: Token-by-token streaming (ChatGPT-like UX) via ReadableStream/SSE
- **Catalog**: Medium (500-5000 parts) — too large for context window, needs DB search approach
- **Test Strategy**: No automated tests; Agent QA scenarios are primary verification

### Gap Analysis
**Identified Gaps** (addressed):
- AI system prompt configuration → Default: auto parts assistant persona, configurable via code
- Rate limiting → Not included in MVP scope
- Parts not found handling → AI gracefully responds with "not found" and suggests alternatives
- Rich card rendering from AI → OUT of scope (future enhancement); AI returns text-only for now
- LiveStatusPanel → Leave as-is (mock); not connected to real flow
- Voice/Camera buttons → UI-only placeholders, no backend needed

---

## Work Objectives

### Core Objective
Transform the static mock chat into a working AI-powered auto parts search assistant with real database, authentication, and streaming responses.

### Concrete Deliverables
- `src/app/api/chat/route.ts` — Streaming chat endpoint
- `src/lib/llm/` — Modular LLM provider (provider.ts, gemini.ts, openai.ts)
- `src/lib/supabase-server.ts` — Server-side Supabase client (with auth)
- `src/lib/parts-search.ts` — Parts database search utility
- `src/app/auth/login/page.tsx` — Login page
- `src/app/auth/signup/page.tsx` — Signup page
- `src/components/AuthProvider.tsx` — Auth context provider
- `supabase/schema.sql` — Updated with auto_parts, conversations, messages tables
- `scripts/import-parts.ts` — CSV import script
- Modified: `src/app/chat/[id]/page.tsx` — Real streaming chat
- Modified: `src/components/Sidebar.tsx` — Real past conversations
- Modified: `src/app/layout.tsx` — Wrap with AuthProvider
- `.env.local.example` — Updated with new env vars

### Definition of Done
- [ ] User can type a question about auto parts and receive a streaming AI response
- [ ] AI searches the parts database and includes relevant parts in its answers
- [ ] Signed-up users see their past conversations in the sidebar
- [ ] Anonymous users can chat but see no history
- [ ] `next build` passes without errors
- [ ] Chat works with either Gemini or OpenAI by switching env var

### Must Have
- Streaming responses (not batch)
- Provider abstraction (swap LLM by changing env var only)
- Parts search integrated into AI responses
- Conversation persistence for authenticated users
- Anonymous chat without signup requirement
- Flexible parts schema (adaptable when user provides CSV)

### Must NOT Have (Guardrails)
- DO NOT modify existing card component designs (DiagnosisCard, QuoteCard, ComparisonTable, etc.)
- DO NOT touch mechanic/yard/admin dashboard pages
- DO NOT implement the "call 15 yards" quote generation flow
- DO NOT add phone/SMS functionality
- DO NOT modify SEO pages
- DO NOT add rate limiting (MVP)
- DO NOT add payment/Stripe integration
- DO NOT add new UI components beyond auth pages — use existing design patterns
- DO NOT over-abstract — no factory patterns, no dependency injection containers
- DO NOT add unnecessary comments or JSDoc — code should be self-explanatory

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: NONE
- **Framework**: N/A
- **QA Method**: Agent-Executed QA Scenarios (curl, Playwright, Supabase queries)

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **API/Backend**: Use Bash (curl) — Send requests, assert status + response fields
- **Frontend/UI**: Use Playwright — Navigate, interact, assert DOM, screenshot
- **Database**: Use Bash (Supabase CLI or psql) — Query tables, verify schema/data
- **Auth flows**: End-to-end via Playwright — signup, login, session verification

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — types, schema, config):
├── Task 1: Supabase schema (parts, conversations, messages tables) [quick]
├── Task 2: Environment config + server-side Supabase client [quick]
├── Task 3: Modular LLM provider abstraction [unspecified-high]
└── Task 4: Supabase Auth setup + auth helpers [unspecified-high]

Wave 2 (Core logic — depends on Wave 1):
├── Task 5: Parts search utility (depends: 1, 2) [unspecified-high]
├── Task 6: Streaming chat API route (depends: 2, 3) [deep]
├── Task 7: Auth UI — login/signup pages (depends: 4) [visual-engineering]
└── Task 8: CSV import script (depends: 1, 2) [quick]

Wave 3 (Integration — wires everything together):
├── Task 9: Replace mock chat page with real streaming (depends: 6, 5) [deep]
├── Task 10: Real sidebar with past conversations (depends: 4, 2) [visual-engineering]
└── Task 11: Auth provider + layout integration (depends: 4, 7) [quick]

Wave FINAL (Verification — 4 parallel reviews):
├── F1: Plan compliance audit (oracle)
├── F2: Code quality review (unspecified-high)
├── F3: Real manual QA (unspecified-high)
└── F4: Scope fidelity check (deep)
→ Present results → Get explicit user okay

Critical Path: Task 1 → Task 5 → Task 6 → Task 9 → F1-F4 → user okay
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 4 (Waves 1 & 2)
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1 | — | 5, 8 | 1 |
| 2 | — | 5, 6, 8, 10 | 1 |
| 3 | — | 6 | 1 |
| 4 | — | 7, 10, 11 | 1 |
| 5 | 1, 2 | 9 | 2 |
| 6 | 2, 3 | 9 | 2 |
| 7 | 4 | 11 | 2 |
| 8 | 1, 2 | — | 2 |
| 9 | 5, 6 | — | 3 |
| 10 | 4, 2 | — | 3 |
| 11 | 4, 7 | — | 3 |

### Agent Dispatch Summary

- **Wave 1**: 4 tasks — T1 → `quick`, T2 → `quick`, T3 → `unspecified-high`, T4 → `unspecified-high`
- **Wave 2**: 4 tasks — T5 → `unspecified-high`, T6 → `deep`, T7 → `visual-engineering`, T8 → `quick`
- **Wave 3**: 3 tasks — T9 → `deep`, T10 → `visual-engineering`, T11 → `quick`
- **FINAL**: 4 tasks — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [ ] 1. Supabase Schema — auto_parts, conversations, messages tables

  **What to do**:
  - Add three new tables to `supabase/schema.sql`:
    - `auto_parts` — Flexible parts catalog table with columns: `id` (uuid PK), `part_name` (text, not null), `part_number` (text), `category` (text — e.g. "engine", "transmission"), `make` (text), `model` (text), `year_start` (int), `year_end` (int), `price` (numeric), `condition` (text — "used", "refurbished"), `mileage` (int), `warranty` (text), `description` (text), `metadata` (jsonb — catch-all for CSV columns not mapped), `created_at` (timestamptz). Add a GIN index on `to_tsvector('english', part_name || ' ' || coalesce(description, '') || ' ' || coalesce(make, '') || ' ' || coalesce(model, ''))` for full-text search.
    - `conversations` — `id` (uuid PK), `user_id` (uuid references auth.users, not null), `title` (text), `created_at` (timestamptz), `updated_at` (timestamptz). RLS: users can only read/write their own conversations.
    - `messages` — `id` (uuid PK), `conversation_id` (uuid references conversations, not null), `role` (text — 'user' or 'assistant'), `content` (text, not null), `metadata` (jsonb — for parts references, etc.), `created_at` (timestamptz). RLS: users can only access messages in their own conversations.
  - Add RLS policies for all three tables:
    - `auto_parts`: anon and authenticated can SELECT (public read)
    - `conversations`: authenticated users can INSERT/SELECT/UPDATE/DELETE their own rows only (WHERE user_id = auth.uid())
    - `messages`: authenticated users can INSERT/SELECT on messages belonging to their conversations only (JOIN on conversations.user_id = auth.uid())
  - Follow the existing schema pattern in `supabase/schema.sql` (create table if not exists, alter table enable row level security, create policy)

  **Must NOT do**:
  - Don't modify existing tables (contact_submissions, yard_signups, mechanic_signups)
  - Don't add triggers or functions — keep it simple SQL
  - Don't add columns specific to the "call 15 yards" flow (no quotes, no yard references)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single file edit (SQL), straightforward schema definition following existing patterns
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `playwright`: No browser interaction needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4)
  - **Blocks**: Tasks 5, 8
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `supabase/schema.sql` (entire file) — Follow exact pattern: `create table if not exists`, `alter table ... enable row level security`, `create policy`. Match naming conventions (snake_case, descriptive policy names).

  **API/Type References**:
  - Supabase Auth provides `auth.uid()` function for RLS policies — use this for user_id checks
  - `auth.users` table is built into Supabase — reference it for foreign keys

  **External References**:
  - Supabase full-text search: use `to_tsvector` / `ts_query` on PostgreSQL — this is native Postgres FTS via Supabase

  **WHY Each Reference Matters**:
  - `supabase/schema.sql`: The executor must match the exact DDL style so all schema stays in one consistent file
  - `auth.uid()` / `auth.users`: Critical for RLS — without these, row-level security won't work with Supabase Auth

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Schema SQL is valid and tables can be created
    Tool: Bash
    Preconditions: Access to supabase/schema.sql file
    Steps:
      1. Read supabase/schema.sql and verify it contains CREATE TABLE statements for auto_parts, conversations, messages
      2. Verify auto_parts has columns: id, part_name, part_number, category, make, model, year_start, year_end, price, condition, mileage, warranty, description, metadata, created_at
      3. Verify conversations has columns: id, user_id, title, created_at, updated_at
      4. Verify messages has columns: id, conversation_id, role, content, metadata, created_at
      5. Verify RLS is enabled on all 3 new tables (alter table ... enable row level security)
      6. Verify full-text search index exists on auto_parts
      7. Run `npx next build` to verify no TypeScript compilation issues from schema changes
    Expected Result: All 3 tables defined with correct columns, RLS policies, and FTS index. Build passes.
    Failure Indicators: Missing table, missing column, no RLS policy, no FTS index
    Evidence: .sisyphus/evidence/task-1-schema-validation.txt

  Scenario: Existing tables not modified
    Tool: Bash
    Preconditions: Git repo with existing schema
    Steps:
      1. Run `git diff supabase/schema.sql`
      2. Verify the diff only ADDS new content after line 81
      3. Verify lines 1-81 are unchanged (contact_submissions, yard_signups, mechanic_signups)
    Expected Result: No modifications to existing table definitions
    Failure Indicators: Any deletions or modifications in lines 1-81
    Evidence: .sisyphus/evidence/task-1-no-existing-changes.txt
  ```

  **Commit**: YES
  - Message: `feat(db): add auto_parts, conversations, messages schema`
  - Files: `supabase/schema.sql`

- [ ] 2. Environment Config + Server-Side Supabase Client

  **What to do**:
  - Update `.env.local.example` to include all new env vars:
    ```
    NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
    SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
    LLM_PROVIDER=gemini
    GEMINI_API_KEY=your-gemini-key
    OPENAI_API_KEY=your-openai-key
    ```
  - Create `src/lib/supabase-server.ts` — Server-side Supabase client factory:
    - `getSupabaseServer()` — Creates a Supabase client using `SUPABASE_SERVICE_ROLE_KEY` for server-side operations (API routes, CSV import)
    - `getSupabaseAuth(cookieHeader: string)` — Creates a client that forwards the user's auth cookie for authenticated server-side requests
    - Export TypeScript types for the new tables: `AutoPart`, `Conversation`, `Message`
  - Keep existing `src/lib/supabase.ts` unchanged — it's the client-side singleton

  **Must NOT do**:
  - Don't modify `src/lib/supabase.ts` — it's used throughout the frontend
  - Don't install `@supabase/ssr` or other new packages — use `@supabase/supabase-js` createClient with service role key for server
  - Don't create `.env.local` with real secrets

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Two small files — env example + server client utility
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4)
  - **Blocks**: Tasks 5, 6, 8, 10
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `src/lib/supabase.ts` (entire file, 56 lines) — Follow the same singleton pattern, same env var validation style, same type export pattern. The server client should feel like a sibling to this file.
  - `.env.local.example` (2 lines) — Extend this file, don't replace it

  **API/Type References**:
  - `@supabase/supabase-js` `createClient` — accepts url + key. For server-side, pass `SUPABASE_SERVICE_ROLE_KEY` as the key. Service role bypasses RLS.
  - Types to export should match the schema from Task 1: `AutoPart` (matches auto_parts columns), `Conversation` (matches conversations columns), `Message` (matches messages columns)

  **WHY Each Reference Matters**:
  - `src/lib/supabase.ts`: The executor must see the coding style (singleton, env validation with throw, type exports) to create a matching server file
  - `.env.local.example`: Must extend, not replace — existing Supabase vars are already there

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Server Supabase client module is importable
    Tool: Bash
    Preconditions: File created at src/lib/supabase-server.ts
    Steps:
      1. Verify file exists: `ls src/lib/supabase-server.ts`
      2. Verify it exports getSupabaseServer and getSupabaseAuth: grep for both function names
      3. Verify it exports types AutoPart, Conversation, Message: grep for type/interface exports
      4. Run `npx next build` to confirm no import/type errors
    Expected Result: File exists, exports all expected functions and types, build passes
    Failure Indicators: Missing exports, build failure, type errors
    Evidence: .sisyphus/evidence/task-2-server-client.txt

  Scenario: .env.local.example contains all required vars
    Tool: Bash
    Preconditions: .env.local.example updated
    Steps:
      1. Read .env.local.example
      2. Verify it contains: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, LLM_PROVIDER, GEMINI_API_KEY, OPENAI_API_KEY
      3. Verify no real secrets are present (all values should be placeholder strings)
    Expected Result: All 6 env vars listed with placeholder values
    Failure Indicators: Missing env var, real API key committed
    Evidence: .sisyphus/evidence/task-2-env-example.txt
  ```

  **Commit**: YES (groups with Task 3)
  - Message: `feat(api): add server supabase client and LLM provider abstraction`
  - Files: `src/lib/supabase-server.ts`, `.env.local.example`

- [ ] 3. Modular LLM Provider Abstraction

  **What to do**:
  - Create `src/lib/llm/` directory with three files:
    - `src/lib/llm/types.ts` — Shared types:
      ```typescript
      type LLMMessage = { role: 'system' | 'user' | 'assistant'; content: string }
      type LLMStreamOptions = { messages: LLMMessage[]; temperature?: number; maxTokens?: number }
      interface LLMProvider { stream(options: LLMStreamOptions): Promise<ReadableStream<string>> }
      ```
    - `src/lib/llm/gemini.ts` — Gemini implementation:
      - Use `@google/generative-ai` package (install it)
      - Implement `LLMProvider` interface
      - `stream()` calls Gemini's streaming API and returns a `ReadableStream<string>` that yields text chunks
      - Initialize with `GEMINI_API_KEY` env var, model `gemini-2.0-flash` (fast + cheap for dev)
    - `src/lib/llm/openai.ts` — OpenAI implementation:
      - Use `openai` package (install it)
      - Implement `LLMProvider` interface
      - `stream()` calls OpenAI's streaming chat completion and returns `ReadableStream<string>` yielding text chunks
      - Initialize with `OPENAI_API_KEY` env var, model `gpt-4o-mini`
    - `src/lib/llm/index.ts` — Factory/entry point:
      - `getLLMProvider(): LLMProvider` — Reads `LLM_PROVIDER` env var ("gemini" or "openai"), returns the appropriate instance
      - Singleton — reuses provider instance
      - Throws clear error if provider is unknown or API key is missing
  - The key design: caller code only imports from `src/lib/llm/index.ts` and uses `LLMProvider` interface. Never references Gemini/OpenAI directly.

  **Must NOT do**:
  - Don't add LangChain, Vercel AI SDK, or any heavy abstraction framework — raw SDK calls only
  - Don't add retry logic, fallback chains, or complex error handling — keep it simple
  - Don't add logging, telemetry, or analytics

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Multi-file module with external SDK integration; needs careful interface design
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4)
  - **Blocks**: Task 6
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `src/lib/supabase.ts` — Singleton client pattern (env validation, lazy init, throw on missing config). Mirror this style for LLM provider factory.

  **External References**:
  - `@google/generative-ai` — Gemini SDK. Use `GoogleGenerativeAI(apiKey)` → `getGenerativeModel({ model })` → `generateContentStream()`
  - `openai` — OpenAI SDK. Use `new OpenAI({ apiKey })` → `chat.completions.create({ stream: true })` → iterate async

  **WHY Each Reference Matters**:
  - `src/lib/supabase.ts`: Establishes the codebase's utility module pattern — singleton, env validation, clean exports
  - External SDK docs: The executor needs correct API calls — Gemini and OpenAI streaming APIs differ significantly

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: LLM provider module structure is correct
    Tool: Bash
    Preconditions: src/lib/llm/ directory created with all files
    Steps:
      1. Verify directory exists: ls src/lib/llm/
      2. Verify files: types.ts, gemini.ts, openai.ts, index.ts all exist
      3. Verify types.ts exports LLMMessage, LLMStreamOptions, LLMProvider
      4. Verify index.ts exports getLLMProvider function
      5. Verify gemini.ts and openai.ts each implement LLMProvider interface
      6. Run `npx next build` — must pass (type checking)
    Expected Result: All 4 files exist, correct exports, build passes
    Failure Indicators: Missing file, missing export, type error in build
    Evidence: .sisyphus/evidence/task-3-llm-structure.txt

  Scenario: Provider factory throws on missing config
    Tool: Bash
    Preconditions: No LLM env vars set
    Steps:
      1. Create a small test script that imports getLLMProvider and calls it without env vars
      2. Verify it throws an error mentioning the missing env var
    Expected Result: Clear error message about missing LLM_PROVIDER or API key
    Failure Indicators: Silent failure, undefined behavior, generic error
    Evidence: .sisyphus/evidence/task-3-missing-config-error.txt
  ```

  **Commit**: YES (groups with Task 2)
  - Message: `feat(api): add server supabase client and LLM provider abstraction`
  - Files: `src/lib/llm/types.ts`, `src/lib/llm/gemini.ts`, `src/lib/llm/openai.ts`, `src/lib/llm/index.ts`
  - Pre-commit: `npx next build`

- [ ] 4. Supabase Auth Setup + Auth Helpers

  **What to do**:
  - Create `src/lib/auth.ts` — Auth helper utilities:
    - `getCurrentUser(cookieHeader: string): Promise<User | null>` — Gets the currently authenticated user from request cookies. Uses the Supabase client with the user's auth token.
    - `type AuthUser = { id: string; email: string }` — Simplified user type for the app
  - Create `src/middleware.ts` (Next.js middleware at project root level in `src/`):
    - Refresh the Supabase auth session on every request (prevents token expiry)
    - Do NOT protect any routes — all routes remain publicly accessible
    - The middleware only refreshes tokens, it doesn't block access
  - **Important**: Supabase Auth is built into Supabase. No additional packages needed. The auth endpoints are handled by Supabase's hosted auth service. The frontend will use `supabase.auth.signUp()`, `supabase.auth.signInWithPassword()`, `supabase.auth.signOut()` from the existing `@supabase/supabase-js` package.

  **Must NOT do**:
  - Don't install NextAuth, Auth.js, or any third-party auth library
  - Don't protect routes with middleware redirects — anonymous users must access everything
  - Don't add OAuth providers (Google, GitHub) — email-only for now
  - Don't add password reset flow — MVP

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Auth middleware and helpers require careful cookie/session handling
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3)
  - **Blocks**: Tasks 7, 10, 11
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `src/lib/supabase.ts` — Client-side Supabase singleton. The auth helpers will use this on the client side. Follow the same export/type pattern.

  **API/Type References**:
  - `@supabase/supabase-js` provides `supabase.auth.getUser()`, `supabase.auth.getSession()` — these read auth state from cookies/localStorage
  - Next.js middleware: `src/middleware.ts` with `export function middleware(request: NextRequest)` and `export const config = { matcher: [...] }`

  **External References**:
  - Supabase Auth JS docs: `supabase.auth.signUp({ email, password })`, `supabase.auth.signInWithPassword({ email, password })`, `supabase.auth.signOut()`
  - For server-side auth in Next.js API routes: pass the Authorization header or cookie to create an authenticated Supabase client

  **WHY Each Reference Matters**:
  - `src/lib/supabase.ts`: Auth helpers extend the same Supabase client infrastructure
  - Supabase Auth API: The executor must know the exact method signatures for signup/login/session

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Auth helpers module is importable and well-typed
    Tool: Bash
    Preconditions: src/lib/auth.ts and src/middleware.ts created
    Steps:
      1. Verify src/lib/auth.ts exists and exports getCurrentUser and AuthUser
      2. Verify src/middleware.ts exists and exports middleware function + config
      3. Run `npx next build` — must pass
    Expected Result: Both files exist with correct exports, build passes
    Failure Indicators: Missing file, type errors, build failure
    Evidence: .sisyphus/evidence/task-4-auth-structure.txt

  Scenario: Middleware does not block anonymous access
    Tool: Playwright
    Preconditions: Dev server running (`npm run dev`)
    Steps:
      1. Navigate to http://localhost:3000 (home page) — should load normally
      2. Navigate to http://localhost:3000/chat/test — should load the chat page
      3. Verify no redirect to login page occurs
      4. Screenshot both pages
    Expected Result: Both pages load without redirect, no auth wall
    Failure Indicators: Redirect to /auth/login, 401 error, blank page
    Evidence: .sisyphus/evidence/task-4-no-auth-wall.png
  ```

  **Commit**: YES
  - Message: `feat(auth): add Supabase Auth setup and helpers`
  - Files: `src/lib/auth.ts`, `src/middleware.ts`

- [ ] 5. Parts Search Utility

  **What to do**:
  - Create `src/lib/parts-search.ts`:
    - `searchParts(query: string, limit?: number): Promise<AutoPart[]>` — Searches the `auto_parts` table using PostgreSQL full-text search
    - Use Supabase's `.textSearch()` or raw SQL via `.rpc()` to query the tsvector index created in Task 1
    - Parse the user's natural language query into search terms (split by spaces, remove stop words like "for", "a", "the")
    - Support filtering by make/model/year if detected in query (e.g., "2014 Silverado engine" → make: "Chevrolet", model: "Silverado", year range includes 2014)
    - Return top 5 results by default, ordered by relevance
    - If no results found, return empty array (caller handles the "not found" case)
  - Create `src/lib/parts-search-prompt.ts`:
    - Export `buildSystemPrompt(parts: AutoPart[]): string` — Builds the AI system prompt
    - System prompt should:
      - Identify the AI as "AutoMotor AI", a helpful auto parts search assistant
      - Include the matching parts data formatted as structured text (not raw JSON)
      - Instruct the AI to reference specific parts from the search results in its answers
      - If no parts found, instruct AI to say it couldn't find matching parts and suggest the user try different terms
      - Keep tone professional but friendly, automotive-knowledgeable

  **Must NOT do**:
  - Don't implement vector/embedding search — use PostgreSQL FTS only
  - Don't add caching
  - Don't call external APIs (parts data comes from Supabase only)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Search logic with query parsing and prompt engineering requires careful design
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8)
  - **Blocks**: Task 9
  - **Blocked By**: Tasks 1, 2

  **References**:

  **Pattern References**:
  - `src/lib/supabase-server.ts` (from Task 2) — Use `getSupabaseServer()` to query parts. Follow the same module pattern.

  **API/Type References**:
  - `AutoPart` type (from Task 2's supabase-server.ts) — Return type for search results
  - Supabase JS `.from('auto_parts').select('*').textSearch('fts_column', query)` — Full-text search API

  **External References**:
  - PostgreSQL full-text search via Supabase: `to_tsquery()` with `&` for AND, `|` for OR between terms

  **WHY Each Reference Matters**:
  - `supabase-server.ts`: The search utility builds on the server client from Task 2
  - `AutoPart` type: Ensures type-safe returns from search
  - Supabase FTS: The executor must know the correct Supabase JS API for full-text search

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Parts search function returns results for valid query
    Tool: Bash
    Preconditions: Parts table has seed data (from Task 8 CSV import), dev server running
    Steps:
      1. Create a small Node script that imports searchParts and calls it with "Silverado engine"
      2. Verify it returns an array of AutoPart objects
      3. Verify each result has: id, part_name, make, model, price (at minimum)
      4. Verify results are relevant (contain "Silverado" or "engine" in fields)
    Expected Result: Array of 1-5 AutoPart objects with relevant parts data
    Failure Indicators: Empty array when data exists, wrong types, SQL error
    Evidence: .sisyphus/evidence/task-5-search-results.txt

  Scenario: Parts search returns empty array for non-matching query
    Tool: Bash
    Preconditions: Parts table has seed data
    Steps:
      1. Call searchParts with "zzzznotapart12345"
      2. Verify it returns an empty array []
      3. Verify no error is thrown
    Expected Result: Empty array, no error
    Failure Indicators: Throws error, returns undefined/null
    Evidence: .sisyphus/evidence/task-5-empty-search.txt
  ```

  **Commit**: YES (groups with Task 6)
  - Message: `feat(chat): add streaming chat API with parts search`
  - Files: `src/lib/parts-search.ts`, `src/lib/parts-search-prompt.ts`

- [ ] 6. Streaming Chat API Route

  **What to do**:
  - Create `src/app/api/chat/route.ts` — POST endpoint for chat:
    - Accept JSON body: `{ message: string, conversationId?: string }`
    - Flow:
      1. Parse request body, validate `message` is non-empty string
      2. Check auth: try to get current user from request cookies (optional — anonymous is fine)
      3. If `conversationId` provided AND user is authenticated: load previous messages from `messages` table
      4. Call `searchParts(message)` to find relevant parts
      5. Build system prompt with `buildSystemPrompt(parts)`
      6. Construct message array: [system prompt, ...previous messages, new user message]
      7. Call `getLLMProvider().stream({ messages })` to get a ReadableStream
      8. If user is authenticated:
         - Create or reuse conversation (create new if no conversationId)
         - Auto-generate conversation title from first user message (first 50 chars)
         - Save user message to DB immediately
         - Collect streamed response, save assistant message to DB after stream completes
      9. Return streaming response with `new Response(stream, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Transfer-Encoding': 'chunked', 'X-Conversation-Id': conversationId } })` — include `X-Conversation-Id` header so the client can track the conversation
    - Error handling: Return JSON `{ error: string }` with appropriate status codes (400 for bad input, 500 for LLM/DB errors)
  - The response streams raw text chunks (not SSE format) — the client reads via `response.body.getReader()`

  **Must NOT do**:
  - Don't use Server-Sent Events format (text/event-stream) — use plain text streaming
  - Don't require authentication — anonymous users must be able to chat
  - Don't add rate limiting
  - Don't stream rich card components — text only for now
  - Don't implement conversation branching or editing

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Core integration point — combines LLM, DB, auth, streaming. Most complex task in the plan.
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 7, 8)
  - **Blocks**: Task 9
  - **Blocked By**: Tasks 2, 3

  **References**:

  **Pattern References**:
  - `src/lib/llm/index.ts` (from Task 3) — Use `getLLMProvider().stream()` to get ReadableStream
  - `src/lib/supabase-server.ts` (from Task 2) — Use `getSupabaseServer()` for DB operations, `getSupabaseAuth()` for user session
  - `src/lib/parts-search.ts` (from Task 5) — Use `searchParts()` for parts lookup
  - `src/lib/parts-search-prompt.ts` (from Task 5) — Use `buildSystemPrompt()` for system prompt
  - `src/lib/auth.ts` (from Task 4) — Use `getCurrentUser()` to check if user is authenticated

  **API/Type References**:
  - Next.js App Router API route: `export async function POST(request: Request) { ... }`
  - `Response` with `ReadableStream` for streaming: `new Response(readableStream, { headers })`
  - `Conversation`, `Message` types from Task 2

  **WHY Each Reference Matters**:
  - This task wires together ALL previous tasks. The executor must understand how each module connects.
  - LLM provider: Source of streaming content
  - Parts search: Enriches AI responses with real data
  - Auth: Determines whether to persist conversation
  - Supabase server: Database operations for messages

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Anonymous user can send a message and receive streaming response
    Tool: Bash (curl)
    Preconditions: Dev server running (npm run dev), LLM API key configured in .env.local
    Steps:
      1. curl -X POST http://localhost:3000/api/chat \
           -H "Content-Type: application/json" \
           -d '{"message":"What engines do you have for a 2014 Silverado?"}' \
           --no-buffer -o response.txt
      2. Verify response status is 200
      3. Verify response.txt contains text (not empty)
      4. Verify response mentions auto parts or Silverado (AI understood the query)
    Expected Result: 200 status, streaming text response with relevant content
    Failure Indicators: 500 error, empty response, non-streaming (all at once), auth error
    Evidence: .sisyphus/evidence/task-6-anonymous-chat.txt

  Scenario: Invalid request returns proper error
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -X POST http://localhost:3000/api/chat \
           -H "Content-Type: application/json" \
           -d '{"message":""}' -w "%{http_code}"
      2. Verify response status is 400
      3. Verify response body contains error message about empty message
    Expected Result: 400 status with JSON error: { "error": "..." }
    Failure Indicators: 200 status with empty response, 500 error, no error message
    Evidence: .sisyphus/evidence/task-6-validation-error.txt

  Scenario: Authenticated user's messages are saved to database
    Tool: Bash (curl + Supabase)
    Preconditions: Dev server running, test user signed up and logged in (auth cookie available)
    Steps:
      1. Send chat request with valid auth cookie and no conversationId
      2. Verify response streams successfully
      3. Query conversations table: verify new row created with user_id matching test user
      4. Query messages table: verify 2 rows (user message + assistant response) linked to conversation
    Expected Result: Conversation created, both messages saved with correct roles
    Failure Indicators: No DB records, wrong user_id, missing assistant message
    Evidence: .sisyphus/evidence/task-6-auth-message-save.txt
  ```

  **Commit**: YES (groups with Task 5)
  - Message: `feat(chat): add streaming chat API with parts search`
  - Files: `src/app/api/chat/route.ts`
  - Pre-commit: `npx next build`

- [ ] 7. Auth UI — Login & Signup Pages

  **What to do**:
  - Create `src/app/auth/login/page.tsx` — Login page:
    - Simple form: email + password inputs, "Sign In" button
    - Use the existing design system: `bg-bg`, `bg-panel`, `border-line`, `text-primary`, `orange-DEFAULT` for button
    - On submit: call `supabase.auth.signInWithPassword({ email, password })`
    - On success: redirect to `/` (home) or the previous page
    - Show error message below form on failure (invalid credentials)
    - Link to signup page: "Don't have an account? Sign up"
  - Create `src/app/auth/signup/page.tsx` — Signup page:
    - Simple form: email + password + confirm password inputs, "Create Account" button
    - Same design system as login
    - On submit: validate passwords match, call `supabase.auth.signUp({ email, password })`
    - On success: show "Check your email for confirmation" message (Supabase default flow)
    - Show error messages for validation failures
    - Link to login page: "Already have an account? Sign in"
  - Both pages: minimal, clean, centered card layout. Match the existing dark theme. Use `"use client"` directive.

  **Must NOT do**:
  - Don't add OAuth buttons (Google, GitHub, etc.)
  - Don't add password reset flow
  - Don't add email verification UI beyond the "check your email" message
  - Don't add complex validation (just email format + passwords match + min 6 chars)
  - Don't add loading spinners or animations beyond simple disabled state on button

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI pages that must match existing dark theme design system
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 6, 8)
  - **Blocks**: Task 11
  - **Blocked By**: Task 4

  **References**:

  **Pattern References**:
  - `src/app/contact/page.tsx` (if it has a form) — Follow the existing form pattern in the codebase
  - `src/components/ChatInput.tsx` — Input styling reference: `bg-transparent`, `text-text-primary`, `placeholder:text-text-tertiary`, `border-line` classes
  - `src/app/globals.css` — Design tokens: `--bg`, `--panel`, `--line`, `--text-primary`, `--orange-DEFAULT`, etc.

  **API/Type References**:
  - `supabase.auth.signInWithPassword({ email, password })` — Returns `{ data: { user, session }, error }`
  - `supabase.auth.signUp({ email, password })` — Returns `{ data: { user, session }, error }`
  - `getSupabase()` from `src/lib/supabase.ts` — Client-side Supabase instance

  **WHY Each Reference Matters**:
  - `ChatInput.tsx`: Shows the codebase's input element styling conventions (Tailwind classes for the dark theme)
  - `globals.css`: Contains all CSS custom properties — the auth pages must use these, not hardcoded colors
  - Supabase Auth API: Exact method signatures for sign in/up

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Login page renders with correct form elements
    Tool: Playwright
    Preconditions: Dev server running (npm run dev)
    Steps:
      1. Navigate to http://localhost:3000/auth/login
      2. Assert page contains: email input (type="email"), password input (type="password"), submit button
      3. Assert submit button text contains "Sign In" (case-insensitive)
      4. Assert link to signup page exists with text containing "Sign up"
      5. Screenshot the page
    Expected Result: All form elements present, dark theme styling visible
    Failure Indicators: 404 page, missing inputs, wrong styling (white/light background)
    Evidence: .sisyphus/evidence/task-7-login-page.png

  Scenario: Signup page validates password match
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3000/auth/signup
      2. Fill email: "test@example.com"
      3. Fill password: "password123"
      4. Fill confirm password: "differentpassword"
      5. Click submit button
      6. Assert error message appears about passwords not matching
    Expected Result: Form shows validation error, does not submit
    Failure Indicators: Form submits with mismatched passwords, no error shown
    Evidence: .sisyphus/evidence/task-7-password-mismatch.png
  ```

  **Commit**: YES (groups with Task 11)
  - Message: `feat(auth): add login/signup pages and AuthProvider`
  - Files: `src/app/auth/login/page.tsx`, `src/app/auth/signup/page.tsx`

- [ ] 8. CSV Parts Import Script

  **What to do**:
  - Create `scripts/import-parts.ts` — A Node.js/tsx script to import a CSV file into the `auto_parts` table:
    - First, install `tsx` as a devDependency: `npm install -D tsx` (needed to run TypeScript scripts directly)
    - Usage: `npx tsx scripts/import-parts.ts path/to/parts.csv`
    - Read CSV file, parse rows (use simple CSV parsing — split by comma, handle quoted fields)
    - Map CSV columns to `auto_parts` table columns. Use a configurable column mapping at the top of the file:
      ```typescript
      const COLUMN_MAP: Record<string, string> = {
        'Part Name': 'part_name',
        'Part Number': 'part_number',
        'Category': 'category',
        // ... user can edit this mapping when they get their CSV
      }
      ```
    - Any unmapped columns go into the `metadata` jsonb field
    - Use `getSupabaseServer()` from `src/lib/supabase-server.ts` for DB access
    - Batch inserts (100 rows per batch) for performance
    - Print progress: "Imported 100/500 rows..." etc.
    - Print summary at end: total imported, total skipped (if any), total errors
  - Also create `scripts/sample-parts.csv` — A small sample CSV (10-15 rows) with realistic auto parts data for testing:
    - Columns: Part Name, Part Number, Category, Make, Model, Year Start, Year End, Price, Condition, Mileage, Warranty, Description
    - Include a mix: engines, transmissions, transfer cases for various makes (Chevrolet, Ford, Dodge)

  **Must NOT do**:
  - Don't use Papa Parse or other CSV libraries — keep it simple (stdlib only + string splitting)
  - Don't add a web UI for importing — CLI script only
  - Don't add data validation beyond basic null checks
  - Don't delete existing data before import (append only)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single utility script + sample data file. Straightforward I/O.
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 6, 7)
  - **Blocks**: None (but provides seed data for QA of other tasks)
  - **Blocked By**: Tasks 1, 2

  **References**:

  **Pattern References**:
  - `src/lib/supabase-server.ts` (from Task 2) — Use `getSupabaseServer()` for database inserts
  - `supabase/schema.sql` (from Task 1) — Reference the `auto_parts` table schema for column mapping

  **API/Type References**:
  - `AutoPart` type (from Task 2) — Matches the DB columns, use for type safety
  - Supabase `.from('auto_parts').insert([...])` — Batch insert API

  **WHY Each Reference Matters**:
  - `supabase-server.ts`: Provides the server-side Supabase client (service role, bypasses RLS)
  - Schema: The executor must map CSV columns to exact DB column names

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Sample CSV imports successfully
    Tool: Bash
    Preconditions: Supabase running with schema from Task 1 applied, .env.local configured
    Steps:
      1. Run `npx tsx scripts/import-parts.ts scripts/sample-parts.csv`
      2. Verify script prints progress messages
      3. Verify script prints "Imported X/Y rows" summary with 0 errors
      4. Query auto_parts table via Supabase: verify row count matches CSV row count (10-15)
      5. Verify a specific row has correct data (e.g., first Silverado engine)
    Expected Result: All sample rows imported, data matches CSV content
    Failure Indicators: Script error, 0 rows imported, data mismatch
    Evidence: .sisyphus/evidence/task-8-csv-import.txt

  Scenario: Script handles missing file gracefully
    Tool: Bash
    Preconditions: None
    Steps:
      1. Run `npx tsx scripts/import-parts.ts nonexistent.csv`
      2. Verify script prints a clear error message about file not found
      3. Verify exit code is non-zero
    Expected Result: Clear error message, non-zero exit
    Failure Indicators: Unhandled exception, stack trace without message, exit code 0
    Evidence: .sisyphus/evidence/task-8-missing-file-error.txt
  ```

  **Commit**: YES
  - Message: `feat(data): add CSV parts import script and sample data`
  - Files: `scripts/import-parts.ts`, `scripts/sample-parts.csv`

- [ ] 9. Replace Mock Chat Page with Real Streaming

  **What to do**:
  - Rewrite `src/app/chat/[id]/page.tsx` to replace the mock flow with real AI chat:
    - **Remove**: `MOCK_FLOW` constant, `mockQuotes` constant, all mock data, simulated delays, `LiveStatusPanel` usage (keep the import but don't render it — or remove the import)
    - **Keep**: The overall page structure (header, message list, ChatInput at bottom), message bubble styling (user/AI), typing indicator, auto-scroll behavior
    - **Add**:
      - State: `messages: MessageType[]` (replace mock), `isStreaming: boolean`, `conversationId: string | null`
      - On page load: if `?q=` search param exists, auto-send it as the first message
      - On message send (from ChatInput `onSubmit`):
        1. Add user message to state immediately
        2. Set isStreaming = true, add empty AI message to state
        3. `fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message, conversationId }) })`
        4. Read the response stream: `const reader = response.body.getReader()`
        5. In a loop: read chunks, decode to text, append to the last (AI) message's content
        6. When stream ends: set isStreaming = false
      - If user is authenticated and this is a new conversation: read `X-Conversation-Id` from the response headers and store it in state for subsequent messages
      - For authenticated users with an existing conversationId: load previous messages on mount by querying Supabase directly from the client: `getSupabase().from('messages').select('*').eq('conversation_id', id).order('created_at')` — RLS policies ensure users only see their own messages. No additional API route needed.
    - **Message type update**: Change `MessageType` to support streaming:
      ```typescript
      type MessageType = { role: 'user' | 'assistant'; content: string }
      ```
    - Keep the existing card component imports but don't render them in this task (they'll be wired up in a future phase when the AI can return structured data)

  **Must NOT do**:
  - Don't change the visual design of message bubbles
  - Don't modify ChatInput component
  - Don't render DiagnosisCard/QuoteCard/ComparisonTable from AI responses (text only for now)
  - Don't add message editing or regeneration
  - Don't add copy-to-clipboard on messages

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Complex state management with streaming, careful mock→real transition preserving UI
  - **Skills**: [`playwright`]
    - `playwright`: QA requires browser interaction to verify streaming chat works

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 10, 11)
  - **Blocks**: None
  - **Blocked By**: Tasks 5, 6

  **References**:

  **Pattern References**:
  - `src/app/chat/[id]/page.tsx` (CURRENT FILE — 446 lines) — This is the file being rewritten. Executor MUST read it fully to understand: message rendering JSX (keep), MOCK_FLOW (remove), mockQuotes (remove), LiveStatusPanel (remove usage), typing indicator (keep), auto-scroll (keep), ChatInput integration (keep).
  - `src/components/ChatInput.tsx` — Already has `onSubmit` prop. The chat page passes it to capture user messages. Don't modify this component.

  **API/Type References**:
  - `POST /api/chat` (from Task 6) — Request: `{ message: string, conversationId?: string }`, Response: streaming text
  - `ReadableStream` / `response.body.getReader()` — Standard fetch streaming API for reading chunks

  **WHY Each Reference Matters**:
  - `[id]/page.tsx`: The executor must understand what to keep vs remove. This is a surgical rewrite, not a full replacement. The message bubble JSX, layout, and scroll behavior should be preserved.
  - `ChatInput.tsx`: The `onSubmit` prop is the integration point — understanding its interface is critical.

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: User can send message and see streaming AI response
    Tool: Playwright
    Preconditions: Dev server running, LLM API key configured, parts data imported
    Steps:
      1. Navigate to http://localhost:3000/chat/new?q=What+engines+do+you+have+for+a+Silverado
      2. Wait for redirect to /chat/{id}
      3. Wait for AI response to appear (assistant message bubble)
      4. Verify the AI message content grows over time (streaming — check length at 1s vs 3s)
      5. Verify user message "What engines do you have for a Silverado" is displayed in a user bubble
      6. Verify typing indicator appears while streaming, disappears after
      7. Screenshot the completed chat
    Expected Result: User bubble + streaming AI response visible, typing indicator works
    Failure Indicators: No AI response, entire response appears at once (not streaming), error displayed
    Evidence: .sisyphus/evidence/task-9-streaming-chat.png

  Scenario: No mock data remains
    Tool: Bash
    Preconditions: Task complete
    Steps:
      1. grep -n "MOCK_FLOW\|mockQuotes\|Tommy.*Salvage\|Pick-n-Pull\|AFM Lifter" src/app/chat/[id]/page.tsx
      2. Verify no matches found
    Expected Result: Zero matches — all mock data removed
    Failure Indicators: Any mock data strings still present
    Evidence: .sisyphus/evidence/task-9-no-mock-data.txt

  Scenario: Multiple messages in a conversation
    Tool: Playwright
    Preconditions: Dev server running, LLM configured
    Steps:
      1. Navigate to http://localhost:3000/chat/new?q=Hi
      2. Wait for AI response to complete
      3. Type "What Ford transmissions do you have?" in ChatInput and press Enter
      4. Wait for second AI response
      5. Verify page shows 4 messages total (user, AI, user, AI)
      6. Verify auto-scroll keeps latest message visible
      7. Screenshot
    Expected Result: 4 messages visible, properly ordered, scrolled to bottom
    Failure Indicators: Messages missing, wrong order, scroll stuck at top
    Evidence: .sisyphus/evidence/task-9-multi-turn.png
  ```

  **Commit**: YES (groups with Task 10)
  - Message: `feat(chat): replace mock flow with real streaming + live sidebar`
  - Files: `src/app/chat/[id]/page.tsx`

- [ ] 10. Real Sidebar with Past Conversations

  **What to do**:
  - Modify `src/components/Sidebar.tsx` to show real past conversations for authenticated users:
    - **Remove**: The hardcoded `pastConversations` array (lines 21-30)
    - **Keep**: Everything else — categories, nav links, mobile hamburger, styling, layout
    - **Add**:
      - Import `getSupabase` from `src/lib/supabase.ts` (client-side)
      - `useEffect` to fetch conversations from Supabase on mount: `supabase.from('conversations').select('id, title, updated_at').order('updated_at', { ascending: false }).limit(20)`
      - Listen for auth state: `supabase.auth.onAuthStateChange()` — refetch conversations when user logs in/out
      - If user is NOT authenticated: show a subtle message like "Sign in to save your conversations" instead of the conversation list
      - If user IS authenticated but has no conversations: show "No conversations yet"
      - If user IS authenticated with conversations: show them in the same visual format as the current mock list
      - Each conversation links to `/chat/{conversation.id}`
      - Show relative time (e.g., "2h ago", "Yesterday") — use a simple helper function, no library needed
    - **Add "New Chat" button**: Already exists in current sidebar — make sure it links to `/` or `/chat/new`

  **Must NOT do**:
  - Don't change the sidebar visual design (colors, spacing, layout)
  - Don't modify the categories section or nav links
  - Don't add conversation deletion, renaming, or organizing
  - Don't add search/filter for conversations
  - Don't add real-time subscriptions (polling on focus is fine, or just load on mount)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI modification that must preserve existing design while adding dynamic data
  - **Skills**: [`playwright`]
    - `playwright`: QA requires browser verification of sidebar state changes

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 9, 11)
  - **Blocks**: None
  - **Blocked By**: Tasks 4, 2

  **References**:

  **Pattern References**:
  - `src/components/Sidebar.tsx` (CURRENT FILE — 220 lines) — This is the file being modified. Executor MUST read it fully. Key sections: `pastConversations` array (lines 21-30, REMOVE), conversation list rendering (find the JSX that maps over pastConversations — KEEP the JSX, change the data source), categories array (lines 32-37, KEEP), mobile hamburger (KEEP), isAdminOrDash check (KEEP).
  - `src/lib/supabase.ts` — Client-side Supabase singleton. Use `getSupabase()` for queries.

  **API/Type References**:
  - `Conversation` type (from Task 2) — `{ id: string, title: string, updated_at: string, ... }`
  - `supabase.auth.onAuthStateChange((event, session) => { ... })` — Listen for login/logout
  - `supabase.from('conversations').select().order().limit()` — Query API

  **WHY Each Reference Matters**:
  - `Sidebar.tsx`: Surgical edit — executor must know exactly which lines to change and which to preserve
  - `supabase.ts`: Client-side data fetching pattern
  - Auth state change: Critical for showing/hiding conversation list on login/logout

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Sidebar shows "Sign in" message for anonymous users
    Tool: Playwright
    Preconditions: Dev server running, user NOT logged in
    Steps:
      1. Navigate to http://localhost:3000
      2. Locate sidebar element
      3. Assert text "Sign in" or "sign in" appears in sidebar conversation area
      4. Assert NO hardcoded conversation titles appear ("5.3 Silverado engine", "F-150 transmission", etc.)
      5. Screenshot sidebar
    Expected Result: Sign-in prompt visible, no fake conversations
    Failure Indicators: Mock conversations still showing, no sign-in message
    Evidence: .sisyphus/evidence/task-10-anon-sidebar.png

  Scenario: Sidebar shows real conversations for logged-in user
    Tool: Playwright
    Preconditions: Dev server running, test user logged in, has at least 1 conversation from Task 9 QA
    Steps:
      1. Navigate to http://localhost:3000
      2. Locate sidebar conversation list
      3. Assert at least 1 conversation appears with a title
      4. Click on a conversation
      5. Verify navigation to /chat/{id}
      6. Screenshot sidebar with conversations
    Expected Result: Real conversations listed, clickable, navigates to chat page
    Failure Indicators: Empty list, mock data, broken links
    Evidence: .sisyphus/evidence/task-10-auth-sidebar.png
  ```

  **Commit**: YES (groups with Task 9)
  - Message: `feat(chat): replace mock flow with real streaming + live sidebar`
  - Files: `src/components/Sidebar.tsx`

- [ ] 11. Auth Provider + Layout Integration

  **What to do**:
  - Create `src/components/AuthProvider.tsx` — React context provider for auth state:
    - `AuthContext` with: `user: AuthUser | null`, `loading: boolean`, `signOut: () => Promise<void>`
    - On mount: check current session via `supabase.auth.getSession()`
    - Listen for auth changes: `supabase.auth.onAuthStateChange()`
    - Provide context to children
    - Export `useAuth()` hook for consuming components
  - Modify `src/app/layout.tsx`:
    - Wrap `{children}` with `<AuthProvider>` inside the body
    - Keep everything else unchanged (Sidebar, StickyCallButton, metadata, fonts)
  - Add login/logout button to Sidebar:
    - At the bottom of the sidebar, add: if user is logged in, show email + "Sign Out" button. If not logged in, show "Sign In" link to `/auth/login`.
    - Use existing sidebar styling patterns (same text colors, spacing)

  **Must NOT do**:
  - Don't add a global loading screen while auth initializes
  - Don't modify the Sidebar layout/design beyond adding the auth button
  - Don't add user profile page
  - Don't add account settings

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small context provider + minor layout edit + small sidebar addition
  - **Skills**: [`playwright`]
    - `playwright`: QA needs browser to verify auth flow end-to-end

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 9, 10)
  - **Blocks**: None
  - **Blocked By**: Tasks 4, 7

  **References**:

  **Pattern References**:
  - `src/app/layout.tsx` (76 lines) — The root layout. Executor adds `<AuthProvider>` wrapper around children. Must preserve: `html` lang, `body` classes, skip-to-content link, flex layout, Sidebar, StickyCallButton.
  - `src/components/Sidebar.tsx` (220 lines) — Add auth button at the bottom. Follow existing styling: `text-text-secondary`, `hover:text-text-primary`, icon sizes.
  - `src/lib/supabase.ts` — Use `getSupabase()` in AuthProvider for client-side auth.

  **API/Type References**:
  - `supabase.auth.getSession()` — Returns `{ data: { session }, error }`
  - `supabase.auth.onAuthStateChange(callback)` — Returns `{ data: { subscription } }`. Call `subscription.unsubscribe()` in cleanup.
  - `supabase.auth.signOut()` — Signs out current user
  - `AuthUser` from `src/lib/auth.ts` (Task 4) — Type for the user object in context

  **WHY Each Reference Matters**:
  - `layout.tsx`: Must know exact structure to insert provider without breaking layout
  - `Sidebar.tsx`: Must match styling for the auth button addition
  - Supabase auth methods: Exact API for session management in the context provider

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Auth context provides user state to components
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3000 (not logged in)
      2. Verify sidebar shows "Sign In" link (from auth state = null)
      3. Navigate to /auth/login
      4. Sign in with test credentials
      5. Verify redirect to home page
      6. Verify sidebar now shows user email and "Sign Out" button
      7. Screenshot before and after login
    Expected Result: Auth state correctly propagates — anonymous sees Sign In, authenticated sees email + Sign Out
    Failure Indicators: Always shows Sign In, always shows Sign Out, layout broken
    Evidence: .sisyphus/evidence/task-11-auth-flow.png

  Scenario: Sign out works and clears state
    Tool: Playwright
    Preconditions: Dev server running, user logged in
    Steps:
      1. Click "Sign Out" button in sidebar
      2. Verify sidebar reverts to "Sign In" link
      3. Navigate to /chat/test and verify anonymous behavior (no conversation saving message or similar)
    Expected Result: User signed out, UI updates immediately
    Failure Indicators: State doesn't clear, page requires refresh, errors
    Evidence: .sisyphus/evidence/task-11-sign-out.png
  ```

  **Commit**: YES (groups with Task 7)
  - Message: `feat(auth): add login/signup pages and AuthProvider`
  - Files: `src/components/AuthProvider.tsx`, `src/app/layout.tsx`, `src/components/Sidebar.tsx`
  - Pre-commit: `npx next build`

---

## Final Verification Wave

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `npx next build` (must pass). Review all changed/new files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names (data/result/item/temp). Verify TypeScript strict compliance.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start dev server. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration: signup → login → chat → see history in sidebar. Test edge cases: empty parts DB, very long messages, rapid sends. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual implementation. Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance: no card component modifications, no dashboard touches. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Creep [CLEAN/N issues] | VERDICT`

---

## Commit Strategy

| After | Message | Key Files |
|-------|---------|-----------|
| Task 1 | `feat(db): add auto_parts, conversations, messages schema` | `supabase/schema.sql` |
| Task 2+3 | `feat(api): add LLM provider abstraction and server supabase client` | `src/lib/llm/*, src/lib/supabase-server.ts` |
| Task 4 | `feat(auth): add Supabase Auth setup and helpers` | `src/lib/auth.ts, src/middleware.ts` |
| Tasks 5+6 | `feat(chat): add streaming chat API with parts search` | `src/app/api/chat/route.ts, src/lib/parts-search.ts` |
| Tasks 7+11 | `feat(auth): add login/signup pages and AuthProvider` | `src/app/auth/*, src/components/AuthProvider.tsx` |
| Task 8 | `feat(data): add CSV parts import script` | `scripts/import-parts.ts` |
| Tasks 9+10 | `feat(chat): replace mock flow with real streaming + live sidebar` | `src/app/chat/[id]/page.tsx, src/components/Sidebar.tsx` |

---

## Success Criteria

### Verification Commands
```bash
npx next build          # Expected: Build succeeds, no type errors
curl -X POST http://localhost:3000/api/chat -H "Content-Type: application/json" -d '{"message":"What engines do you have for a 2014 Silverado?"}' --no-buffer  # Expected: Streaming SSE response with parts data
```

### Final Checklist
- [ ] All "Must Have" features present and working
- [ ] All "Must NOT Have" guardrails respected
- [ ] `next build` passes
- [ ] Streaming chat works end-to-end
- [ ] Auth flow works (signup → login → session persists)
- [ ] Parts search returns relevant results
- [ ] Sidebar shows real past conversations for logged-in users
- [ ] Anonymous users can chat without errors
