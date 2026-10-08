import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const sb = getSupabaseAdmin();
  let q = sb.from("warranties").select("*").order("created_at", { ascending: false });
  if (session.user.role === "partner") q = q.eq("partner_id", session.user.id);
  else if (session.user.role !== "admin")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ warranties: data || [] });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Admin only" }, { status: 401 });
  }
  const body = await req.json();
  const customer_name = String(body.customer_name || "").trim();
  const product_name = String(body.product_name || "").trim();
  if (!customer_name || !product_name) {
    return NextResponse.json({ error: "customer_name and product_name required" }, { status: 400 });
  }

  const months = Number(body.warranty_months || 12);
  let warranty_end = body.warranty_end || null;
  if (!warranty_end && body.purchase_date) {
    const d = new Date(body.purchase_date);
    d.setMonth(d.getMonth() + months);
    warranty_end = d.toISOString().slice(0, 10);
  }

  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from("warranties")
    .insert({
      customer_name,
      product_name,
      serial_number: body.serial_number || null,
      supplier: body.supplier || null,
      purchase_date: body.purchase_date || null,
      warranty_months: months,
      warranty_end,
      partner_id: body.partner_id || null,
      deal_id: body.deal_id || null,
      notes: body.notes || null,
      status: "ACTIVE",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ warranty: data });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Admin only" }, { status: 401 });
  }
  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (body.status) updates.status = body.status;
  if (body.notes !== undefined) updates.notes = body.notes;

  const sb = getSupabaseAdmin();
  const { data, error } = await sb.from("warranties").update(updates).eq("id", body.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ warranty: data });
}
