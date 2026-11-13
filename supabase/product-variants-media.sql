-- Product families (variants) + media gallery metadata
-- Run in Supabase SQL Editor after schema.sql / ict-catalogue-expansion.sql

-- Parent products remain in public.products (existing rows = single-SKU or family parents)

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id text not null references public.products(id) on delete cascade,
  sku text,
  label text not null,
  processor text,
  ram text,
  storage text,
  display text,
  os text,
  condition_grade text check (condition_grade is null or condition_grade in ('A','B','C')),
  battery_notes text,
  functional_inspection text,
  battery_assessment text,
  display_condition text,
  keyboard_touchpad_condition text,
  ports_connectivity_checks text,
  os_license_status text,
  price numeric(12, 2) check (price is null or price >= 0),
  currency text not null default 'KES',
  availability text not null default 'request_quote'
    check (availability in ('in_stock','on_order','request_quote','request_config','unavailable')),
  warranty text,
  warranty_coverage text,
  warranty_exclusions text,
  after_sales_support text,
  accessories text,
  notes text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists product_variants_product_idx on public.product_variants (product_id, published, sort_order);

create table if not exists public.product_media (
  id uuid primary key default gen_random_uuid(),
  product_id text not null references public.products(id) on delete cascade,
  variant_id uuid references public.product_variants(id) on delete set null,
  storage_path text,
  public_url text not null,
  title text,
  alt_text text,
  caption text,
  display_order int not null default 0,
  is_main boolean not null default false,
  image_type text not null default 'reference'
    check (image_type in ('reference','actual_stock','detail','other')),
  source_url text,
  attribution text,
  created_at timestamptz not null default now()
);

create index if not exists product_media_product_idx on public.product_media (product_id, display_order);

-- Ensure storage bucket exists (public read for catalogue images)
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

alter table public.product_variants enable row level security;
alter table public.product_media enable row level security;

drop policy if exists "Public read published variants" on public.product_variants;
create policy "Public read published variants"
  on public.product_variants for select to anon, authenticated
  using (published = true);

drop policy if exists "Public read product media" on public.product_media;
create policy "Public read product media"
  on public.product_media for select to anon, authenticated
  using (true);

-- Revoke legacy public mutation access to the product image bucket. API writes
-- run server-side after requireAdminSession() and use the service role key.
drop policy if exists "Public upload product images (setup)" on storage.objects;
drop policy if exists "Public update product images (setup)" on storage.objects;
drop policy if exists "Public delete product images (setup)" on storage.objects;
drop policy if exists "Authenticated upload product images" on storage.objects;
drop policy if exists "Authenticated update product images" on storage.objects;
drop policy if exists "Authenticated delete product images" on storage.objects;

comment on table public.product_variants is 'Configuration SKUs under a parent products row. Only admin-created rows appear.';
comment on table public.product_media is 'Gallery metadata; files live in storage bucket product-images.';
