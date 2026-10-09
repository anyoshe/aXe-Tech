-- Sprint harden: customers master
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  county text,
  customer_type text default 'other',
  partner_id uuid references public.partners(id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists customers_phone_idx on public.customers (phone);
create index if not exists customers_name_idx on public.customers (name);

alter table public.deals
  add column if not exists customer_id uuid references public.customers(id) on delete set null;

alter table public.leads
  add column if not exists customer_id uuid references public.customers(id) on delete set null;

alter table public.customers enable row level security;
