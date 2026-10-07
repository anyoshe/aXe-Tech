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

2. In Supabase SQL Editor, run:
   - `supabase/schema.sql` (products + storage)
   - `supabase/school-erp.sql` (ERP tables)

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
