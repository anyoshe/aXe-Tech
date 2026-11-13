import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { requireAdminSession } from "@/lib/require-admin";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }
  const { id } = await ctx.params;
  const sb = getSupabaseAdmin();
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "admin";

  let q = sb
    .from("product_variants")
    .select("*")
    .eq("product_id", id)
    .order("sort_order", { ascending: true });

  if (!isAdmin) q = q.eq("published", true);

  const { data, error } = await q;
  if (error) {
    // Table may not exist yet
    if (error.message?.includes("product_variants") || error.code === "42P01") {
      return NextResponse.json({ variants: [], hint: "Run supabase/product-variants-media.sql" });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ variants: data || [] });
}

export async function POST(req: NextRequest, ctx: Ctx) {
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const { id } = await ctx.params;
  const body = await req.json();
  const label = String(body.label || "").trim();
  if (!label) return NextResponse.json({ error: "label required" }, { status: 400 });

  const price =
    body.price === null || body.price === "" || body.price === undefined
      ? null
      : Number(body.price);

  const row = {
    product_id: id,
    sku: body.sku || null,
    label,
    processor: body.processor || null,
    ram: body.ram || null,
    storage: body.storage || null,
    display: body.display || null,
    os: body.os || null,
    condition_grade: body.condition_grade || null,
    battery_notes: body.battery_notes || null,
    price: price != null && !Number.isNaN(price) ? price : null,
    currency: body.currency || "KES",
    availability: body.availability || "request_quote",
    warranty: body.warranty || null,
    accessories: body.accessories || null,
    notes: body.notes || null,
    sort_order: Number(body.sort_order ?? 0),
    published: body.published !== false,
  };

  const sb = getSupabaseAdmin();
  const { data, error } = await sb.from("product_variants").insert(row).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ variant: data }, { status: 201 });
}
