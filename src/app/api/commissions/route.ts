import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { writeAuditLog } from "@/lib/audit";
import { notifyUser } from "@/lib/notifications";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const sb = getSupabaseAdmin();
  let q = sb
    .from("commissions")
    .select("*, partners(full_name, email, mpesa_number), deals(customer_name, invoice_amount)")
    .order("created_at", { ascending: false });

  if (session.user.role === "partner") q = q.eq("partner_id", session.user.id);
  else if (session.user.role !== "admin")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ commissions: data || [] });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Admin only" }, { status: 401 });
  }
  const body = await req.json();
  const id = body.id;
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (body.status) updates.status = body.status;
  if (body.payment_ref) updates.payment_ref = body.payment_ref;
  if (body.status === "PAID") updates.paid_at = new Date().toISOString();

  const sb = getSupabaseAdmin();
  const { data, error } = await sb.from("commissions").update(updates).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await writeAuditLog({
    actor_id: session.user.id,
    actor_role: session.user.role,
    action: `commission.${body.status || "update"}`,
    entity_type: "commission",
    entity_id: id,
    meta: { status: body.status, payment_ref: body.payment_ref },
  });
  if (body.status === "PAID" && data.partner_id) {
    await notifyUser({
      user_key: data.partner_id,
      title: "Commission paid",
      body: `KES ${Number(data.commission_amount).toLocaleString()} marked paid.`,
      link: "/partners/commissions",
    });
  }

  return NextResponse.json({ commission: data });
}
