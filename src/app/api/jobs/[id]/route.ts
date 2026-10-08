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

  const { data: existing } = await sb.from("technical_jobs").select("*").eq("id", id).maybeSingle();
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const isAdmin = session.user.role === "admin";
  const isTech = session.user.role === "partner" && existing.technician_id === session.user.id;
  if (!isAdmin && !isTech) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (isAdmin) {
    for (const k of [
      "title",
      "job_type",
      "technician_id",
      "site_address",
      "county",
      "scheduled_at",
      "notes",
      "status",
    ] as const) {
      if (body[k] !== undefined) updates[k] = body[k];
    }
    if (body.technician_id && !body.status) updates.status = "ASSIGNED";
  }
  if (isTech || isAdmin) {
    if (body.status && ["IN_PROGRESS", "COMPLETED"].includes(body.status)) updates.status = body.status;
    if (body.completion_notes !== undefined) updates.completion_notes = body.completion_notes;
    if (body.serial_numbers !== undefined) updates.serial_numbers = body.serial_numbers;
    if (body.customer_signoff !== undefined) updates.customer_signoff = !!body.customer_signoff;
    if (body.status === "COMPLETED" || body.customer_signoff) {
      updates.completed_at = new Date().toISOString();
      if (body.status !== "CANCELLED") updates.status = "COMPLETED";
    }
  }

  const { data, error } = await sb.from("technical_jobs").update(updates).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ job: data });
}
