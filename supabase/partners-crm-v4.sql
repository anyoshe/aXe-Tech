-- Sprint 9–10: Support tickets + warranties
-- Run after partners-crm-v3.sql

create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references public.partners(id) on delete set null,
  customer_name text not null,
  contact_phone text,
  subject text not null,
  description text,
  priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high', 'urgent')),
  status text not null default 'OPEN'
    check (status in ('OPEN', 'IN_PROGRESS', 'WAITING_CUSTOMER', 'RESOLVED', 'CLOSED')),
  category text not null default 'general'
    check (category in ('software', 'hardware', 'network', 'billing', 'general')),
  assigned_to uuid references public.partners(id) on delete set null,
  resolution_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index if not exists support_tickets_status_idx on public.support_tickets (status);
create index if not exists support_tickets_partner_idx on public.support_tickets (partner_id);

create table if not exists public.warranties (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  product_name text not null,
  serial_number text,
  supplier text,
  purchase_date date,
  warranty_months int not null default 12,
  warranty_end date,
  partner_id uuid references public.partners(id) on delete set null,
  deal_id uuid references public.deals(id) on delete set null,
  notes text,
  status text not null default 'ACTIVE'
    check (status in ('ACTIVE', 'EXPIRED', 'CLAIMED', 'VOID')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists warranties_serial_idx on public.warranties (serial_number);
create index if not exists warranties_status_idx on public.warranties (status);

alter table public.support_tickets enable row level security;
alter table public.warranties enable row level security;
