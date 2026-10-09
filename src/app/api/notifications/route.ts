import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const key = session.user.role === "admin" ? "admin" : session.user.id;
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from("notifications")
    .select("*")
    .eq("user_key", key)
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ notifications: data || [] });
}

export async function PATCH() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const key = session.user.role === "admin" ? "admin" : session.user.id;
  const sb = getSupabaseAdmin();
  await sb
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("user_key", key)
    .is("read_at", null);
  return NextResponse.json({ ok: true });
}
