LangGraph integration plan — AutoMotor.AI
Goals
Checkpointed conversations — every turn persists graph state to Supabase Postgres so chats truly resume (mid-tool-call, mid-clarification, anywhere)
Tool-using agent — the AI can call inventory search, VIN decode, and yard-quote actions
Human-in-the-loop — graph can pause for phone number / yard selection / confirmation
Streamed UI — no regression on the live "AutoMotor is typing" experience
Provider-agnostic — keep the existing LLM_PROVIDER=gemini|openai switch working
Architecture overview

ChatView (browser)
  ├─ POST /api/chat { thread_id, message, image? }
  │
  ▼
/api/chat (Next.js route)
  ├─ load checkpoint by thread_id   (Supabase Postgres)
  ├─ graph.stream({ messages: [..., user] }, { configurable: { thread_id } })
  │
  ▼
graph (LangGraph)
  ├─ START
  ├─ "agent" node          → LLM call with bound tools
  ├─ conditional edge:
  │    tool_calls present? ─yes→ "tools" node ─loop→ "agent"
  │    no tool calls?      ─yes→ END
  └─ checkpoint after every node     (PostgresSaver)
The graph state is just { messages: BaseMessage[] } (LangGraph's MessagesAnnotation). After each turn, the entire conversation history lives in the checkpoint, keyed by thread_id. Reloading the page → request to /api/chat with the same thread_id → graph resumes with full state. No client history payload needed anymore.

Phase 1 — Foundation (graph runs, checkpoints persist)
Dependencies to add

@langchain/langgraph — core graph runtime
@langchain/langgraph-checkpoint-postgres — Postgres saver
@langchain/core — base message types
@langchain/google-genai — Gemini chat model (LangChain-flavored, supports tool binding)
@langchain/openai — OpenAI chat model (same)
pg — postgres driver (peer dep of the checkpoint saver)
We keep the existing @google/generative-ai and openai packages installed but stop importing them from /api/chat. We can delete src/lib/llm/* later once everything's migrated.

New files

src/lib/agent/checkpointer.ts — singleton PostgresSaver connected to process.env.SUPABASE_DB_URL (the direct Postgres connection string, not the Supabase HTTP URL). Calls .setup() once per process.
src/lib/agent/model.ts — factory that returns ChatGoogleGenerativeAI or ChatOpenAI based on LLM_PROVIDER, with consistent settings (temperature, streaming, max tokens).
src/lib/agent/graph.ts — defines the StateGraph with MessagesAnnotation, a single agent node (LLM + system prompt), no tools yet. Compiled with the checkpointer.
src/lib/agent/system-prompt.ts — moves the existing buildSystemPrompt here, called inside the agent node so tool results can flow back through it.
Database

New env var: SUPABASE_DB_URL — direct connection string from Supabase → Project Settings → Database → Connection string (URI). We need this because the LangGraph saver uses raw pg, not Supabase's HTTP API.
The saver auto-creates four tables (checkpoints, checkpoint_blobs, checkpoint_writes, checkpoint_migrations) on first .setup() call. We do not need to add anything to supabase/schema.sql — but we'll document the migration step in a comment there.
Refactor /api/chat

Remove the streaming-proxy code we just wrote
Replace with: const stream = await graph.stream({ messages: [new HumanMessage(message)] }, { configurable: { thread_id }, streamMode: "messages" });
Iterate the stream and forward only the AI message content chunks back to the client (LangGraph emits state-snapshot events too, which the client doesn't need)
The route still takes { message, image, thread_id } from the body and returns a plain text stream — no client-facing API change
Refactor ChatView

Stop sending history in the request body — the graph holds it
Pass thread_id (the conversationId we already have) on every request
Keep the existing client-side persistence to conversations and messages tables (sidebar still queries those for display) — checkpointing is parallel to it, not a replacement
The messages table becomes a denormalized view for the sidebar's purposes; checkpoints are the agent's source of truth
Acceptance check for Phase 1

Send a message in a new chat → response streams normally
Open Supabase → checkpoints table has a row with thread_id = <conversation_id>
Refresh the page → continue the conversation → the AI remembers context without us sending history
The two systems agree: messages in messages table match messages in the latest checkpoint
Phase 2 — Tool use
Add tools the agent can actually call:

searchAutoParts({ query, vehicle? }) — wraps the existing searchParts() against auto_parts table. Returns a structured list the LLM can quote from.
decodeVin({ vin }) — placeholder (can be a stub returning canned data until you wire NHTSA / commercial VIN API).
requestYardQuotes({ partId, zip, count }) — placeholder that returns 3 fake quotes immediately. This will later become the real Twilio/Vapi multi-call fanout.
saveUserVehicle({ make, model, year, vin? }) — writes to a future user_vehicles table for the My Garage feature.
Graph changes

Add a tools node using LangGraph's prebuilt ToolNode
Add a conditional edge: after agent, route to tools if the last message has tool_calls, otherwise to END
Loop: tools → agent so the LLM sees tool results and can answer or call another tool
System-prompt changes

Tell the model when to use which tool (e.g., "use searchAutoParts whenever the user asks about a specific part — never make up part numbers or prices")
Acceptance check for Phase 2

"I need a 5.3L LS engine for a 2014 Silverado" → agent calls searchAutoParts → quotes from real DB rows
Tool calls and tool results both appear in the checkpoint
Tool latency doesn't break the streaming UI (we still see typing dots while tools run)
Phase 3 — Human-in-the-loop checkpoints
Use LangGraph's interrupt() to suspend the graph mid-flow and resume on the next user message:

Phone capture interrupt — when the agent decides it's ready to call yards, it interrupts with { type: "phone_required" }. The client renders the existing PhoneCaptureCard. User submits → next /api/chat call resumes the graph with the phone number.
Yard selection interrupt — once quotes are in, agent interrupts with the quote list. User picks one → graph resumes and proceeds to reservation.
Why this matters
This is the structural reason we picked LangGraph over Vercel AI SDK. The graph can sit suspended for minutes, hours, or days — when the user comes back, we replay from the exact node where it paused. No "resume token" plumbing on our end.

Acceptance check for Phase 3

Agent can ask for a phone number, the conversation pauses, the user provides it next turn, the agent picks up exactly where it left off
The interrupted state survives a full page reload between turns
Phase 4 — Streaming polish + observability
Streaming events — switch to streamMode: ["messages", "updates"] so we can also stream tool-call announcements ("Calling 15 yards…") to the UI separately from the assistant text
Tracing — optional: enable LangSmith (LANGSMITH_API_KEY env) for free graph-trace visualization. One env var, no code changes
Error boundaries — wrap each node in a try/catch that emits a graceful "I hit a snag — let me try again" message instead of crashing the whole request
Token & cost logging — log per-turn token counts to a agent_runs table for ops visibility
Migration order (concrete)
Day 1 — Phase 1 only. Get a single-node graph running with checkpoints. Verify resume works. Don't touch tools yet.
Day 2 — Phase 2. Wire searchAutoParts first (real value, no external integrations). Stub the others.
Later — Phase 3 and 4 once the basics are solid and you have a real Twilio/Vapi integration to plug into the yard-quote tool.
What stays the same
Sidebar reads conversations + messages exactly as today (no UI churn)
Auth via Supabase, RLS policies, sidebar querying patterns — all untouched
The chat URL structure (/chat/{id}) unchanged — id doubles as thread_id
/contact, signup flows, OG image, design tokens — all unaffected
Risks / decisions to sign off
Two sources of truth — messages table (sidebar display) and graph checkpoints (agent state). They could drift if a write to one succeeds but the other fails. Mitigation: the API route writes the checkpoint first; on success, we mirror to messages. If messages write fails, the conversation still works (checkpoint has truth) but the sidebar lags by a turn. Acceptable.

SUPABASE_DB_URL exposure — the direct Postgres URL gives full DB access. It must only ever be a server-side env var. We'll add it to .env.local.example with a clear "SERVER ONLY" comment and use it only inside the route handler.

Cold-start cost — PostgresSaver.setup() runs schema migrations on first call. We cache the saver as a module-level singleton so this only happens once per Node process. On Vercel serverless, every cold start runs setup() (idempotent, fast — just checks for existing tables).

Locking us in — LangGraph is well-maintained but newer than the rest of the stack. If we want out, the message history in messages table is portable — we'd just need to rewrite the agent loop. The cost of escape is bounded.

Provider tool-binding — Gemini and OpenAI both support function calling, but the LangChain wrappers normalize them differently. Worth testing both before we lock in a provider per environment.

Sign-off questions before I write code:

OK to add SUPABASE_DB_URL as a new env var (you'll need to grab the direct connection string from Supabase dashboard)?
OK to keep messages table as-is for sidebar display, with the agent state living separately in checkpoints?
Phase 1 first — graph + checkpoints + resume working — before any tools? (Recommend yes — gets us a verifiable foundation in a few hundred LOC.)
Provider for the agent — start with Gemini (what you have configured) or switch to OpenAI? Both work; Gemini is cheaper/faster, OpenAI's tool-calling is slightly more reliable in my experience.
Once you confirm those four, I'll start with Phase 1 only.

