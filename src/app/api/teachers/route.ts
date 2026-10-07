import { NextResponse } from "next/server";
import { erpUnavailable, getSchoolId, getSupabaseAdmin, newId } from "@/lib/erp";

export async function GET(request: Request) {
  const blocked = erpUnavailable();
  if (blocked) return blocked;
  const schoolId = getSchoolId(request.url);
  if (!schoolId) return NextResponse.json({ message: "schoolId required" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("erp_teachers")
    .select("*")
    .eq("school_id", schoolId)
    .order("name");

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(
    (data || []).map((t) => ({
      id: t.id,
      _id: t.id,
      name: t.name,
      subject: t.subject,
      schoolId: t.school_id,
    }))
  );
}

export async function POST(request: Request) {
  const blocked = erpUnavailable();
  if (blocked) return blocked;
  const body = await request.json();
  if (!body.schoolId || !body.name) {
    return NextResponse.json({ message: "schoolId and name required" }, { status: 400 });
  }
  const id = body.id || newId("tch");
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("erp_teachers")
    .insert({
      id,
      school_id: body.schoolId,
      name: body.name,
      subject: body.subject || "",
    })
    .select()
    .single();
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id, _id: data.id, name: data.name, subject: data.subject }, { status: 201 });
}
