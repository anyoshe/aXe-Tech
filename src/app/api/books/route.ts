import { NextResponse } from "next/server";
import { erpUnavailable, getSchoolId, getSupabaseAdmin, newId } from "@/lib/erp";

export async function GET(request: Request) {
  const blocked = erpUnavailable();
  if (blocked) return blocked;
  const schoolId = getSchoolId(request.url);
  if (!schoolId) return NextResponse.json({ message: "schoolId required" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("erp_books").select("*").eq("school_id", schoolId);
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(
    (data || []).map((b) => ({
      id: b.id,
      _id: b.id,
      title: b.title,
      author: b.author,
      qty: b.qty,
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
  const id = body.id || newId("bk");
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("erp_books")
    .insert({
      id,
      school_id: body.schoolId,
      title: body.title,
      author: body.author || "",
      qty: Number(body.qty) || 0,
    })
    .select()
    .single();
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id, _id: data.id, title: data.title, author: data.author, qty: data.qty }, { status: 201 });
}
