import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { canPartnerOwnLeads, findPartnerById } from "@/lib/partners";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const sb = getSupabaseAdmin();
  let q = sb
    .from("quote_requests")
    .select("*, leads(org_name, contact_name, phone), partners(full_name, email)")
    .order("created_at", { ascending: false });

  if (session.user.role === "partner") q = q.eq("partner_id", session.user.id);
  else if (session.user.role !== "admin")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ quotes: data || [] });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const body = await req.json();
  let partnerId = session.user.role === "partner" ? session.user.id : body.partner_id;

  if (session.user.role === "partner") {
    const partner = await findPartnerById(session.user.id);
    if (!partner || !canPartnerOwnLeads(partner.status)) {
      return NextResponse.json({ error: "Only CERTIFIED/ACTIVE partners can request quotes." }, { status: 403 });
    }
  }

  const solution_summary = String(body.solution_summary || "").trim();
  if (!solution_summary) {
    return NextResponse.json({ error: "solution_summary required" }, { status: 400 });
  }

  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from("quote_requests")
    .insert({
      lead_id: body.lead_id || null,
      partner_id: partnerId,
      pillar: body.pillar || "run",
      solution_summary,
      qualification: body.qualification || {},
      requested_amount: body.requested_amount ? Number(body.requested_amount) : null,
      status: "PENDING",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (body.lead_id) {
    await sb
      .from("leads")
      .update({ stage: "QUOTE_REQUEST", updated_at: new Date().toISOString() })
      .eq("id", body.lead_id);
  }

  return NextResponse.json({ quote: data });
}
