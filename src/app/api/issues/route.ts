import { NextResponse } from "next/server";
import { erpUnavailable, getSchoolId, getSupabaseAdmin, newId } from "@/lib/erp";

export async function GET(request: Request) {
  const blocked = erpUnavailable();
  if (blocked) return blocked;
  const schoolId = getSchoolId(request.url);
  if (!schoolId) return NextResponse.json({ message: "schoolId required" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("erp_issues").select("*").eq("school_id", schoolId);
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(
    (data || []).map((it) => ({
      id: it.id,
      _id: it.id,
      bookId: it.book_id,
      studentId: it.student_id,
      issuedAt: it.issued_at,
      returnedAt: it.returned_at,
    }))
  );
}

export async function POST(request: Request) {
  const blocked = erpUnavailable();
  if (blocked) return blocked;
  const body = await request.json();
  if (!body.schoolId || !body.bookId || !body.studentId) {
    return NextResponse.json({ message: "schoolId, bookId, studentId required" }, { status: 400 });
  }
  const id = body.id || newId("iss");
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("erp_issues")
    .insert({
      id,
      school_id: body.schoolId,
      book_id: body.bookId,
      student_id: body.studentId,
      issued_at: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({
    id: data.id,
    bookId: data.book_id,
    studentId: data.student_id,
    issuedAt: data.issued_at,
    returnedAt: data.returned_at,
  }, { status: 201 });
}

export async function PUT(request: Request) {
  const blocked = erpUnavailable();
  if (blocked) return blocked;
  const body = await request.json();
  if (!body.id) return NextResponse.json({ message: "id required" }, { status: 400 });
  const updates: Record<string, unknown> = {};
  if (body.updates?.returnedAt) updates.returned_at = body.updates.returnedAt;
  if (body.returnedAt) updates.returned_at = body.returnedAt;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("erp_issues")
    .update(updates)
    .eq("id", body.id)
    .select()
    .maybeSingle();
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ message: "not found" }, { status: 404 });
  return NextResponse.json({
    id: data.id,
    bookId: data.book_id,
    studentId: data.student_id,
    issuedAt: data.issued_at,
    returnedAt: data.returned_at,
  });
}
