// import { NextResponse } from "next/server";
// import clientPromise from '../../../lib/mongodb';
// import { requireAuth } from '../../../lib/auth';
// import { logInfo, logError, logDebug } from '../../../lib/logger';

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const schoolId = url.searchParams.get("schoolId");
//   logInfo('students.GET.enter', { url: req.url, schoolId });
//   try {
//     const auth = await requireAuth(req);
//     if (!auth.ok) {
//       logInfo('students.GET.auth_failed', { url: req.url });
//       return auth.response;
//     }
//     // validate param
//     if (!schoolId) {
//       logInfo('students.GET.missing_schoolId', { url: req.url });
//       return NextResponse.json({ error: "schoolId required" }, { status: 400 });
//     }
//     // only allow requests for the same school (or admin)
//     if (auth.token?.schoolId !== schoolId && auth.token?.role !== 'admin') {
//       logInfo('students.GET.forbidden', { token: { role: auth.token?.role, schoolId: auth.token?.schoolId }, requestedSchoolId: schoolId });
//       return NextResponse.json({ error: 'forbidden' }, { status: 403 });
//     }

//     const client = await clientPromise;
//     const db = client.db();
//     const students = await db.collection("students").find({ schoolId }).toArray();
//     logDebug('students.GET.fetched', { count: students.length, schoolId });
//     return NextResponse.json(students);
//   } catch (err: any) {
//     const errorId = `${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`;
//     logError('students.GET.error', { errorId, message: err?.message ?? String(err), stack: err?.stack });
//     return NextResponse.json({ error: 'internal_error', errorId }, { status: 500 });
//   }
// }

// export async function POST(req: Request) {
//   logInfo('students.POST.enter', { url: req.url });
//   try {
//     const auth = await requireAuth(req, { allowRoles: ['admin'] });
//     if (!auth.ok) {
//       logInfo('students.POST.auth_failed', { url: req.url });
//       return auth.response;
//     }
//     const body = await req.json();
//     const { schoolId, name, klass, roll } = body;
//     if (!schoolId || !name) {
//       logInfo('students.POST.invalid_payload', { payload: body });
//       return NextResponse.json({ error: "schoolId and name required" }, { status: 400 });
//     }

//     const client = await clientPromise;
//     const db = client.db();
//     const newId = `${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`;
//     const res = await db.collection("students").insertOne({ _id: newId, schoolId, name, klass: klass || "Form 1", roll: roll ?? null, feesDue: 20000, payments: [], createdAt: new Date() });
//     const doc = await db.collection("students").findOne({ _id: res.insertedId });
//     logInfo('students.POST.created', { id: newId, schoolId });
//     return NextResponse.json(doc);
//   } catch (err: any) {
//     const errorId = `${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`;
//     logError('students.POST.error', { errorId, message: err?.message ?? String(err), stack: err?.stack });
//     return NextResponse.json({ error: 'internal_error', errorId }, { status: 500 });
//   }
// }

// export async function PUT(req: Request) {
//   logInfo('students.PUT.enter', { url: req.url });
//   try {
//     const auth = await requireAuth(req, { allowRoles: ['admin'] });
//     if (!auth.ok) {
//       logInfo('students.PUT.auth_failed', { url: req.url });
//       return auth.response;
//     }
//     const body = await req.json();
//     const { id, updates } = body;
//     if (!id || !updates) return NextResponse.json({ error: 'id and updates required' }, { status: 400 });
//     const client = await clientPromise;
//     const db = client.db();
//     await db.collection('students').updateOne({ _id: id }, { $set: updates });
//     const doc = await db.collection('students').findOne({ _id: id });
//     logInfo('students.PUT.updated', { id });
//     return NextResponse.json(doc);
//   } catch (err: any) {
//     const errorId = `${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`;
//     logError('students.PUT.error', { errorId, message: err?.message ?? String(err), stack: err?.stack });
//     return NextResponse.json({ error: 'internal_error', errorId }, { status: 500 });
//   }
// }

// export async function DELETE(req: Request) {
//   logInfo('students.DELETE.enter', { url: req.url });
//   try {
//     const auth = await requireAuth(req, { allowRoles: ['admin'] });
//     if (!auth.ok) {
//       logInfo('students.DELETE.auth_failed', { url: req.url });
//       return auth.response;
//     }
//     const url = new URL(req.url);
//     const id = url.searchParams.get('id');
//     if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
//     const client = await clientPromise;
//     const db = client.db();
//     await db.collection('students').deleteOne({ _id: id });
//     logInfo('students.DELETE.deleted', { id });
//     return NextResponse.json({ ok: true });
//   } catch (err: any) {
//     const errorId = `${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`;
//     logError('students.DELETE.error', { errorId, message: err?.message ?? String(err), stack: err?.stack });
//     return NextResponse.json({ error: 'internal_error', errorId }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { requireAuth } from "../../../lib/auth";
import { logInfo, logError, logDebug } from "../../../lib/logger";
import { ObjectId } from "mongodb";

