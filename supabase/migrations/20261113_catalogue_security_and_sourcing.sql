-- Final catalogue security + sourcing migration.
-- Preconditions: public.products, public.product_variants and public.product_media
-- already exist. Run in Supabase SQL Editor only after reviewing the preflight queries.
-- This migration does not alter existing product or image rows.

begin;

do $$
declare
  required record;
  bucket_is_public boolean;
begin
  if to_regclass('public.products') is null
    or to_regclass('public.product_variants') is null
    or to_regclass('public.product_media') is null
    or to_regclass('storage.objects') is null
    or to_regclass('storage.buckets') is null then
    raise exception 'Catalogue prerequisite tables are missing; migration stopped before changes';
  end if;

  if not exists (select 1 from information_schema.columns where table_schema='public' and table_name='products' and column_name='published')
    or not exists (select 1 from information_schema.columns where table_schema='public' and table_name='product_variants' and column_name='product_id')
    or not exists (select 1 from information_schema.columns where table_schema='public' and table_name='product_variants' and column_name='published')
    or not exists (select 1 from information_schema.columns where table_schema='public' and table_name='product_media' and column_name='product_id')
    or not exists (select 1 from information_schema.columns where table_schema='public' and table_name='product_media' and column_name='variant_id') then
    raise exception 'Catalogue prerequisite columns are missing; migration stopped before changes';
  end if;

  if (select atttypid from pg_attribute where attrelid = 'public.products'::regclass and attname = 'id' and not attisdropped)
       is distinct from
     (select atttypid from pg_attribute where attrelid = 'public.product_variants'::regclass and attname = 'product_id' and not attisdropped)
     or (select atttypid from pg_attribute where attrelid = 'public.products'::regclass and attname = 'id' and not attisdropped)
       is distinct from
     (select atttypid from pg_attribute where attrelid = 'public.product_media'::regclass and attname = 'product_id' and not attisdropped)
     or (select atttypid from pg_attribute where attrelid = 'public.product_variants'::regclass and attname = 'id' and not attisdropped)
       is distinct from
     (select atttypid from pg_attribute where attrelid = 'public.product_media'::regclass and attname = 'variant_id' and not attisdropped) then
    raise exception 'Catalogue key column types do not match; composite media/variant foreign key cannot be created';
  end if;

  select public into bucket_is_public from storage.buckets where id = 'product-images';
  if bucket_is_public is null then
    raise exception 'product-images bucket is missing; migration stopped before changes';
  end if;
  if bucket_is_public is not true then
    raise exception 'product-images bucket must be public for existing catalogue image URLs; migration stopped before changes';
  end if;

  for required in
    select * from (values
      ('products','id'), ('products','title'), ('products','price'), ('products','category'),
      ('products','images'), ('products','videos'), ('products','features'), ('products','short'),
      ('products','description'), ('products','specs'), ('products','created_at'), ('products','updated_at'),
      ('products','brand'), ('products','condition'),
      ('products','availability'), ('products','published'), ('products','featured'),
      ('products','display_order'), ('products','starting_price'), ('products','internal_cost'),
      ('products','target_price'), ('products','bulk_price'), ('products','price_reviewed_at'),
      ('products','market_notes'), ('products','supplier_reference'), ('products','warranty'),
      ('products','seo_title'), ('products','seo_description'), ('products','image_sources'),
      ('product_variants','id'), ('product_variants','product_id'), ('product_variants','sku'),
      ('product_variants','label'), ('product_variants','processor'), ('product_variants','ram'),
      ('product_variants','storage'), ('product_variants','display'), ('product_variants','os'),
      ('product_variants','condition_grade'), ('product_variants','battery_notes'),
      ('product_variants','price'), ('product_variants','currency'), ('product_variants','availability'),
      ('product_variants','warranty'), ('product_variants','accessories'), ('product_variants','notes'),
      ('product_variants','sort_order'), ('product_variants','published'), ('product_variants','updated_at'),
      ('product_media','id'), ('product_media','product_id'), ('product_media','variant_id'),
      ('product_media','storage_path'), ('product_media','public_url'), ('product_media','title'),
      ('product_media','alt_text'), ('product_media','caption'), ('product_media','display_order'),
      ('product_media','is_main'), ('product_media','image_type'), ('product_media','source_url'),
      ('product_media','attribution'), ('product_media','created_at')
    ) as required_columns(table_name, column_name)
  loop
    if not exists (
      select 1 from information_schema.columns
      where table_schema = 'public'
        and table_name = required.table_name
        and column_name = required.column_name
    ) then
      raise exception 'Required catalogue column public.%.% is missing; migration stopped before changes', required.table_name, required.column_name;
    end if;
  end loop;
