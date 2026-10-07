import { NextResponse } from "next/server";
import { erpUnavailable, getSchoolId, getSupabaseAdmin, newId } from "@/lib/erp";

export async function GET(request: Request) {
  const blocked = erpUnavailable();
  if (blocked) return blocked;
  const schoolId = getSchoolId(request.url);
  if (!schoolId) return NextResponse.json({ message: "schoolId required" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("erp_subjects").select("*").eq("school_id", schoolId);
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json((data || []).map((s) => ({ id: s.id, _id: s.id, name: s.name })));
}

export async function POST(request: Request) {
  const blocked = erpUnavailable();
  if (blocked) return blocked;
  const body = await request.json();
  if (!body.schoolId || !body.name) {
    return NextResponse.json({ message: "schoolId and name required" }, { status: 400 });
  }
  const id = body.id || newId("sub");
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("erp_subjects")
    .insert({ id, school_id: body.schoolId, name: body.name })
    .select()
    .single();
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id, name: data.name }, { status: 201 });
}
