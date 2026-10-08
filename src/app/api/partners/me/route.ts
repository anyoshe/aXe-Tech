import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { findPartnerById } from "@/lib/partners";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role === "admin") {
    return NextResponse.json({
      role: "admin",
      email: session.user.email,
      name: session.user.name,
    });
  }
  if (session.user.role !== "partner") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const partner = await findPartnerById(session.user.id);
  if (!partner) return NextResponse.json({ error: "Partner not found" }, { status: 404 });
  const { password_hash: _, ...safe } = partner;
  return NextResponse.json({ partner: safe });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "partner") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { getSupabaseAdmin } = await import("@/lib/supabase");
  const sb = getSupabaseAdmin();
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };

  if (body.accept_agreement === true) {
    updates.agreement_accepted_at = new Date().toISOString();
  }
  if (body.complete_training === true) {
    updates.training_completed_at = new Date().toISOString();
  }
  if (typeof body.onboarding_quiz_score === "number") {
    updates.onboarding_quiz_score = body.onboarding_quiz_score;
  }
  if (body.generate_referral_code === true) {
    const code =
      "GX" +
      Math.random().toString(36).slice(2, 6).toUpperCase() +
      String(session.user.id).replace(/-/g, "").slice(0, 4).toUpperCase();
    updates.referral_code = code;
  }

  const { data, error } = await sb
    .from("partners")
    .update(updates)
    .eq("id", session.user.id)
    .select(
      "id, full_name, email, status, specialty, agreement_accepted_at, training_completed_at, referral_code, onboarding_quiz_score"
    )
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ partner: data });
}
