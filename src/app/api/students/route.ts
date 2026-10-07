import { NextResponse } from "next/server";
import { erpUnavailable, getSchoolId, getSupabaseAdmin, newId } from "@/lib/erp";

export async function GET(request: Request) {
  const blocked = erpUnavailable();
  if (blocked) return blocked;
  const schoolId = getSchoolId(request.url);
  if (!schoolId) return NextResponse.json({ message: "schoolId required" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("erp_students")
    .select("*")
    .eq("school_id", schoolId)
    .order("roll", { ascending: true });

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  return NextResponse.json(
    (data || []).map((s) => ({
      id: s.id,
      _id: s.id,
      name: s.name,
      klass: s.klass,
      roll: s.roll,
      feesDue: Number(s.fees_due),
      payments: s.payments || [],
      schoolId: s.school_id,
    }))
  );
}

export async function POST(request: Request) {
  const blocked = erpUnavailable();
  if (blocked) return blocked;
  const body = await request.json();
  const schoolId = body.schoolId;
  if (!schoolId || !body.name) {
    return NextResponse.json({ message: "schoolId and name required" }, { status: 400 });
  }

  const id = body.id || newId("stu");
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("erp_students")
    .insert({
      id,
      school_id: schoolId,
      name: body.name,
      klass: body.klass || body.class || "",
      roll: Number(body.roll) || 0,
      fees_due: Number(body.feesDue) || 0,
      payments: body.payments || [],
    })
    .select()
    .single();

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({
    id: data.id,
    _id: data.id,
    name: data.name,
    klass: data.klass,
    roll: data.roll,
    feesDue: Number(data.fees_due),
    payments: data.payments || [],
  }, { status: 201 });
}

export async function DELETE(request: Request) {
  const blocked = erpUnavailable();
  if (blocked) return blocked;
  const body = await request.json().catch(() => ({}));
  const { searchParams } = new URL(request.url);
  const id = body.id || searchParams.get("id");
  if (!id) return NextResponse.json({ message: "id required" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("erp_students").delete().eq("id", id);
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({ message: "deleted", id });
}
