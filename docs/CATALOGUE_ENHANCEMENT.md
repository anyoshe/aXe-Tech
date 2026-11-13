# Product catalogue enhancement status

## Storage policy
- **Only Supabase Storage** (`product-images` bucket).
- **No Cloudinary** (not in dependencies or code).
- Manufacturer image URLs (HP support / datasheets) are **reference links only**.
- Images are **not** auto-downloaded into the catalogue when reuse rights are unclear.
- Admins upload permitted or original stock photos via `/admin/products` → Product gallery.

## HP EliteBook 840 G6 reference links
- https://support.hp.com/emea_africa-en/product/product-specs/hp-elitebook-840-g6-notebook-pc/26609796/
- https://doi-product-assets.s3.amazonaws.com/pub/Manufacturer-Brochure/1059762671.pdf
- https://www.bhphotovideo.com/lit_files/558660.pdf

## Activate on a project
1. Run `supabase/product-variants-media.sql` in Supabase SQL Editor.
2. Deploy / pull `main`.
3. Admin → product → upload gallery images + add configurations.
4. Optional: `supabase/seed-elitebook-variants.example.sql` after editing prices.
