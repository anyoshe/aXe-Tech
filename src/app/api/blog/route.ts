import { NextRequest, NextResponse } from "next/server";

/** Blog temporarily offline while migrating off MongoDB to Supabase. */
export async function GET() {
  return NextResponse.json([]);
}

export async function POST(req: NextRequest) {
  return NextResponse.json(
    {
      message:
        "Blog API is migrating to Supabase. MongoDB has been removed from this project.",
    },
    { status: 503 }
  );
}
