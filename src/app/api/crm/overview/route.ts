import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Admin only" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const sb = getSupabaseAdmin();

  const [
    partners,
    leads,
    quotes,
    deals,
    commissions,
    tickets,
    jobs,
    subs,
  ] = await Promise.all([
    sb.from("partners").select("id, status"),
    sb.from("leads").select("id, stage, expected_value, created_at"),
    sb.from("quote_requests").select("id, status"),
    sb.from("deals").select("id, payment_status, invoice_amount"),
    sb.from("commissions").select("id, status, commission_amount"),
    sb.from("support_tickets").select("id, status"),
    sb.from("technical_jobs").select("id, status"),
    sb.from("subscriptions").select("id, status, monthly_amount"),
  ]);

  const err =
    partners.error ||
    leads.error ||
    quotes.error ||
    deals.error ||
    commissions.error ||
    tickets.error ||
    jobs.error ||
    subs.error;
  // Don't fail hard if a table missing — return partial
  const p = partners.data || [];
  const l = leads.data || [];
  const q = quotes.data || [];
  const d = deals.data || [];
  const c = commissions.data || [];
  const t = tickets.data || [];
  const j = jobs.data || [];
  const s = subs.data || [];

  const pipelineValue = l
    .filter((x) => !["LOST", "WON", "PAYMENT", "DELIVERY"].includes(x.stage))
    .reduce((sum, x) => sum + Number(x.expected_value || 0), 0);

  const paidRevenue = d
    .filter((x) => x.payment_status === "PAID")
    .reduce((sum, x) => sum + Number(x.invoice_amount || 0), 0);

  const commissionsDue = c
    .filter((x) => ["ELIGIBLE", "APPROVED"].includes(x.status))
    .reduce((sum, x) => sum + Number(x.commission_amount || 0), 0);

  const mrr = s
    .filter((x) => x.status === "ACTIVE")
    .reduce((sum, x) => sum + Number(x.monthly_amount || 0), 0);

  return NextResponse.json({
    error: err?.message || null,
    stats: {
      partners_total: p.length,
      partners_active: p.filter((x) => ["ACTIVE", "CERTIFIED"].includes(x.status)).length,
      partners_applied: p.filter((x) => x.status === "APPLIED").length,
      leads_total: l.length,
      leads_open: l.filter((x) => !["LOST", "WON", "PAYMENT", "DELIVERY"].includes(x.stage)).length,
      pipeline_value: pipelineValue,
      quotes_pending: q.filter((x) => x.status === "PENDING").length,
      deals_unpaid: d.filter((x) => x.payment_status !== "PAID").length,
      paid_revenue: paidRevenue,
      commissions_due: commissionsDue,
      tickets_open: t.filter((x) => ["OPEN", "IN_PROGRESS"].includes(x.status)).length,
      jobs_open: j.filter((x) => ["OPEN", "ASSIGNED", "IN_PROGRESS"].includes(x.status)).length,
      mrr,
    },
    recent_leads: l.slice(0, 8),
  });
}
