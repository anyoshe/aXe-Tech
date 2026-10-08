-- GetAxe Sprint 3–5: Quotes, Deals, Commissions, Subscriptions
-- Run AFTER partners-crm.sql

-- Agreement acceptance (Sprint 1–2 gap)
alter table public.partners
  add column if not exists agreement_accepted_at timestamptz,
  add column if not exists training_completed_at timestamptz,
  add column if not exists referral_code text unique;

-- Quote requests
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  partner_id uuid references public.partners(id) on delete set null,
  pillar text not null default 'run'
    check (pillar in ('equip', 'connect', 'run', 'support', 'mixed')),
  solution_summary text not null,
  qualification jsonb not null default '{}',
  requested_amount numeric,
  status text not null default 'PENDING'
    check (status in ('PENDING', 'APPROVED', 'REJECTED', 'SENT')),
  approved_setup_fee numeric,
  approved_monthly_fee numeric,
  approved_one_off numeric,
  approved_notes text,
  admin_id text,
  decided_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists quote_requests_partner_idx on public.quote_requests (partner_id);
create index if not exists quote_requests_status_idx on public.quote_requests (status);

-- Deals (won business linked to payment)
create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  quote_id uuid references public.quote_requests(id) on delete set null,
  partner_id uuid references public.partners(id) on delete set null,
  customer_name text not null,
  pillar text not null default 'equip',
  description text,
  invoice_amount numeric not null default 0,
  cost_amount numeric not null default 0,
  gross_profit numeric generated always as (invoice_amount - cost_amount) stored,
  payment_status text not null default 'UNPAID'
    check (payment_status in ('UNPAID', 'PARTIAL', 'PAID', 'REVERSED')),
  payment_ref text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists deals_partner_idx on public.deals (partner_id);
create index if not exists deals_payment_idx on public.deals (payment_status);

-- Commission ledger
create table if not exists public.commissions (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.partners(id) on delete cascade,
  deal_id uuid references public.deals(id) on delete set null,
  subscription_id uuid,
  basis text not null default 'deal'
    check (basis in ('deal', 'subscription', 'setup', 'referral')),
  basis_amount numeric not null default 0,
  commission_pct numeric not null default 0,
  commission_amount numeric not null default 0,
  status text not null default 'PENDING'
    check (status in ('PENDING', 'ELIGIBLE', 'APPROVED', 'PAID', 'REVERSED', 'CLAWED_BACK')),
  eligibility_date timestamptz,
  paid_at timestamptz,
  payment_ref text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists commissions_partner_idx on public.commissions (partner_id);
create index if not exists commissions_status_idx on public.commissions (status);

-- Subscriptions (recurring software)
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references public.partners(id) on delete set null,
  deal_id uuid references public.deals(id) on delete set null,
  customer_name text not null,
  product_name text not null default 'GetAxe Software',
  monthly_amount numeric not null default 0,
  status text not null default 'ACTIVE'
    check (status in ('ACTIVE', 'PAUSED', 'CANCELLED')),
  start_date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists subscriptions_partner_idx on public.subscriptions (partner_id);

-- Subscription payments (monthly)
create table if not exists public.subscription_payments (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references public.subscriptions(id) on delete cascade,
  period_label text not null,
  amount numeric not null,
  paid_at timestamptz not null default now(),
  payment_ref text,
  commission_id uuid references public.commissions(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.quote_requests enable row level security;
alter table public.deals enable row level security;
alter table public.commissions enable row level security;
alter table public.subscriptions enable row level security;
alter table public.subscription_payments enable row level security;

comment on table public.quote_requests is 'Partner quote requests; admin approves amounts';
comment on table public.deals is 'Won deals; commission only after PAID';
comment on table public.commissions is 'Commission ledger tied to cleared payments';
comment on table public.subscriptions is 'Recurring software with partner attribution';
