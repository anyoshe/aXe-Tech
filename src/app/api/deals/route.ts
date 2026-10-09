import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { computeDealCommission } from "@/lib/commissions";
import { upsertCustomer } from "@/lib/customers";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const sb = getSupabaseAdmin();
  let q = sb
    .from("deals")
    .select("*, partners(full_name, email)")
    .order("created_at", { ascending: false });

  if (session.user.role === "partner") q = q.eq("partner_id", session.user.id);
  else if (session.user.role !== "admin")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ deals: data || [] });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Admin only — deals created after payment control" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const body = await req.json();
  const customer_name = String(body.customer_name || "").trim();
  if (!customer_name) return NextResponse.json({ error: "customer_name required" }, { status: 400 });

  const invoice_amount = Number(body.invoice_amount || 0);
  const cost_amount = Number(body.cost_amount || 0);
  const pillar = body.pillar || "equip";
  const payment_status = body.payment_status || "UNPAID";
  const payment_ref = String(body.payment_ref || "").trim() || null;

  if (payment_status === "PAID" && !payment_ref) {
    return NextResponse.json(
      { error: "payment_ref is required when marking PAID (M-Pesa/bank reference)." },
      { status: 400 }
    );
  }

  const sb = getSupabaseAdmin();
  const customer_id = await upsertCustomer({
    name: customer_name,
    phone: body.contact_phone || null,
    email: body.email || null,
    county: body.county || null,
    partner_id: body.partner_id || null,
  });

  const { data: deal, error } = await sb
    .from("deals")
    .insert({
      lead_id: body.lead_id || null,
      quote_id: body.quote_id || null,
      partner_id: body.partner_id || null,
      customer_id,
      customer_name,
      pillar,
      description: body.description || null,
      invoice_amount,
      cost_amount,
      payment_status,
      payment_ref,
      paid_at: payment_status === "PAID" ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Auto commission when PAID + partner
  if (payment_status === "PAID" && deal.partner_id) {
    const calc = computeDealCommission({
      pillar,
      invoice_amount,
      cost_amount,
      is_setup: pillar === "run",
    });
    await sb.from("commissions").insert({
      partner_id: deal.partner_id,
      deal_id: deal.id,
      basis: pillar === "run" ? "setup" : "deal",
      basis_amount: calc.basis,
      commission_pct: calc.pct,
      commission_amount: calc.amount,
      status: "ELIGIBLE",
      eligibility_date: new Date().toISOString(),
      notes: `Auto from deal ${deal.id}`,
    });
  }

  if (body.lead_id && payment_status === "PAID") {
    await sb.from("leads").update({ stage: "PAYMENT", updated_at: new Date().toISOString() }).eq("id", body.lead_id);
  }

  return NextResponse.json({ deal });
}
