import {
  addDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { wsNotificationsRef } from "@/lib/firestore/refs";
import { mapSubscribeOptions, subscribeQuery } from "@/lib/firestore/subscribe";
import type { AppNotification } from "@/lib/types";
import type { Client, ComplianceRecord, Invoice } from "@/lib/types";
import { isOverdue } from "@/lib/services/compliance";

function normalize(raw: Record<string, unknown>, id: string): AppNotification {
  return {
    id,
    type: raw.type as AppNotification["type"],
    title: String(raw.title ?? ""),
    message: String(raw.message ?? ""),
    read: Boolean(raw.read),
    link: raw.link ? String(raw.link) : undefined,
    createdAt: Number(raw.createdAt ?? Date.now()),
  };
}

export function subscribeNotifications(
  workspaceId: string,
  callback: (items: AppNotification[]) => void,
  options?: { onError?: (code: string) => void; onReady?: () => void }
) {
  const q = query(wsNotificationsRef(workspaceId), orderBy("createdAt", "desc"));
  return subscribeQuery<Record<string, unknown>>(
    q,
    (items) => callback(items.map((r) => normalize(r, String(r.id ?? "")))),
    mapSubscribeOptions(options)
  );
}

export async function createNotification(
  workspaceId: string,
  data: Omit<AppNotification, "id" | "createdAt">
) {
  await addDoc(wsNotificationsRef(workspaceId), {
    ...data,
    createdAt: Date.now(),
  });
}

export async function markNotificationRead(
  workspaceId: string,
  id: string
) {
  await updateDoc(doc(wsNotificationsRef(workspaceId), id), { read: true });
}

export async function markAllNotificationsRead(workspaceId: string, ids: string[]) {
  await Promise.all(ids.map((id) => markNotificationRead(workspaceId, id)));
}

export async function deleteNotification(workspaceId: string, id: string) {
  await deleteDoc(doc(wsNotificationsRef(workspaceId), id));
}

export async function syncSystemNotifications(
  workspaceId: string,
  data: {
    compliance: ComplianceRecord[];
    invoices: Invoice[];
    clients: Client[];
  }
) {
  const today = new Date().toISOString().split("T")[0]!;
  const alerts: Omit<AppNotification, "id" | "createdAt">[] = [];

  for (const c of data.compliance) {
    if (isOverdue(c)) {
      alerts.push({
        type: "overdue",
        title: `Overdue: ${c.type.toUpperCase()}`,
        message: `${c.clientName} · ${c.period} was due ${c.dueDate}`,
        read: false,
        link: "/compliance",
      });
    } else if (c.dueDate <= today && c.status !== "filed" && c.status !== "completed") {
      alerts.push({
        type: "due",
        title: `Due today: ${c.type.toUpperCase()}`,
        message: `${c.clientName} · ${c.period}`,
        read: false,
        link: "/compliance",
      });
    }
  }

  for (const inv of data.invoices) {
    if (
      inv.remindersEnabled &&
      inv.status !== "paid" &&
      inv.dueDate < today
    ) {
      alerts.push({
        type: "payment",
        title: `Unpaid invoice ${inv.invoiceNumber}`,
        message: `${inv.clientName} · ${inv.total}`,
        read: false,
        link: "/invoices",
      });
    }
  }

  if (alerts.length === 0) return;
  const slice = alerts.slice(0, 5);
  for (const a of slice) {
    await createNotification(workspaceId, a);
  }
}
