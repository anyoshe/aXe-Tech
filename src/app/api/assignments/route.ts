import { NextResponse } from "next/server";
import { erpUnavailable, getSchoolId, getSupabaseAdmin, newId } from "@/lib/erp";

export async function GET(request: Request) {
  const blocked = erpUnavailable();
  if (blocked) return blocked;
  const schoolId = getSchoolId(request.url);
  if (!schoolId) return NextResponse.json({ message: "schoolId required" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("erp_assignments").select("*").eq("school_id", schoolId);
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(
    (data || []).map((a) => ({
      id: a.id,
      _id: a.id,
      title: a.title,
      klass: a.klass,
      subject: a.subject,
      dueDate: a.due_date,
    }))
  );
}

export async function POST(request: Request) {
  const blocked = erpUnavailable();
  if (blocked) return blocked;
  const body = await request.json();
  if (!body.schoolId || !body.title) {
    return NextResponse.json({ message: "schoolId and title required" }, { status: 400 });
  }
  const id = body.id || newId("asg");
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("erp_assignments")
    .insert({
      id,
      school_id: body.schoolId,
      title: body.title,
      klass: body.klass || body.class || "",
      subject: body.subject || "",
      due_date: body.dueDate || null,
    })
    .select()
    .single();
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({
    id: data.id,
    title: data.title,
    klass: data.klass,
    subject: data.subject,
    dueDate: data.due_date,
  }, { status: 201 });
}
