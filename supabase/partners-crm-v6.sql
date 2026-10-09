-- Audit log, in-app notifications, marketer lead fees
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id text,
  actor_role text,
  action text not null,
  entity_type text not null,
  entity_id text,
  meta jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists audit_logs_created_idx on public.audit_logs (created_at desc);
create index if not exists audit_logs_entity_idx on public.audit_logs (entity_type, entity_id);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_key text not null,
  title text not null,
  body text,
  link text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists notifications_user_idx on public.notifications (user_key, created_at desc);

-- Default marketer fee when a lead is attributed to their campaign (KES)
-- Stored on commission rows with basis = 'lead_fee'
alter table public.commissions
  drop constraint if exists commissions_basis_check;

-- Allow lead_fee basis if check existed; recreate soft constraint via comment only
comment on column public.commissions.basis is 'deal | setup | residual | lead_fee';

alter table public.audit_logs enable row level security;
alter table public.notifications enable row level security;
