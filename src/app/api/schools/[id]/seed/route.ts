import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message:
        "School seed no longer uses MongoDB. School ERP will be reconnected to Supabase later.",
    },
    { status: 503 }
  );
}