/* ===================== GET ===================== */

export async function GET(req: Request) {
  const url = new URL(req.url);
  const schoolId = url.searchParams.get("schoolId");

  logInfo("students.GET.enter", { url: req.url, schoolId });

  try {
    const auth = await requireAuth(req);
    if (!auth.ok) {
      logInfo("students.GET.auth_failed", { url: req.url });
      return auth.response;
    }

    if (!schoolId) {
      logInfo("students.GET.missing_schoolId", { url: req.url });
      return NextResponse.json(
        { error: "schoolId required" },
        { status: 400 }
      );
    }

    if (auth.token?.schoolId !== schoolId && auth.token?.role !== "admin") {
      logInfo("students.GET.forbidden", {
        token: {
          role: auth.token?.role,
          schoolId: auth.token?.schoolId,
        },
        requestedSchoolId: schoolId,
      });
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    const client = await clientPromise;
    const db = client.db();

    const students = await db
      .collection("students")
      .find({ schoolId })
      .toArray();

    logDebug("students.GET.fetched", {
      count: students.length,
      schoolId,
    });

    return NextResponse.json(students);
  } catch (err: any) {
    const errorId = `${Date.now().toString(36)}_${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    logError("students.GET.error", {
      errorId,
      message: err?.message ?? String(err),
      stack: err?.stack,
    });

    return NextResponse.json(
      { error: "internal_error", errorId },
      { status: 500 }
    );
  }
}

/* ===================== POST ===================== */

export async function POST(req: Request) {
  logInfo("students.POST.enter", { url: req.url });

  try {
    const auth = await requireAuth(req, { allowRoles: ["admin"] });
    if (!auth.ok) {
      logInfo("students.POST.auth_failed", { url: req.url });
      return auth.response;
    }

    const body = await req.json();
    const { schoolId, name, klass, roll } = body;

    if (!schoolId || !name) {
      logInfo("students.POST.invalid_payload", { payload: body });
      return NextResponse.json(
        { error: "schoolId and name required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Let MongoDB generate ObjectId
    const res = await db.collection("students").insertOne({
      schoolId,
      name,
      klass: klass || "Form 1",
      roll: roll ?? null,
      feesDue: 20000,
      payments: [],
      createdAt: new Date(),
    });

    const doc = await db
      .collection("students")
      .findOne({ _id: res.insertedId });

    logInfo("students.POST.created", {
      id: res.insertedId.toString(),
      schoolId,
    });

    return NextResponse.json(doc);
  } catch (err: any) {
    const errorId = `${Date.now().toString(36)}_${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    logError("students.POST.error", {
      errorId,
      message: err?.message ?? String(err),
      stack: err?.stack,
    });

    return NextResponse.json(
      { error: "internal_error", errorId },
      { status: 500 }
    );
  }
}

/* ===================== PUT ===================== */

export async function PUT(req: Request) {
  logInfo("students.PUT.enter", { url: req.url });

  try {
    const auth = await requireAuth(req, { allowRoles: ["admin"] });
    if (!auth.ok) {
      logInfo("students.PUT.auth_failed", { url: req.url });
      return auth.response;
    }

    const body = await req.json();
    const { id, updates } = body;

    if (!id || !updates) {
      return NextResponse.json(
        { error: "id and updates required" },
        { status: 400 }
      );
    }

    const _id = new ObjectId(id);

    const client = await clientPromise;
    const db = client.db();

    await db
      .collection("students")
      .updateOne({ _id }, { $set: updates });

    const doc = await db.collection("students").findOne({ _id });

    logInfo("students.PUT.updated", { id });

    return NextResponse.json(doc);
  } catch (err: any) {
    const errorId = `${Date.now().toString(36)}_${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    logError("students.PUT.error", {
      errorId,
      message: err?.message ?? String(err),
      stack: err?.stack,
    });

    return NextResponse.json(
      { error: "internal_error", errorId },
      { status: 500 }
    );
  }
}

/* ===================== DELETE ===================== */

export async function DELETE(req: Request) {
  logInfo("students.DELETE.enter", { url: req.url });

  try {
    const auth = await requireAuth(req, { allowRoles: ["admin"] });
    if (!auth.ok) {
      logInfo("students.DELETE.auth_failed", { url: req.url });
      return auth.response;
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "id required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    await db
      .collection("students")
      .deleteOne({ _id: new ObjectId(id) });

    logInfo("students.DELETE.deleted", { id });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    const errorId = `${Date.now().toString(36)}_${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    logError("students.DELETE.error", {
      errorId,
      message: err?.message ?? String(err),
      stack: err?.stack,
    });

    return NextResponse.json(
      { error: "internal_error", errorId },
      { status: 500 }
    );
  }
}
