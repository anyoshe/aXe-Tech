import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { requireAdminSession } from "@/lib/require-admin";

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Catalogue service unavailable" }, { status: 503 });
  const body = await req.json();
  const product_category = String(body.product_category || "").trim();
  const customer_name = String(body.customer_name || "").trim();
  const customer_contact = String(body.customer_contact || "").trim();
  if (!product_category || !customer_name || !customer_contact) return NextResponse.json({ error: "Category, name and contact are required" }, { status: 400 });
  const budget = body.budget == null || body.budget === "" ? null : Number(body.budget);
  if (budget !== null && (!Number.isFinite(budget) || budget < 0)) return NextResponse.json({ error: "Budget must be non-negative" }, { status: 400 });
  const sb = getSupabaseAdmin();
  const { data, error } = await sb.from("product_sourcing_requests").insert({
    product_category, customer_name, customer_contact, budget,
    preferred_brand: String(body.preferred_brand || "").trim() || null,
    preferred_model: String(body.preferred_model || "").trim() || null,
    processor: String(body.processor || "").trim() || null,
    ram: String(body.ram || "").trim() || null,
    storage: String(body.storage || "").trim() || null,
    condition_preference: String(body.condition_preference || "").trim() || null,
    customer_email: String(body.customer_email || "").trim() || null,
    additional_requirements: String(body.additional_requirements || "").trim() || null,
  }).select("id").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id, message: "Sourcing request received" }, { status: 201 });
}

export async function GET() {
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  const { data, error } = await getSupabaseAdmin().from("product_sourcing_requests").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ requests: data || [] });
}
