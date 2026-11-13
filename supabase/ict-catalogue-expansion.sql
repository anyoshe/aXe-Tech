-- Add catalogue and internal pricing fields to the existing products table.
-- Safe to run repeatedly; existing records and image arrays are preserved.
alter table public.products
  add column if not exists brand text,
  add column if not exists condition text,
  add column if not exists availability text not null default 'request_quote',
  add column if not exists published boolean not null default true,
  add column if not exists featured boolean not null default false,
  add column if not exists display_order integer not null default 0,
  add column if not exists starting_price boolean not null default true,
  add column if not exists internal_cost numeric(12,2),
  add column if not exists target_price numeric(12,2),
  add column if not exists bulk_price numeric(12,2),
  add column if not exists price_reviewed_at date,
  add column if not exists market_notes text,
  add column if not exists supplier_reference text,
  add column if not exists warranty text,
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists image_sources jsonb not null default '{}'::jsonb;

create index if not exists products_published_order_idx on public.products (published, display_order);
create index if not exists products_brand_idx on public.products (brand);

comment on column public.products.internal_cost is 'Private procurement estimate. Never return through public API.';
comment on column public.products.target_price is 'Private target selling price. Never return through public API.';
comment on column public.products.bulk_price is 'Private/institutional pricing. Never return through public API.';

-- Public catalogue access; writes stay in admin-protected server APIs.
alter table public.products enable row level security;
drop policy if exists "Public can read products" on public.products;
drop policy if exists "Public can read published products" on public.products;
create policy "Public can read published products" on public.products
  for select to anon, authenticated using (published = true);
drop policy if exists "Anon can insert products (setup)" on public.products;
drop policy if exists "Anon can update products (setup)" on public.products;
drop policy if exists "Anon can delete products (setup)" on public.products;
revoke insert, update, delete on public.products from anon, authenticated;
grant select on public.products to anon, authenticated;
