import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { notifyUser, MARKETER_LEAD_FEE_KES } from "@/lib/notifications";
import { writeAuditLog } from "@/lib/audit";
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

  // Lead protection: block duplicate active protected leads (same phone)
  const { data: existing } = await sb
    .from("leads")
    .select("id, org_name, partner_id, protected_until, stage")
    .eq("phone", phone)
    .not("stage", "in", '("LOST","WON")')
    .gt("protected_until", new Date().toISOString())
    .limit(1);
  if (existing && existing.length > 0 && session.user.role === "partner") {
    const ex = existing[0];
    if (ex.partner_id && ex.partner_id !== partnerId) {
      return NextResponse.json(
        {
          error: `Lead protection active: this phone is locked to another partner until ${new Date(ex.protected_until).toLocaleDateString()} (${ex.org_name}).`,
        },
        { status: 409 }
      );
    }
  }

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
    campaign_code: String(body.campaign_code || "").trim().toUpperCase() || null,
    referral_code: String(body.referral_code || "").trim().toUpperCase() || null,
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

  
  // Notify admin of new lead
  await notifyUser({
    user_key: "admin",
    title: "New lead registered",
    body: `${data.org_name} — ${data.contact_name} (${data.phone})`,
    link: "/admin/leads",
  });
  await writeAuditLog({
    actor_id: session.user.id,
    actor_role: session.user.role,
    action: "lead.create",
    entity_type: "lead",
    entity_id: data.id,
    meta: { org_name: data.org_name, campaign_code: data.campaign_code },
  });

  // Marketer lead fee if campaign code maps to a marketer
  const campCode = data.campaign_code ? String(data.campaign_code).toUpperCase() : null;
  if (campCode && MARKETER_LEAD_FEE_KES > 0) {
    const { data: camp } = await sb
      .from("marketing_campaigns")
      .select("id, marketer_partner_id, status")
      .eq("code", campCode)
      .eq("status", "ACTIVE")
      .maybeSingle();
    if (camp?.marketer_partner_id) {
      await sb.from("commissions").insert({
        partner_id: camp.marketer_partner_id,
        basis: "lead_fee",
        basis_amount: MARKETER_LEAD_FEE_KES,
        commission_pct: 1,
        commission_amount: MARKETER_LEAD_FEE_KES,
        status: "ELIGIBLE",
        eligibility_date: new Date().toISOString(),
        notes: `Lead fee for campaign ${campCode} / lead ${data.id}`,
      });
      await notifyUser({
        user_key: camp.marketer_partner_id,
        title: "Lead fee earned",
        body: `KES ${MARKETER_LEAD_FEE_KES} for attributed lead ${data.org_name}`,
        link: "/partners/commissions",
      });
    }
  }

  return NextResponse.json({ lead: data });
}
