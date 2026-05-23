import {
  addDoc,
  deleteDoc,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { wsComplianceDocRef, wsComplianceRef } from "@/lib/firestore/refs";
import { mapSubscribeOptions, subscribeQuery } from "@/lib/firestore/subscribe";
import type { ComplianceRecord, ComplianceStatus, ComplianceType } from "@/lib/types";
import { logActivity } from "@/lib/services/activity";

export type ComplianceInput = Omit<ComplianceRecord, "id" | "createdAt" | "updatedAt">;

function normalize(raw: Record<string, unknown>, id: string): ComplianceRecord {
  return {
    id,
    clientId: String(raw.clientId ?? ""),
    clientName: String(raw.clientName ?? ""),
    type: raw.type as ComplianceType,
    period: String(raw.period ?? ""),
    dueDate: String(raw.dueDate ?? ""),
    status: (raw.status as ComplianceStatus) ?? "pending",
    filingDate: raw.filingDate ? String(raw.filingDate) : undefined,
    notes: raw.notes ? String(raw.notes) : undefined,
    createdAt: Number(raw.createdAt ?? Date.now()),
    updatedAt: Number(raw.updatedAt ?? Date.now()),
  };
}

export function subscribeCompliance(
  workspaceId: string,
  callback: (items: ComplianceRecord[]) => void,
  options?: { onError?: (code: string) => void; onReady?: () => void }
) {
  const q = query(wsComplianceRef(workspaceId), orderBy("dueDate", "asc"));
  return subscribeQuery<Record<string, unknown>>(
    q,
    (items) => callback(items.map((r) => normalize(r, String(r.id ?? "")))),
    mapSubscribeOptions(options)
  );
}

export async function createCompliance(
  workspaceId: string,
  data: ComplianceInput,
  actor: { uid: string; email?: string }
) {
  const now = Date.now();
  const ref = await addDoc(wsComplianceRef(workspaceId), {
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  await logActivity(workspaceId, {
    action: "created",
    entityType: "compliance",
    entityId: ref.id,
    entityLabel: `${data.type.toUpperCase()} · ${data.clientName}`,
    userId: actor.uid,
    userEmail: actor.email,
  });
  return ref.id;
}

export async function updateCompliance(
  workspaceId: string,
  id: string,
  data: Partial<ComplianceInput>,
  actor: { uid: string; email?: string }
) {
  await updateDoc(wsComplianceDocRef(workspaceId, id), {
    ...data,
    updatedAt: Date.now(),
  });
  await logActivity(workspaceId, {
    action: "updated",
    entityType: "compliance",
    entityId: id,
    userId: actor.uid,
    userEmail: actor.email,
  });
}

export async function deleteCompliance(
  workspaceId: string,
  id: string,
  actor: { uid: string; email?: string }
) {
  await deleteDoc(wsComplianceDocRef(workspaceId, id));
  await logActivity(workspaceId, {
    action: "deleted",
    entityType: "compliance",
    entityId: id,
    userId: actor.uid,
    userEmail: actor.email,
  });
}

export function complianceTypeLabel(t: ComplianceType) {
  const map: Record<ComplianceType, string> = {
    gst: "GST Return",
    tds: "TDS Return",
    itr: "Income Tax",
    roc: "ROC Compliance",
    audit: "Audit",
  };
  return map[t];
}

export function isOverdue(record: ComplianceRecord) {
  if (record.status === "filed" || record.status === "completed") return false;
  return record.dueDate < new Date().toISOString().split("T")[0]!;
}
