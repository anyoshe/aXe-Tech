import { NextResponse } from "next/server";
import { erpUnavailable, getSchoolId, getSupabaseAdmin, newId } from "@/lib/erp";

export async function GET(request: Request) {
  const blocked = erpUnavailable();
  if (blocked) return blocked;
  const schoolId = getSchoolId(request.url);
  if (!schoolId) return NextResponse.json({ message: "schoolId required" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("erp_invoices").select("*").eq("school_id", schoolId);
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(
    (data || []).map((inv) => ({
      id: inv.id,
      _id: inv.id,
      studentId: inv.student_id,
      amount: Number(inv.amount),
      paidAmount: Number(inv.paid_amount),
      issuedAt: inv.issued_at,
    }))
  );
}

export async function POST(request: Request) {
  const blocked = erpUnavailable();
  if (blocked) return blocked;
  const body = await request.json();
  if (!body.schoolId || !body.studentId) {
    return NextResponse.json({ message: "schoolId and studentId required" }, { status: 400 });
  }
  const id = body.id || newId("inv");
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("erp_invoices")
    .insert({
      id,
      school_id: body.schoolId,
      student_id: body.studentId,
      amount: Number(body.amount) || 0,
      paid_amount: Number(body.paidAmount) || 0,
      issued_at: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({
    id: data.id,
    studentId: data.student_id,
    amount: Number(data.amount),
    paidAmount: Number(data.paid_amount),
    issuedAt: data.issued_at,
  }, { status: 201 });
}

export async function PUT(request: Request) {
  const blocked = erpUnavailable();
  if (blocked) return blocked;
  const body = await request.json();
  if (!body.id) return NextResponse.json({ message: "id required" }, { status: 400 });
  const updates: Record<string, unknown> = {};
  if (body.updates?.paidAmount != null) updates.paid_amount = body.updates.paidAmount;
  if (body.paidAmount != null) updates.paid_amount = body.paidAmount;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("erp_invoices")
    .update(updates)
    .eq("id", body.id)
    .select()
    .maybeSingle();
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ message: "not found" }, { status: 404 });
  return NextResponse.json({
    id: data.id,
    studentId: data.student_id,
    amount: Number(data.amount),
    paidAmount: Number(data.paid_amount),
    issuedAt: data.issued_at,
  });
}
