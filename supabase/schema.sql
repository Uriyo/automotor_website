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
