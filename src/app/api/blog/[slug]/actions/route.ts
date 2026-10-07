import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "Blog actions unavailable — MongoDB removed" },
    { status: 503 }
  );
}
