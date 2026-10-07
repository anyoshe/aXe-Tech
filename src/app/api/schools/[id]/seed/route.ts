import { NextResponse } from "next/server";
import { erpUnavailable, getSupabaseAdmin, newId } from "@/lib/erp";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(_request: Request, context: Ctx) {
  const blocked = erpUnavailable();
  if (blocked) return blocked;

  const { id: schoolId } = await context.params;
  if (!schoolId) {
    return NextResponse.json({ message: "school id required" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  // Clear existing demo rows for this school
  const tables = [
    "erp_students",
    "erp_teachers",
    "erp_subjects",
    "erp_books",
    "erp_issues",
    "erp_invoices",
    "erp_expenses",
    "erp_assignments",
  ];
  for (const t of tables) {
    await supabase.from(t).delete().eq("school_id", schoolId);
  }

  const students = [
    { id: newId("stu"), school_id: schoolId, name: "James Mwangi", klass: "Form 1", roll: 1, fees_due: 5000, payments: [] },
    { id: newId("stu"), school_id: schoolId, name: "Faith Wambui", klass: "Form 1", roll: 2, fees_due: 2500, payments: [] },
    { id: newId("stu"), school_id: schoolId, name: "Daniel Omondi", klass: "Form 2", roll: 1, fees_due: 0, payments: [] },
    { id: newId("stu"), school_id: schoolId, name: "Grace Achieng", klass: "Form 2", roll: 2, fees_due: 12000, payments: [] },
  ];
  const teachers = [
    { id: newId("tch"), school_id: schoolId, name: "Mr. Kamau", subject: "Mathematics" },
    { id: newId("tch"), school_id: schoolId, name: "Mrs. Chebet", subject: "English" },
    { id: newId("tch"), school_id: schoolId, name: "Ms. Njoroge", subject: "Biology" },
  ];
  const subjects = [
    { id: newId("sub"), school_id: schoolId, name: "Mathematics" },
    { id: newId("sub"), school_id: schoolId, name: "English" },
    { id: newId("sub"), school_id: schoolId, name: "Biology" },
    { id: newId("sub"), school_id: schoolId, name: "Kiswahili" },
  ];
  const books = [
    { id: newId("bk"), school_id: schoolId, title: "Secondary Mathematics Form 1", author: "KLB", qty: 40 },
    { id: newId("bk"), school_id: schoolId, title: "English Grammar", author: "Oxford", qty: 25 },
  ];
  const expenses = [
    { id: newId("exp"), school_id: schoolId, description: "Chalk & stationery", amount: 3500, expense_date: new Date().toISOString().slice(0, 10) },
    { id: newId("exp"), school_id: schoolId, description: "Lab supplies", amount: 8000, expense_date: new Date().toISOString().slice(0, 10) },
  ];
  const assignments = [
    { id: newId("asg"), school_id: schoolId, title: "Algebra worksheet", klass: "Form 1", subject: "Mathematics", due_date: null },
    { id: newId("asg"), school_id: schoolId, title: "Essay: My School", klass: "Form 2", subject: "English", due_date: null },
  ];

  await supabase.from("erp_students").insert(students);
  await supabase.from("erp_teachers").insert(teachers);
  await supabase.from("erp_subjects").insert(subjects);
  await supabase.from("erp_books").insert(books);
  await supabase.from("erp_expenses").insert(expenses);
  await supabase.from("erp_assignments").insert(assignments);

  // Sample invoice for first student
  await supabase.from("erp_invoices").insert({
    id: newId("inv"),
    school_id: schoolId,
    student_id: students[0].id,
    amount: 15000,
    paid_amount: 5000,
    issued_at: new Date().toISOString(),
  });

  return NextResponse.json({
    message: "Seeded demo school data in Supabase",
    schoolId,
    counts: {
      students: students.length,
      teachers: teachers.length,
      subjects: subjects.length,
      books: books.length,
    },
  });
}
