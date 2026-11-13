-- Safe additive catalogue follow-up. Review and deploy through Supabase SQL editor.
-- Public reads remain enabled; catalogue Storage mutations are server-mediated.
drop policy if exists "Public upload product images (setup)" on storage.objects;
drop policy if exists "Public update product images (setup)" on storage.objects;
drop policy if exists "Public delete product images (setup)" on storage.objects;
drop policy if exists "Authenticated upload product images" on storage.objects;
drop policy if exists "Authenticated update product images" on storage.objects;
drop policy if exists "Authenticated delete product images" on storage.objects;
drop policy if exists "Public read product images" on storage.objects;
create policy "Public read product images" on storage.objects
  for select to anon, authenticated using (bucket_id = 'product-images');

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
alter table public.product_variants add column if not exists functional_inspection text;
alter table public.product_variants add column if not exists battery_assessment text;
alter table public.product_variants add column if not exists display_condition text;
alter table public.product_variants add column if not exists keyboard_touchpad_condition text;
alter table public.product_variants add column if not exists ports_connectivity_checks text;
alter table public.product_variants add column if not exists os_license_status text;
alter table public.product_variants add column if not exists warranty_coverage text;
alter table public.product_variants add column if not exists warranty_exclusions text;
alter table public.product_variants add column if not exists after_sales_support text;
alter table public.product_sourcing_requests enable row level security;
revoke all on public.product_sourcing_requests from anon, authenticated;

-- Ensure variant-specific media always references a variant under the same parent.
create unique index if not exists product_variants_product_id_id_uq on public.product_variants(product_id, id);
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'product_media_variant_same_product_fk') then
    alter table public.product_media add constraint product_media_variant_same_product_fk
      foreign key (product_id, variant_id) references public.product_variants(product_id, id);
  end if;
end $$;
