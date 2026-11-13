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
  const sb = getSupabaseAdmin();
  const { data: product } = await sb.from("products").select("id").eq("id", id).maybeSingle();
  if (!product) return NextResponse.json({ error: "Parent product not found" }, { status: 404 });
  const label = String(body.label || "").trim();
  if (!label) return NextResponse.json({ error: "label required" }, { status: 400 });

  const price =
    body.price === null || body.price === "" || body.price === undefined
      ? null
      : Number(body.price);

  if (price != null && (!Number.isFinite(price) || price < 0)) return NextResponse.json({ error: "Price must be a valid non-negative number" }, { status: 400 });
  const capacity = /^\s*\d+(?:\.\d+)?\s*(?:GB|TB|MB)\b/i;
  if (body.ram && !capacity.test(String(body.ram))) return NextResponse.json({ error: "RAM must include a valid capacity such as 8GB" }, { status: 400 });
  if (body.storage && !capacity.test(String(body.storage))) return NextResponse.json({ error: "Storage must include a valid capacity such as 256GB SSD" }, { status: 400 });
  if (body.availability && !["in_stock", "on_order", "request_quote", "request_config", "unavailable"].includes(body.availability)) return NextResponse.json({ error: "Invalid availability" }, { status: 400 });
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
    functional_inspection: body.functional_inspection || null,
    battery_assessment: body.battery_assessment || null,
    display_condition: body.display_condition || null,
    keyboard_touchpad_condition: body.keyboard_touchpad_condition || null,
    ports_connectivity_checks: body.ports_connectivity_checks || null,
    os_license_status: body.os_license_status || null,
    price: price != null && !Number.isNaN(price) ? price : null,
    currency: body.currency || "KES",
    availability: body.availability || "request_quote",
    warranty: body.warranty || null,
    warranty_coverage: body.warranty_coverage || null,
    warranty_exclusions: body.warranty_exclusions || null,
    after_sales_support: body.after_sales_support || null,
    accessories: body.accessories || null,
    notes: body.notes || null,
    sort_order: Number(body.sort_order ?? 0),
    published: body.published !== false,
  };

  const { data, error } = await sb.from("product_variants").insert(row).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ variant: data }, { status: 201 });
}
