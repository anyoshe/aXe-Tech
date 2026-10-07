import { NextResponse } from "next/server";

/** Legacy school-ERP route — MongoDB removed. Migrate to Supabase later. */
export async function GET() {
  return NextResponse.json([]);
}

export async function POST() {
  return NextResponse.json(
    {
      message:
        "This endpoint no longer uses MongoDB. School ERP APIs will be reconnected to Supabase in a later update.",
    },
    { status: 503 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: "Not available — MongoDB removed. Use Supabase migration." },
    { status: 503 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: "Not available — MongoDB removed. Use Supabase migration." },
    { status: 503 }
  );
}
