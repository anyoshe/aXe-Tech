import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import {
  canPartnerOwnLeads,
  defaultProtectedUntil,
  findPartnerById,
} from "@/lib/partners";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }
  const sb = getSupabaseAdmin();
  const stage = req.nextUrl.searchParams.get("stage");

  let q = sb.from("leads").select("*, partners(full_name, email, phone)").order("updated_at", {
    ascending: false,
  });

  if (session.user.role === "partner") {
    q = q.eq("partner_id", session.user.id);
  } else if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (stage) q = q.eq("stage", stage);

  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ leads: data || [] });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const body = await req.json();
  let partnerId: string | null = null;
  let protectionDays = 45;

  if (session.user.role === "partner") {
    const partner = await findPartnerById(session.user.id);
    if (!partner || !canPartnerOwnLeads(partner.status)) {
      return NextResponse.json(
        { error: "Only CERTIFIED or ACTIVE partners can register leads." },
        { status: 403 }
      );
    }
    partnerId = partner.id;
    protectionDays = partner.protection_days || 45;
  } else if (session.user.role === "admin") {
    partnerId = body.partner_id || null;
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const org_name = String(body.org_name || "").trim();
  const contact_name = String(body.contact_name || "").trim();
  const phone = String(body.phone || "").trim();
  const requirement = String(body.requirement || "").trim();

  if (!org_name || !contact_name || !phone || !requirement) {
    return NextResponse.json(
      { error: "Organisation, contact, phone and requirement are required." },
      { status: 400 }
    );
  }

  const sb = getSupabaseAdmin();
  const row = {
    partner_id: partnerId,
    org_name,
    contact_name,
    phone,
    email: String(body.email || "").trim() || null,
    location: String(body.location || "").trim() || null,
    county: String(body.county || "").trim() || null,
    industry: String(body.industry || "").trim() || null,
    customer_type: body.customer_type || "other",
    requirement,
    pillar: body.pillar || "equip",
    source: body.source || "partner",
    expected_value: body.expected_value ? Number(body.expected_value) : null,
    stage: "NEW",
    next_action: String(body.next_action || "").trim() || null,
    follow_up_at: body.follow_up_at || null,
    protected_until: defaultProtectedUntil(protectionDays),
  };

  const { data, error } = await sb.from("leads").insert(row).select().single();
  if (error) {
    console.error("[leads POST]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (partnerId) {
    await sb.from("lead_activities").insert({
      lead_id: data.id,
      partner_id: partnerId,
      activity_type: "system",
      body: "Lead registered",
    });
  }

  return NextResponse.json({ lead: data });
}
