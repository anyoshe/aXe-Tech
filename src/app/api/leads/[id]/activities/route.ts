import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, ctx: Ctx) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const { id } = await ctx.params;
  const sb = getSupabaseAdmin();
  const { data: lead } = await sb.from("leads").select("id, partner_id").eq("id", id).maybeSingle();
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (session.user.role === "partner" && lead.partner_id !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const text = String(body.body || "").trim();
  if (!text) return NextResponse.json({ error: "Activity body required" }, { status: 400 });

  const activity_type = body.activity_type || "note";
  const { data, error } = await sb
    .from("lead_activities")
    .insert({
      lead_id: id,
      partner_id: session.user.role === "partner" ? session.user.id : lead.partner_id,
      activity_type,
      body: text,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await sb.from("leads").update({ updated_at: new Date().toISOString() }).eq("id", id);

  return NextResponse.json({ activity: data });
}
