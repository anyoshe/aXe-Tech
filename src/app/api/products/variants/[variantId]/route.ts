import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { requireAdminSession } from "@/lib/require-admin";

type Ctx = { params: Promise<{ variantId: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }
  const { variantId } = await ctx.params;
  const body = await req.json();
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  const fields = [
    "sku", "label", "processor", "ram", "storage", "display", "os",
    "condition_grade", "battery_notes", "currency", "availability",
    "warranty", "accessories", "notes", "sort_order", "published",
    "functional_inspection", "battery_assessment", "display_condition",
    "keyboard_touchpad_condition", "ports_connectivity_checks", "os_license_status",
    "warranty_coverage", "warranty_exclusions", "after_sales_support",
  ];
  for (const f of fields) {
    if (body[f] !== undefined) updates[f] = body[f];
  }
  if (body.price !== undefined) {
    const price = body.price === null || body.price === "" ? null : Number(body.price);
    if (price !== null && (!Number.isFinite(price) || price < 0)) return NextResponse.json({ error: "Price must be a valid non-negative number" }, { status: 400 });
    updates.price = price;
  }
  if (body.availability !== undefined && !["in_stock", "on_order", "request_quote", "request_config", "unavailable"].includes(body.availability)) return NextResponse.json({ error: "Invalid availability" }, { status: 400 });
  if (body.condition_grade !== undefined && body.condition_grade !== null && !["A", "B", "C"].includes(body.condition_grade)) return NextResponse.json({ error: "Invalid condition grade" }, { status: 400 });
  const capacity = /^\s*\d+(?:\.\d+)?\s*(?:GB|TB|MB)\b/i;
  if (body.ram !== undefined && body.ram && !capacity.test(String(body.ram))) return NextResponse.json({ error: "RAM must include a valid capacity such as 8GB" }, { status: 400 });
  if (body.storage !== undefined && body.storage && !capacity.test(String(body.storage))) return NextResponse.json({ error: "Storage must include a valid capacity such as 256GB SSD" }, { status: 400 });

  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from("product_variants")
    .update(updates)
    .eq("id", variantId)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ variant: data });
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }
  const { variantId } = await ctx.params;
  const sb = getSupabaseAdmin();
  const { error } = await sb.from("product_variants").delete().eq("id", variantId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
