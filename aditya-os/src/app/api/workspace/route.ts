import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { verifyRequestUser } from "@/lib/api/verify-auth";

async function listCollection(workspaceId: string, name: string) {
  const db = getAdminDb();
  if (!db) return [];
  const snap = await db
    .collection("users")
    .doc(workspaceId)
    .collection(name)
    .orderBy("updatedAt", "desc")
    .get()
    .catch(async () => {
      const s = await db
        .collection("users")
        .doc(workspaceId)
        .collection(name)
        .get();
      return s;
    });
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function GET(req: NextRequest) {
  const auth = await verifyRequestUser(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const db = getAdminDb();
  if (!db) {
    return NextResponse.json({ error: "Admin SDK not configured" }, { status: 503 });
  }

  const profile = await db.collection("users").doc(auth.uid).get();
  const workspaceId =
    profile.data()?.workspaceOwnerId || auth.uid;

  const [clients, tasks, notes, payments, compliance, invoices, documents] =
    await Promise.all([
      listCollection(workspaceId, "clients"),
      listCollection(workspaceId, "tasks"),
      listCollection(workspaceId, "notes"),
      listCollection(workspaceId, "payments"),
      listCollection(workspaceId, "compliance"),
      listCollection(workspaceId, "invoices"),
      listCollection(workspaceId, "documents"),
    ]);

  return NextResponse.json({
    clients,
    tasks,
    notes,
    payments,
    compliance,
    invoices,
    documents,
  });
}
