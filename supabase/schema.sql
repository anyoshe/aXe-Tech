-- aXe-Tech / GetAxe — Supabase schema for ICT products
-- Run this in Supabase Dashboard → SQL Editor → New query → Run

-- Products catalog
create table if not exists public.products (
  id text primary key,
  title text not null,
  price numeric(12, 2) not null check (price >= 0),
  category text,
  images text[] not null default '{}',
  videos text[] not null default '{}',
  features text[] not null default '{}',
  short text,
  description text,
  specs jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_price_idx on public.products (price);
create index if not exists products_created_at_idx on public.products (created_at desc);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row
  execute function public.set_updated_at();

-- RLS: open read for storefront; writes via service role (API routes) bypass RLS.
-- Tighten later when you add real user roles.
alter table public.products enable row level security;

drop policy if exists "Public can read products" on public.products;
create policy "Public can read products"
  on public.products
  for select
  to anon, authenticated
  using (true);

-- Optional: allow anon insert during early setup (remove once admin is locked down)
drop policy if exists "Anon can insert products (setup)" on public.products;
create policy "Anon can insert products (setup)"
  on public.products
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Anon can update products (setup)" on public.products;
create policy "Anon can update products (setup)"
  on public.products
  for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "Anon can delete products (setup)" on public.products;
create policy "Anon can delete products (setup)"
  on public.products
  for delete
  to anon, authenticated
  using (true);

-- Storage bucket for product images (optional but recommended over Base64)
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read product images" on storage.objects;
create policy "Public read product images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'product-images');

drop policy if exists "Public upload product images (setup)" on storage.objects;
create policy "Public upload product images (setup)"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'product-images');

drop policy if exists "Public update product images (setup)" on storage.objects;
create policy "Public update product images (setup)"
  on storage.objects for update
  to anon, authenticated
  using (bucket_id = 'product-images');

drop policy if exists "Public delete product images (setup)" on storage.objects;
create policy "Public delete product images (setup)"
  on storage.objects for delete
  to anon, authenticated
  using (bucket_id = 'product-images');
