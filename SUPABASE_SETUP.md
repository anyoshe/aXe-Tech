# Supabase setup for aXe-Tech (ICT products)

Products use Supabase. The commands below describe a new-project bootstrap; do not rerun the bootstrap schema against the existing production catalogue.

## 1. Create a Supabase project

1. Go to [https://supabase.com](https://supabase.com) → **New project**
2. Name it e.g. `axe-tech` or `getaxe`
3. Set a database password (save it)
4. Choose a region close to Kenya (e.g. Frankfurt `eu-central-1` if available)

## 2. Run the SQL schema

1. In the project: **SQL Editor** → **New query**
2. Paste the contents of `supabase/schema.sql`
3. Click **Run**

This creates the base `products` table and bucket. For a new project, continue with `supabase/ict-catalogue-expansion.sql` and `supabase/product-variants-media.sql`, then apply the catalogue migration below. For the existing production project, apply only the reviewed migration after confirming its preflight requirements; do not rerun `supabase/schema.sql`.

## 3. Copy API keys

**Project Settings → API**:

| Variable | Where |
|----------|--------|
| Project URL | `NEXT_PUBLIC_SUPABASE_URL` |
| `anon` `public` key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `service_role` `secret` key | `SUPABASE_SERVICE_ROLE_KEY` (server only) |

## 4. Update `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Optional — you can leave or remove Mongo
# MONGODB_URI=...

NEXT_PUBLIC_SITE_URL=https://getaxekenya.com
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-existing-secret
```

## 5. Install & run

```bash
npm install
npm run dev
```

- Shop / ICT: http://localhost:3000/ict-products or `/shop`
- Admin upload: http://localhost:3000/admin/products

### Optional sample data

```bash
curl -X POST http://localhost:3000/api/products/seed
```

## 6. Vercel

Add the same three Supabase env vars in **Vercel → Project → Settings → Environment Variables**, then redeploy.

## Catalogue security

- Public reads are limited to published products, variants and media after the catalogue expansion/migration has been applied.
- Product, variant and media mutations go through APIs protected by the NextAuth `admin` role and use the server-only `SUPABASE_SERVICE_ROLE_KEY`.
- Never put the service-role key in a `NEXT_PUBLIC_` variable or browser code.
- For the existing production database, apply `supabase/migrations/20261113_catalogue_security_and_sourcing.sql` in the Supabase SQL Editor after the pre-deployment checks. Do not rerun `supabase/schema.sql`.

## Images

Use `/admin/products` → select a product → **Product photo gallery**. Uploads are validated and stored in the existing public `product-images` bucket; image metadata is recorded in `product_media`. Do not add Base64 image payloads or arbitrary external image URLs through the product form.

## Vercel environment variables

Add **all** of these in Vercel → Project → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://your-production-domain.com
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD=a-strong-password
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

MongoDB (`MONGODB_URI`) is **no longer used**. You can delete it from Vercel.

After saving env vars, **Redeploy** the project.

## School ERP tables

After products schema, run:

**SQL Editor →** paste `supabase/school-erp.sql` → **Run**

Tables: `erp_students`, `erp_teachers`, `erp_subjects`, `erp_books`, `erp_issues`, `erp_invoices`, `erp_expenses`, `erp_assignments` (all scoped by `school_id`).

Demo seed: open `/school-erp/demo` and use the seed action, or:

```bash
curl -X POST http://localhost:3000/api/schools/demo-school/seed
```

## Partner CRM (Sprint 1–2)

In Supabase SQL Editor, also run:

```text
supabase/partners-crm.sql
```

This creates:

- `partners` — applications, status, specialty, password hash
- `leads` — CRM with ownership + protection window
- `lead_activities` — notes / stage history

### Routes

| Path | Purpose |
|------|---------|
| `/partners` | Public partner programme page |
| `/partners/apply` | Application form |
| `/partners/login` | Partner + admin login |
| `/partners/dashboard` | Partner leads pipeline |
| `/partners/leads/new` | Register a lead |
| `/admin/partners` | Approve / set partner status |
| `/admin/leads` | All leads |

### Login rules

- **Admin:** `ADMIN_EMAIL` / `ADMIN_PASSWORD` (env)
- **Partner:** can sign in from status `APPROVED` upward
- **Register leads:** only `CERTIFIED` or `ACTIVE`

### Recommended admin flow

1. Partner applies → status `APPLIED`
2. You set `SCREENING` → `APPROVED` → `TRAINING` → `CERTIFIED` → `ACTIVE`
3. Partner logs in and registers leads (45-day protection by default)

## Sprint 3–5 (quotes, deals, commissions, subscriptions)

Run in SQL Editor **after** `partners-crm.sql`:

```text
supabase/partners-crm-v2.sql
```

| Path | Role |
|------|------|
| `/partners/training` | Academy content |
| `/partners/quotes` | Request quotes |
| `/partners/commissions` | Partner statement |
| `/admin/quotes` | Approve/reject quotes |
| `/admin/deals` | Record deals & mark PAID |
| `/admin/commissions` | Approve/pay commissions |

Commission pilot rates (code: `src/lib/commissions.ts`): hardware 25% of GP, connect 8% of margin, setup 15%, sub year-1 15%.

## Sprint 6–8 (onboarding, jobs, campaigns)

Run after v2:

```text
supabase/partners-crm-v3.sql
```

| Path | Purpose |
|------|---------|
| `/partners/onboarding` | Agreement, quiz, referral code |
| `/admin/jobs` | Technical jobs dispatch |
| `/admin/campaigns` | Marketing campaign codes |

## Sprint 9–10 (tickets, warranties)

Run after v3:

```text
supabase/partners-crm-v4.sql
```

| Path | Purpose |
|------|---------|
| `/admin/tickets` | Support ticket queue |
| `/admin/subscriptions` | MRR + record monthly payment |
| `/admin/warranties` | Serial / warranty register |
| `/partners/tickets` | Partner opens tickets |
| `/partners/jobs` | Partner / tech job list |

## Harden (v5 — customers)

```text
supabase/partners-crm-v5.sql
```

Security: product write APIs and upload require admin session. Marking a deal PAID requires `payment_ref`.

## v6 — audit + notifications

```text
supabase/partners-crm-v6.sql
```

Optional email: set `RESEND_API_KEY` and `NOTIFY_FROM_EMAIL` on Vercel.  
Marketer lead fee: `MARKETER_LEAD_FEE_KES` (default 500).

## Product variants & media gallery

For a new project only, after `schema.sql` and `ict-catalogue-expansion.sql`, run in SQL Editor:

```text
supabase/product-variants-media.sql
```

- Bucket: `product-images` (public)
- Tables: `product_variants`, `product_media`
- Admin: `/admin/products` → open a product → **Configurations (variants)**
- Upload images: `/api/products/[id]/media` (the `/api/upload` compatibility endpoint is also admin-protected and requires a product ID).

## Existing production catalogue deployment

1. Verify the `product-images` bucket exists and is public, and confirm the expected product/variant/media columns and zero invalid media-to-variant links.
2. Review current `pg_policies` entries for `products`, `product_variants`, `product_media`, and `storage.objects` for bucket `product-images`.
3. Apply `supabase/migrations/20261113_catalogue_security_and_sourcing.sql` once in the SQL Editor. It checks prerequisites in a transaction and creates the sourcing table, disclosure columns, composite media/variant foreign key, read policies and table grants.
4. Verify the resulting policies/grants and test public reads plus admin-only writes before loading the catalogue.

HP EliteBook reference (spec only — do not publish manufacturer photos without licence clearance):

- https://support.hp.com/emea_africa-en/product/product-specs/hp-elitebook-840-g6-notebook-pc/26609796/

Upload original stock photos via admin into Supabase Storage.
