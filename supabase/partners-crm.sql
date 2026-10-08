-- GetAxe Partner Programme + CRM (Sprint 1–2)
-- Run in Supabase SQL Editor after schema.sql

-- Partners (independent sales partners)
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  phone text not null,
  county text,
  occupation text,
  experience text,
  specialty text not null default 'hardware'
    check (specialty in ('hardware', 'software', 'services', 'mixed')),
  target_market text,
  network_notes text,
  mpesa_number text,
  password_hash text,
  status text not null default 'APPLIED'
    check (status in (
      'APPLIED', 'SCREENING', 'APPROVED', 'TRAINING',
      'CERTIFIED', 'ACTIVE', 'SUSPENDED', 'INACTIVE'
    )),
  role text not null default 'SALES_PARTNER'
    check (role in ('SALES_PARTNER', 'MARKETING_PARTNER', 'TECHNICIAN')),
  admin_notes text,
  protection_days int not null default 45,
  certified_at timestamptz,
  activated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists partners_status_idx on public.partners (status);
create index if not exists partners_email_idx on public.partners (email);

-- Leads / opportunities
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references public.partners(id) on delete set null,
  org_name text not null,
  contact_name text not null,
  phone text not null,
  email text,
  location text,
  county text,
  industry text,
  customer_type text default 'other'
    check (customer_type in ('school', 'sme', 'chama', 'ngo', 'government', 'individual', 'other')),
  requirement text not null,
  pillar text default 'equip'
    check (pillar in ('equip', 'connect', 'run', 'support', 'mixed')),
  source text default 'partner',
  expected_value numeric,
  stage text not null default 'NEW'
    check (stage in (
      'NEW', 'CONTACTED', 'QUALIFIED', 'DISCOVERY', 'DEMO',
      'QUOTE_REQUEST', 'QUOTE_SENT', 'NEGOTIATION', 'WON', 'LOST', 'PAYMENT', 'DELIVERY'
    )),
  next_action text,
  follow_up_at timestamptz,
  protected_until timestamptz,
  lost_reason text,
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_partner_idx on public.leads (partner_id);
create index if not exists leads_stage_idx on public.leads (stage);
create index if not exists leads_follow_up_idx on public.leads (follow_up_at);

-- Lead activity log
create table if not exists public.lead_activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  partner_id uuid references public.partners(id) on delete set null,
  activity_type text not null default 'note'
    check (activity_type in ('note', 'call', 'whatsapp', 'meeting', 'email', 'stage_change', 'system')),
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists lead_activities_lead_idx on public.lead_activities (lead_id);

-- RLS: service role / server uses service key; anon limited
alter table public.partners enable row level security;
alter table public.leads enable row level security;
alter table public.lead_activities enable row level security;

-- Public can insert applications only via server; no open anon policies for reads
-- Server routes use SUPABASE_SERVICE_ROLE_KEY

comment on table public.partners is 'GetAxe independent sales partners';
comment on table public.leads is 'CRM leads owned by partners with protection window';
