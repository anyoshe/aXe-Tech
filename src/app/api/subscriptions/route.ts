import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { computeSubCommission } from "@/lib/commissions";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const sb = getSupabaseAdmin();
  let q = sb
    .from("subscriptions")
    .select("*, partners(full_name, email)")
    .order("created_at", { ascending: false });

  if (session.user.role === "partner") q = q.eq("partner_id", session.user.id);
  else if (session.user.role !== "admin")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ subscriptions: data || [] });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Admin only" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const body = await req.json();
  const customer_name = String(body.customer_name || "").trim();
  if (!customer_name) return NextResponse.json({ error: "customer_name required" }, { status: 400 });

  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from("subscriptions")
    .insert({
      partner_id: body.partner_id || null,
      deal_id: body.deal_id || null,
      customer_name,
      product_name: body.product_name || "GetAxe Software",
      monthly_amount: Number(body.monthly_amount || 0),
      status: "ACTIVE",
      start_date: body.start_date || new Date().toISOString().slice(0, 10),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ subscription: data });
}

/** Record a monthly subscription payment + commission */
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Admin only" }, { status: 401 });
  }
  const body = await req.json();
  if (body.action !== "record_payment") {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
  const subscription_id = body.subscription_id;
  if (!subscription_id) return NextResponse.json({ error: "subscription_id required" }, { status: 400 });

  const sb = getSupabaseAdmin();
  const { data: sub } = await sb.from("subscriptions").select("*").eq("id", subscription_id).maybeSingle();
  if (!sub) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const amount = Number(body.amount ?? sub.monthly_amount);
  const period_label = body.period_label || new Date().toISOString().slice(0, 7);

  const { data: pay, error: payErr } = await sb
    .from("subscription_payments")
    .insert({
      subscription_id,
      period_label,
      amount,
      payment_ref: body.payment_ref || null,
    })
    .select()
    .single();
  if (payErr) return NextResponse.json({ error: payErr.message }, { status: 500 });

  let commission = null;
  if (sub.partner_id && sub.status === "ACTIVE") {
    const start = new Date(sub.start_date);
    const monthsActive =
      (new Date().getFullYear() - start.getFullYear()) * 12 +
      (new Date().getMonth() - start.getMonth()) +
      1;
    const calc = computeSubCommission(amount, monthsActive);
    const { data: comm } = await sb
      .from("commissions")
      .insert({
        partner_id: sub.partner_id,
        subscription_id: sub.id,
        basis: "subscription",
        basis_amount: calc.basis,
        commission_pct: calc.pct,
        commission_amount: calc.amount,
        status: "ELIGIBLE",
        eligibility_date: new Date().toISOString(),
        notes: `Sub payment ${period_label}`,
      })
      .select()
      .single();
    commission = comm;
    if (comm) {
      await sb.from("subscription_payments").update({ commission_id: comm.id }).eq("id", pay.id);
    }
  }

  return NextResponse.json({ payment: pay, commission });
}
