import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Admin only" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const { id } = await ctx.params;
  const body = await req.json();
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };

  if (body.status) {
    if (!["PENDING", "APPROVED", "REJECTED", "SENT"].includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    updates.status = body.status;
    updates.decided_at = new Date().toISOString();
    updates.admin_id = session.user.email || session.user.id;
  }
  if (body.approved_setup_fee !== undefined) updates.approved_setup_fee = Number(body.approved_setup_fee);
  if (body.approved_monthly_fee !== undefined)
    updates.approved_monthly_fee = Number(body.approved_monthly_fee);
  if (body.approved_one_off !== undefined) updates.approved_one_off = Number(body.approved_one_off);
  if (body.approved_notes !== undefined) updates.approved_notes = body.approved_notes;

  const sb = getSupabaseAdmin();
  const { data, error } = await sb.from("quote_requests").update(updates).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (body.status === "APPROVED" && data.lead_id) {
    await sb
      .from("leads")
      .update({ stage: "QUOTE_SENT", updated_at: new Date().toISOString() })
      .eq("id", data.lead_id);
  }

  return NextResponse.json({ quote: data });
}
