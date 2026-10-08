import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { PARTNER_STATUSES, type PartnerStatus } from "@/lib/partners";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from("partners")
    .select(
      "id, full_name, email, phone, county, occupation, specialty, status, role, mpesa_number, target_market, network_notes, experience, admin_notes, created_at, updated_at, activated_at, certified_at"
    )
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ partners: data || [] });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const id = String(body.id || "");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (body.status) {
    if (!PARTNER_STATUSES.includes(body.status as PartnerStatus)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    updates.status = body.status;
    if (body.status === "CERTIFIED") updates.certified_at = new Date().toISOString();
    if (body.status === "ACTIVE") updates.activated_at = new Date().toISOString();
  }
  if (typeof body.admin_notes === "string") updates.admin_notes = body.admin_notes;
  if (body.specialty) updates.specialty = body.specialty;

  const sb = getSupabaseAdmin();
  const { data, error } = await sb.from("partners").update(updates).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ partner: data });
}
