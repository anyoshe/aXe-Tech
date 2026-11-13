-- Example only: attach configurations to parent product id = refurb-business-laptop
-- Prices left null or indicative — adjust before publish. Do not invent stock.

insert into public.product_variants
  (product_id, label, processor, ram, storage, display, condition_grade, price, availability, warranty, battery_notes, sort_order, published)
values
  ('refurb-business-laptop', 'Core i5 · 8GB · 256GB SSD · Grade A', 'Intel Core i5 (8th gen class)', '8GB', '256GB SSD', '14-inch FHD', 'A', 29500, 'request_quote', 'Confirm with quote', 'Confirm health % on unit', 1, true),
  ('refurb-business-laptop', 'Core i5 · 16GB · 512GB SSD · Grade A', 'Intel Core i5 (8th gen class)', '16GB', '512GB SSD', '14-inch FHD', 'A', null, 'request_quote', 'Confirm with quote', 'Confirm health % on unit', 2, true),
  ('refurb-business-laptop', 'Core i7 · 16GB · 512GB SSD · Grade B', 'Intel Core i7 (8th gen class)', '16GB', '512GB SSD', '14-inch FHD', 'B', null, 'on_order', 'Confirm with quote', 'Confirm health % on unit', 3, true)
on conflict do nothing;
