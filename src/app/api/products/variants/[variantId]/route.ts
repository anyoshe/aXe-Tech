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
  ];
  for (const f of fields) {
    if (body[f] !== undefined) updates[f] = body[f];
  }
  if (body.price !== undefined) {
    updates.price =
      body.price === null || body.price === "" ? null : Number(body.price);
  }

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
