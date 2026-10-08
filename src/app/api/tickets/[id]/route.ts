import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const { id } = await ctx.params;
  const body = await req.json();
  const sb = getSupabaseAdmin();

  const { data: existing } = await sb.from("support_tickets").select("*").eq("id", id).maybeSingle();
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (session.user.role === "partner" && existing.partner_id !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (session.user.role === "admin") {
    for (const k of ["status", "priority", "assigned_to", "resolution_notes", "category"] as const) {
      if (body[k] !== undefined) updates[k] = body[k];
    }
    if (body.status === "RESOLVED" || body.status === "CLOSED") {
      updates.resolved_at = new Date().toISOString();
    }
  } else if (body.description !== undefined) {
    updates.description = body.description;
  }

  const { data, error } = await sb.from("support_tickets").update(updates).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ticket: data });
}
