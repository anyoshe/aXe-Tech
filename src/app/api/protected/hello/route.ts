import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }
  return NextResponse.json({
    message: "ok",
    user: session.user,
    note: "MongoDB removed; auth is env-based (ADMIN_EMAIL / ADMIN_PASSWORD).",
  });
}
