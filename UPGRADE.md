# Upgrade notes

- Database: **Supabase only** (products + School ERP).
- Auth: env-based admin (`ADMIN_EMAIL`, `ADMIN_PASSWORD`).
- Never commit secrets. Use `.env.local` and Vercel env vars.
