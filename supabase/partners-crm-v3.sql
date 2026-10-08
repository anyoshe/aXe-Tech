-- Sprint 6–8: Onboarding extras, technical jobs, marketing campaigns
-- Run after partners-crm-v2.sql

alter table public.partners
  add column if not exists agreement_accepted_at timestamptz,
  add column if not exists training_completed_at timestamptz,
  add column if not exists referral_code text,
  add column if not exists onboarding_quiz_score int,
  add column if not exists onboarding_notes text;

create unique index if not exists partners_referral_code_uidx
  on public.partners (referral_code)
  where referral_code is not null;

-- Technical jobs (Sprint 7)
create table if not exists public.technical_jobs (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid references public.deals(id) on delete set null,
  lead_id uuid references public.leads(id) on delete set null,
  partner_id uuid references public.partners(id) on delete set null,
  technician_id uuid references public.partners(id) on delete set null,
  title text not null,
  job_type text not null default 'install'
    check (job_type in ('survey', 'install', 'network', 'repair', 'maintenance', 'other')),
  site_address text,
  county text,
  scheduled_at timestamptz,
  status text not null default 'OPEN'
    check (status in ('OPEN', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
  notes text,
  completion_notes text,
  serial_numbers text,
  customer_signoff boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists technical_jobs_status_idx on public.technical_jobs (status);
create index if not exists technical_jobs_tech_idx on public.technical_jobs (technician_id);

-- Marketing campaigns (Sprint 8)
create table if not exists public.marketing_campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text not null unique,
  channel text not null default 'other'
    check (channel in ('facebook', 'instagram', 'tiktok', 'whatsapp', 'google', 'referral', 'other')),
  marketer_partner_id uuid references public.partners(id) on delete set null,
  status text not null default 'ACTIVE'
    check (status in ('ACTIVE', 'PAUSED', 'ENDED')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Attribution on leads
alter table public.leads
  add column if not exists campaign_code text,
  add column if not exists referral_code text;

alter table public.technical_jobs enable row level security;
alter table public.marketing_campaigns enable row level security;

comment on table public.technical_jobs is 'Field / install jobs for technical partners';
comment on table public.marketing_campaigns is 'Campaign codes for lead attribution';
