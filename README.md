# aXe-Tech / GetAxe Kenya

Next.js site for **GetAxe Kenya** — ICT products, services, and School ERP demo.

## Stack

- **Next.js** (App Router)
- **Supabase** — products, School ERP data, storage
- **NextAuth** — admin login via `ADMIN_EMAIL` / `ADMIN_PASSWORD` (env)
- **Tailwind CSS**

MongoDB is **not** used.

## Setup

1. Copy env vars (see `SUPABASE_SETUP.md`):

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

2. For a **new** Supabase project, in SQL Editor run the product bootstrap files in order: `supabase/schema.sql`, `supabase/ict-catalogue-expansion.sql`, `supabase/product-variants-media.sql`, then `supabase/migrations/20261113_catalogue_security_and_sourcing.sql`. Run `supabase/school-erp.sql` only if you need the ERP tables.

   For the existing production catalogue, do **not** rerun `supabase/schema.sql`; review and apply only the catalogue migration after its preflight checks.

3. Install and run:

```bash
npm install
npm run dev
```

## Useful routes

| Path | Purpose |
|------|---------|
| `/shop` or `/ict-products` | Product catalog |
| `/admin/products` | Manage / seed products |
| `/school-erp` | School ERP marketing page |
| `/school-erp/demo` | Interactive ERP demo |
| `/contactus` | Contact form |

## Deploy (Vercel)

Add the same env vars in **Vercel → Settings → Environment Variables**, then redeploy.  
Do **not** set `MONGODB_URI`.
