# Supabase setup for aXe-Tech (ICT products)

Products no longer use MongoDB. Follow these steps once.

## 1. Create a Supabase project

1. Go to [https://supabase.com](https://supabase.com) → **New project**
2. Name it e.g. `axe-tech` or `getaxe`
3. Set a database password (save it)
4. Choose a region close to Kenya (e.g. Frankfurt `eu-central-1` if available)

## 2. Run the SQL schema

1. In the project: **SQL Editor** → **New query**
2. Paste the contents of `supabase/schema.sql`
3. Click **Run**

This creates the `products` table, indexes, RLS policies, and a `product-images` storage bucket.

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

## Security (after it works)

The SQL file includes open write policies for **setup only**. Later:

1. Remove the “Anon can insert/update/delete products” policies
2. Keep public **SELECT**
3. Only write from API routes using `SUPABASE_SERVICE_ROLE_KEY`
4. Protect `/admin/products` with NextAuth

## Images

- **Short term:** admin can still store image URLs or small Base64 strings in `images text[]`
- **Better:** upload files to the `product-images` bucket and save the public URL in `images`

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
