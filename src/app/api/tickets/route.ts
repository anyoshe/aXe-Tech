import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const sb = getSupabaseAdmin();
  let q = sb.from("support_tickets").select("*").order("created_at", { ascending: false });

  if (session.user.role === "partner") q = q.eq("partner_id", session.user.id);
  else if (session.user.role !== "admin")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ tickets: data || [] });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const body = await req.json();
  const customer_name = String(body.customer_name || "").trim();
  const subject = String(body.subject || "").trim();
  if (!customer_name || !subject) {
    return NextResponse.json({ error: "customer_name and subject required" }, { status: 400 });
  }

  const partner_id =
    session.user.role === "partner" ? session.user.id : body.partner_id || null;

  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from("support_tickets")
    .insert({
      partner_id,
      customer_name,
      contact_phone: body.contact_phone || null,
      subject,
      description: body.description || null,
      priority: body.priority || "medium",
      category: body.category || "general",
      status: "OPEN",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ticket: data });
}
