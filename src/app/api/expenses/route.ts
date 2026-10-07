import { NextResponse } from "next/server";
import { erpUnavailable, getSchoolId, getSupabaseAdmin, newId } from "@/lib/erp";

export async function GET(request: Request) {
  const blocked = erpUnavailable();
  if (blocked) return blocked;
  const schoolId = getSchoolId(request.url);
  if (!schoolId) return NextResponse.json({ message: "schoolId required" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("erp_expenses").select("*").eq("school_id", schoolId);
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(
    (data || []).map((e) => ({
      id: e.id,
      _id: e.id,
      desc: e.description,
      amount: Number(e.amount),
      date: e.expense_date,
    }))
  );
}

export async function POST(request: Request) {
  const blocked = erpUnavailable();
  if (blocked) return blocked;
  const body = await request.json();
  if (!body.schoolId) {
    return NextResponse.json({ message: "schoolId required" }, { status: 400 });
  }
  const id = body.id || newId("exp");
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("erp_expenses")
    .insert({
      id,
      school_id: body.schoolId,
      description: body.desc || body.description || "",
      amount: Number(body.amount) || 0,
      expense_date: body.date || new Date().toISOString().slice(0, 10),
    })
    .select()
    .single();
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({
    id: data.id,
    desc: data.description,
    amount: Number(data.amount),
    date: data.expense_date,
  }, { status: 201 });
}
