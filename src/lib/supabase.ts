import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client (API routes, server components).
 * Uses the service role key when available so admin writes work
 * without fighting Row Level Security during setup.
 *
 * Env (add to .env.local and Vercel):
 *   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ...   (server only — never expose to browser)
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export type ProductRow = {
  id: string;
  title: string;
  price: number;
  category: string | null;
  images: string[] | null;
  videos: string[] | null;
  features: string[] | null;
  short: string | null;
  description: string | null;
  specs: Record<string, unknown> | null;
  brand?: string | null;
  condition?: string | null;
  availability?: string | null;
  published?: boolean;
  featured?: boolean;
  display_order?: number;
  starting_price?: boolean;
  internal_cost?: number | null;
  target_price?: number | null;
  bulk_price?: number | null;
  price_reviewed_at?: string | null;
  market_notes?: string | null;
  supplier_reference?: string | null;
  warranty?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  image_sources?: Record<string, unknown> | null;
  created_at?: string;
  updated_at?: string;
};

/** Shape the frontend / old Mongo API expected */
export type ProductApi = {
  id: string;
  title: string;
  price: number;
  category?: string;
  images: string[];
  videos: string[];
  features: string[];
  short?: string;
  description?: string;
  specs: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
  brand?: string;
  condition?: string;
  availability?: string;
  published?: boolean;
  featured?: boolean;
  displayOrder?: number;
  startingPrice?: boolean;
  internalCost?: number | null;
  targetPrice?: number | null;
  bulkPrice?: number | null;
  priceReviewedAt?: string | null;
  marketNotes?: string;
  supplierReference?: string;
  warranty?: string;
  seoTitle?: string;
  seoDescription?: string;
  imageSources?: Record<string, unknown>;
};

export function rowToProduct(row: ProductRow): ProductApi {
  return {
    id: row.id,
    title: row.title,
    price: Number(row.price),
    category: row.category ?? undefined,
    images: row.images ?? [],
    videos: row.videos ?? [],
    features: row.features ?? [],
    short: row.short ?? undefined,
    description: row.description ?? undefined,
    specs: row.specs ?? {},
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    brand: row.brand ?? undefined,
    condition: row.condition ?? undefined,
    availability: row.availability ?? undefined,
    published: row.published ?? true,
    featured: row.featured ?? false,
    displayOrder: row.display_order ?? 0,
    startingPrice: row.starting_price ?? true,
    internalCost: row.internal_cost ?? null,
    targetPrice: row.target_price ?? null,
    bulkPrice: row.bulk_price ?? null,
    priceReviewedAt: row.price_reviewed_at ?? null,
    marketNotes: row.market_notes ?? undefined,
    supplierReference: row.supplier_reference ?? undefined,
    warranty: row.warranty ?? undefined,
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
    imageSources: row.image_sources ?? undefined,
  };
}

export function productToRow(body: Partial<ProductApi> & { id: string; title: string; price: number }): Partial<ProductRow> {
  return {
    id: body.id,
    title: body.title,
    price: body.price,
    category: body.category ?? null,
    images: body.images ?? [],
    videos: body.videos ?? [],
    features: body.features ?? [],
    short: body.short ?? null,
    description: body.description ?? null,
    specs: body.specs ?? {},
    updated_at: new Date().toISOString(),
    brand: body.brand ?? null,
    condition: body.condition ?? null,
    availability: body.availability ?? null,
    published: body.published ?? true,
    featured: body.featured ?? false,
    display_order: body.displayOrder ?? 0,
    starting_price: body.startingPrice ?? true,
    internal_cost: body.internalCost ?? null,
    target_price: body.targetPrice ?? null,
    bulk_price: body.bulkPrice ?? null,
    price_reviewed_at: body.priceReviewedAt ?? null,
    market_notes: body.marketNotes ?? null,
    supplier_reference: body.supplierReference ?? null,
    warranty: body.warranty ?? null,
    seo_title: body.seoTitle ?? null,
    seo_description: body.seoDescription ?? null,
    image_sources: body.imageSources ?? {},
  };
}

function assertConfig() {
  if (!supabaseUrl || !anonKey) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
  }
}

/** Prefer service role on the server for admin CRUD */
export function getSupabaseAdmin(): SupabaseClient {
  assertConfig();
  const key = serviceRoleKey || anonKey;
  return createClient(supabaseUrl, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Browser / public client (anon key only) */
export function getSupabaseBrowser(): SupabaseClient {
  assertConfig();
  return createClient(supabaseUrl, anonKey);
}

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && anonKey);
}
