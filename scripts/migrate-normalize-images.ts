#!/usr/bin/env node
import 'dotenv/config';
import { dbConnect } from '../src/lib/mongodb';
import Product from '../src/models/Product';
import { normalizeImageList } from '../src/utils/image-utils';

async function main() {
  const args = process.argv.slice(2);
  const apply = args.includes('--apply');
  const limitIndex = args.findIndex(a => a === '--limit');
  const limit = limitIndex !== -1 ? Number(args[limitIndex + 1] || 0) : 0;

  console.log(`Connecting to DB (${process.env.MONGODB_URI || 'MONGODB_URI env var or default'})...`);
  await dbConnect();

  const query: any = {};
  const cursor = Product.find(query).cursor();

  let total = 0;
  let changed = 0;
  for await (const doc of cursor) {
    total++;
    const original = Array.isArray(doc.images) ? doc.images : [];
    const normalized = normalizeImageList(original);

    // Compare lengths and content
    const same = JSON.stringify(original) === JSON.stringify(normalized);
    if (!same) {
      changed++;
      console.log(`Product id=${doc.id} needs normalization. original length=${original.length} -> normalized length=${normalized.length}`);
      if (apply) {
        doc.images = normalized;
        try {
          await doc.save();
          console.log(`  -> Updated product id=${doc.id}`);
        } catch (err) {
          console.error(`  -> Failed to update ${doc.id}:`, err);
        }
      }
    }

    if (limit > 0 && total >= limit) break;
  }

  console.log(`Checked ${total} products. ${changed} require normalization.${apply ? ' Changes applied.' : ' Dry-run only.'}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
