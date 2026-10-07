import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Blog post not found (MongoDB removed)" }, { status: 404 });
}

export async function PUT() {
  return NextResponse.json(
    { message: "Blog API migrating to Supabase" },
    { status: 503 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: "Blog API migrating to Supabase" },
    { status: 503 }
  );
}
