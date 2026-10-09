import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { computeDealCommission } from "@/lib/commissions";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Admin only" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const { id } = await ctx.params;
  const body = await req.json();
  const sb = getSupabaseAdmin();

  const { data: existing } = await sb.from("deals").select("*").eq("id", id).maybeSingle();
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const k of ["invoice_amount", "cost_amount", "payment_ref", "description", "customer_name", "pillar"] as const) {
    if (body[k] !== undefined) updates[k] = body[k];
  }
  if (body.payment_status) {
    updates.payment_status = body.payment_status;
    if (body.payment_status === "PAID") {
      const ref = body.payment_ref !== undefined
        ? String(body.payment_ref || "").trim()
        : String(existing.payment_ref || "").trim();
      if (!ref) {
        return NextResponse.json(
          { error: "payment_ref is required when marking PAID (M-Pesa/bank reference)." },
          { status: 400 }
        );
      }
      if (body.payment_ref !== undefined) updates.payment_ref = ref;
      updates.paid_at = new Date().toISOString();
    }
  }

  const { data: deal, error } = await sb.from("deals").update(updates).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Create commission when newly marked PAID
  if (
    body.payment_status === "PAID" &&
    existing.payment_status !== "PAID" &&
    deal.partner_id
  ) {
    const calc = computeDealCommission({
      pillar: deal.pillar,
      invoice_amount: Number(deal.invoice_amount),
      cost_amount: Number(deal.cost_amount),
      is_setup: deal.pillar === "run",
    });
    const { data: existingComm } = await sb
      .from("commissions")
      .select("id")
      .eq("deal_id", deal.id)
      .limit(1);
    if (!existingComm?.length) {
      await sb.from("commissions").insert({
        partner_id: deal.partner_id,
        deal_id: deal.id,
        basis: deal.pillar === "run" ? "setup" : "deal",
        basis_amount: calc.basis,
        commission_pct: calc.pct,
        commission_amount: calc.amount,
        status: "ELIGIBLE",
        eligibility_date: new Date().toISOString(),
      });
    }
  }

  return NextResponse.json({ deal });
}
