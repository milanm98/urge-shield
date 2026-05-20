create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.pinned_resources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  resource_id text not null,
  created_at timestamptz not null default now(),
  unique (user_id, resource_id)
);

create table if not exists public.favorite_tools (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tool_id text not null,
  created_at timestamptz not null default now(),
  unique (user_id, tool_id)
);

create table if not exists public.trusted_contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  phone text,
  email text,
  preferred_contact_method text check (preferred_contact_method in ('phone', 'sms', 'email')),
  created_at timestamptz not null default now()
);

create table if not exists public.urge_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  intensity smallint check (intensity between 1 and 10),
  selected_action text,
  status text not null default 'started' check (status in ('started', 'resolved', 'skipped')),
  created_at timestamptz not null default now()
);

create table if not exists public.progress_summary (
  user_id uuid primary key references auth.users(id) on delete cascade,
  current_streak integer not null default 0,
  last_check_in_at timestamptz,
  estimated_money_protected numeric(12, 2),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.pinned_resources enable row level security;
alter table public.favorite_tools enable row level security;
alter table public.trusted_contacts enable row level security;
alter table public.urge_events enable row level security;
alter table public.progress_summary enable row level security;

create policy "profiles are owned by user"
  on public.profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "pinned resources are owned by user"
  on public.pinned_resources for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "favorite tools are owned by user"
  on public.favorite_tools for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "trusted contacts are owned by user"
  on public.trusted_contacts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "urge events are owned by user"
  on public.urge_events for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "progress summaries are owned by user"
  on public.progress_summary for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
