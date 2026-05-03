-- AutoMotor.AI — Supabase schema
-- Run this in the Supabase SQL editor for your project.

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  topic text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table contact_submissions enable row level security;

-- Allow anonymous inserts from the contact form.
create policy "Anyone can insert a contact submission"
  on contact_submissions for insert
  to anon
  with check (true);

-- Only service role / authenticated admins can read.
create policy "Service role can read contact submissions"
  on contact_submissions for select
  to service_role
  using (true);


-- Yard signups (junkyard onboarding flow).
create table if not exists yard_signups (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  yard_name text,
  owner_name text,
  address text,
  ein text,
  service_radius int,
  specialties text[] default '{}',
  inventory_choice text,
  stripe_connected boolean default false,
  created_at timestamptz not null default now()
);

alter table yard_signups enable row level security;

create policy "Anyone can insert a yard signup"
  on yard_signups for insert
  to anon
  with check (true);

create policy "Service role can read yard signups"
  on yard_signups for select
  to service_role
  using (true);


-- Mechanic signups (mechanic onboarding flow).
create table if not exists mechanic_signups (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  shop_name text,
  owner_name text,
  address text,
  specialties text[] default '{}',
  ase_certified boolean default false,
  years_in_business int,
  earning_model text,
  created_at timestamptz not null default now()
);

alter table mechanic_signups enable row level security;

create policy "Anyone can insert a mechanic signup"
  on mechanic_signups for insert
  to anon
  with check (true);

create policy "Service role can read mechanic signups"
  on mechanic_signups for select
  to service_role
  using (true);


-- Auto parts catalog (source of truth for parts search).
create table if not exists auto_parts (
  id uuid primary key default gen_random_uuid(),
  part_name text not null,
  part_number text,
  category text,
  make text,
  model text,
  year_start int,
  year_end int,
  price numeric,
  condition text,
  mileage int,
  warranty text,
  description text,
  metadata jsonb default '{}',
  created_at timestamptz not null default now()
);

alter table auto_parts enable row level security;

create policy "Anyone can read auto parts"
  on auto_parts for select
  to anon, authenticated
  using (true);

create policy "Service role can manage auto parts"
  on auto_parts for all
  to service_role
  using (true);

-- Full-text search index on auto_parts.
create index if not exists auto_parts_fts_idx
  on auto_parts
  using gin (to_tsvector('english', part_name || ' ' || coalesce(description, '') || ' ' || coalesce(make, '') || ' ' || coalesce(model, '')));


-- Conversations (persisted for authenticated users only).
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  title text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table conversations enable row level security;

create policy "Users can read own conversations"
  on conversations for select
  to authenticated
  using (user_id = auth.uid());

create policy "Users can insert own conversations"
  on conversations for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "Users can update own conversations"
  on conversations for update
  to authenticated
  using (user_id = auth.uid());

create policy "Users can delete own conversations"
  on conversations for delete
  to authenticated
  using (user_id = auth.uid());


-- Messages within conversations.
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations on delete cascade not null,
  role text not null,
  content text not null,
  metadata jsonb default '{}',
  created_at timestamptz not null default now()
);

alter table messages enable row level security;

create policy "Users can read own messages"
  on messages for select
  to authenticated
  using (conversation_id in (select id from conversations where user_id = auth.uid()));

create policy "Users can insert own messages"
  on messages for insert
  to authenticated
  with check (conversation_id in (select id from conversations where user_id = auth.uid()));


-- ---------------------------------------------------------------------
-- LangGraph checkpoint tables
-- ---------------------------------------------------------------------
-- These four tables are auto-created at runtime by the LangGraph
-- PostgresSaver (see src/lib/agent/checkpointer.ts → setup()):
--
--   checkpoints
--   checkpoint_blobs
--   checkpoint_writes
--   checkpoint_migrations
--
-- They are accessed only by the server (via SUPABASE_DB_URL) and store
-- agent state per `thread_id` (= conversations.id). RLS is not applied —
-- access is gated by the direct DB connection, which is server-only.
-- No manual migration needed; do NOT manually edit these tables.


-- ---------------------------------------------------------------------
-- LangGraph checkpoint tables (Supabase REST-backed saver)
-- ---------------------------------------------------------------------
-- Used by src/lib/agent/supabase-saver.ts. Server-only access via the
-- service-role key. No client-facing RLS policies — anonymous users
-- have no business reading agent state.

create table if not exists lg_checkpoints (
  thread_id text not null,
  checkpoint_ns text not null default '',
  checkpoint_id text not null,
  parent_checkpoint_id text,
  type text not null,
  checkpoint bytea not null,
  metadata bytea not null,
  created_at timestamptz not null default now(),
  primary key (thread_id, checkpoint_ns, checkpoint_id)
);

create index if not exists lg_checkpoints_thread_idx
  on lg_checkpoints (thread_id, checkpoint_ns, checkpoint_id desc);

alter table lg_checkpoints enable row level security;
-- No policies for anon/authenticated. Service role bypasses RLS, which
-- is the only access path the agent uses.

create table if not exists lg_writes (
  thread_id text not null,
  checkpoint_ns text not null default '',
  checkpoint_id text not null,
  task_id text not null,
  idx integer not null,
  channel text not null,
  type text not null,
  value bytea not null,
  created_at timestamptz not null default now(),
  primary key (thread_id, checkpoint_ns, checkpoint_id, task_id, idx)
);

create index if not exists lg_writes_thread_idx
  on lg_writes (thread_id, checkpoint_ns, checkpoint_id);

alter table lg_writes enable row level security;
