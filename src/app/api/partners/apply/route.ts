import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { hashPassword } from "@/lib/partners";
import { notifyUser } from "@/lib/notifications";
import { writeAuditLog } from "@/lib/audit";

export async function POST(req: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Supabase not configured. Run partners-crm.sql after setting env keys." },
        { status: 503 }
      );
    }
    const body = await req.json();
    const full_name = String(body.full_name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const password = String(body.password || "");
    const specialty = String(body.specialty || "hardware");
    const county = String(body.county || "").trim() || null;
    const occupation = String(body.occupation || "").trim() || null;
    const experience = String(body.experience || "").trim() || null;
    const target_market = String(body.target_market || "").trim() || null;
    const network_notes = String(body.network_notes || "").trim() || null;
    const mpesa_number = String(body.mpesa_number || "").trim() || null;
    const roleRaw = String(body.role || "SALES_PARTNER").trim().toUpperCase();
    const role = ["SALES_PARTNER", "MARKETING_PARTNER", "TECHNICIAN"].includes(roleRaw)
      ? roleRaw
      : "SALES_PARTNER";

    if (!full_name || !email || !phone) {
      return NextResponse.json({ error: "Name, email and phone are required." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }
    if (!["hardware", "software", "services", "mixed"].includes(specialty)) {
      return NextResponse.json({ error: "Invalid specialty." }, { status: 400 });
    }

    const sb = getSupabaseAdmin();
    const password_hash = await hashPassword(password);

    const { data, error } = await sb
      .from("partners")
      .insert({
        full_name,
        email,
        phone,
        county,
        occupation,
        experience,
        specialty,
        target_market,
        network_notes,
        mpesa_number,
        password_hash,
        status: "APPLIED",
        role,
      })
      .select("id, full_name, email, status, specialty, created_at")
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "An application with this email already exists." }, { status: 409 });
      }
      console.error("[partners/apply]", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await notifyUser({
      user_key: "admin",
      title: "New partner application",
      body: `${data.full_name} (${data.email}) — ${data.specialty}`,
      link: "/admin/partners",
    });
    await writeAuditLog({
      action: "partner.apply",
      entity_type: "partner",
      entity_id: data.id,
      meta: { email: data.email },
    });

    return NextResponse.json({
      ok: true,
      message:
        "Application received. GetAxe will review and contact you. You can sign in after approval.",
      partner: data,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