end
$$;

create table if not exists public.product_sourcing_requests (
  id uuid primary key default gen_random_uuid(),
  product_category text not null,
  preferred_brand text,
  preferred_model text,
  processor text,
  ram text,
  storage text,
  condition_preference text,
  budget numeric(12,2) check (budget is null or budget >= 0),
  customer_name text not null,
  customer_contact text not null,
  customer_email text,
  additional_requirements text,
  status text not null default 'new' check (status in ('new','reviewing','responded','closed')),
  created_at timestamptz not null default now()
);

create index if not exists product_sourcing_requests_status_created_idx
  on public.product_sourcing_requests (status, created_at desc);

alter table public.product_variants add column if not exists functional_inspection text;
alter table public.product_variants add column if not exists battery_assessment text;
alter table public.product_variants add column if not exists display_condition text;
alter table public.product_variants add column if not exists keyboard_touchpad_condition text;
alter table public.product_variants add column if not exists ports_connectivity_checks text;
alter table public.product_variants add column if not exists os_license_status text;
alter table public.product_variants add column if not exists warranty_coverage text;
alter table public.product_variants add column if not exists warranty_exclusions text;
alter table public.product_variants add column if not exists after_sales_support text;

-- Composite target is required so media cannot point to another product's variant.
create unique index if not exists product_variants_product_id_id_uq
  on public.product_variants (product_id, id);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'product_media_variant_same_product_fk'
      and conrelid = 'public.product_media'::regclass
  ) then
    alter table public.product_media
      add constraint product_media_variant_same_product_fk
      foreign key (product_id, variant_id)
      references public.product_variants (product_id, id)
      not valid;
  end if;
end
$$;

alter table public.product_media
  validate constraint product_media_variant_same_product_fk;

-- Public catalog reads are limited to published parents and configurations.
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_media enable row level security;
alter table public.product_sourcing_requests enable row level security;

drop policy if exists "Anon can insert products (setup)" on public.products;
drop policy if exists "Anon can update products (setup)" on public.products;
drop policy if exists "Anon can delete products (setup)" on public.products;
drop policy if exists "Public can read products" on public.products;
drop policy if exists "Public can read published products" on public.products;
create policy "Public can read published products" on public.products
  for select to anon, authenticated using (published = true);

drop policy if exists "Public read published variants" on public.product_variants;
create policy "Public read published variants" on public.product_variants
  for select to anon, authenticated
  using (
    published = true and exists (
      select 1 from public.products p
      where p.id = product_variants.product_id and p.published = true
    )
  );

drop policy if exists "Public read product media" on public.product_media;
create policy "Public read published product media" on public.product_media
  for select to anon, authenticated
  using (
    exists (
      select 1 from public.products p
      where p.id = product_media.product_id and p.published = true
    )
    and (
      product_media.variant_id is null or exists (
        select 1 from public.product_variants v
        where v.id = product_media.variant_id
          and v.product_id = product_media.product_id
          and v.published = true
      )
    )
  );

-- RLS does not govern TRUNCATE. Remove every table privilege first, then grant
-- back only the public read privilege required by the catalogue.
revoke all privileges on table public.products, public.product_variants, public.product_media from public, anon, authenticated;
grant select on public.products, public.product_variants, public.product_media to anon, authenticated;
grant all on public.products, public.product_variants, public.product_media, public.product_sourcing_requests to service_role;
revoke all privileges on table public.product_sourcing_requests from public, anon, authenticated;

-- Keep public image reads; all mutations are through requireAdminSession APIs
-- using the server-only service-role credential. Drop only known legacy policies.
drop policy if exists "Public upload product images (setup)" on storage.objects;
drop policy if exists "Public update product images (setup)" on storage.objects;
drop policy if exists "Public delete product images (setup)" on storage.objects;
drop policy if exists "Authenticated upload product images" on storage.objects;
drop policy if exists "Authenticated update product images" on storage.objects;
drop policy if exists "Authenticated delete product images" on storage.objects;
drop policy if exists "Public read product images" on storage.objects;
create policy "Public read product images" on storage.objects
  for select to anon, authenticated using (bucket_id = 'product-images');

commit;
