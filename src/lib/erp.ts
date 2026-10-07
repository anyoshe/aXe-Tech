import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { NextResponse } from "next/server";

export function erpUnavailable() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        message:
          "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and keys.",
      },
      { status: 503 }
    );
  }
  return null;
}

export function newId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function getSchoolId(url: string, body?: { schoolId?: string }) {
  const { searchParams } = new URL(url);
  return searchParams.get("schoolId") || body?.schoolId || "";
}

export { getSupabaseAdmin, isSupabaseConfigured };
