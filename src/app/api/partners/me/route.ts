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
