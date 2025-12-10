# Migrate / Normalize Product Images

This script scans all products in the database and normalizes their `images` arrays by rejoining any accidentally split Base64 fragments (e.g. when `data:image/jpeg;base64` and the payload were stored as separate array entries).

Prerequisites
- Node.js installed
- Access to your MongoDB instance (set `MONGODB_URI` env var)
- `ts-node` installed (optional: run via `npx ts-node`)

Files
- `scripts/migrate-normalize-images.ts` — the migration script (TypeScript)

Usage (dry-run)
```bash
# show what would change, but do not persist
npx ts-node scripts/migrate-normalize-images.ts
```

Usage (apply changes)
```bash
# actually update documents in the database
npx ts-node scripts/migrate-normalize-images.ts --apply
```

Options
- `--limit N` — stop after checking N products (useful for testing)

Examples
```bash
# dry-run first 10 products
npx ts-node scripts/migrate-normalize-images.ts --limit 10

# apply to all products
npx ts-node scripts/migrate-normalize-images.ts --apply
```

Notes
- The script uses the same normalization logic as the client-side `normalizeImageList` helper. It's recommended to run a dry-run first, then run with `--apply` when you're ready.
- Back up your database before running the migration in production.
