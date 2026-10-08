import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { LEAD_STAGES, type LeadStage } from "@/lib/partners";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const { id } = await ctx.params;
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from("leads")
    .select("*, partners(full_name, email), lead_activities(*)")
    .eq("id", id)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (session.user.role === "partner" && data.partner_id !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ lead: data });
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const { id } = await ctx.params;
  const sb = getSupabaseAdmin();
  const { data: existing } = await sb.from("leads").select("*").eq("id", id).maybeSingle();
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (session.user.role === "partner" && existing.partner_id !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (session.user.role !== "admin" && session.user.role !== "partner") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };

  if (body.stage) {
    if (!LEAD_STAGES.includes(body.stage as LeadStage)) {
      return NextResponse.json({ error: "Invalid stage" }, { status: 400 });
    }
    updates.stage = body.stage;
  }
  for (const key of [
    "next_action",
    "follow_up_at",
    "requirement",
    "lost_reason",
    "contact_name",
    "phone",
    "email",
    "location",
    "county",
    "expected_value",
    "pillar",
    "customer_type",
  ] as const) {
    if (body[key] !== undefined) updates[key] = body[key];
  }
  if (session.user.role === "admin" && body.admin_notes !== undefined) {
    updates.admin_notes = body.admin_notes;
  }
  if (session.user.role === "admin" && body.partner_id !== undefined) {
    updates.partner_id = body.partner_id;
  }

  const { data, error } = await sb.from("leads").update(updates).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (body.stage && body.stage !== existing.stage) {
    await sb.from("lead_activities").insert({
      lead_id: id,
      partner_id: session.user.role === "partner" ? session.user.id : existing.partner_id,
      activity_type: "stage_change",
      body: `Stage: ${existing.stage} → ${body.stage}`,
    });
  }

  return NextResponse.json({ lead: data });
}
