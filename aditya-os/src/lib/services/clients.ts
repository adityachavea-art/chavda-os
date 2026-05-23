import {
  addDoc,
  deleteDoc,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { wsClientRef, wsClientsRef } from "@/lib/firestore/refs";
import { mapSubscribeOptions, subscribeQuery } from "@/lib/firestore/subscribe";
import type { Client, ClientStatus, PaymentStatus, ReminderFrequency } from "@/lib/types";
import { computeNextReminderDate } from "@/lib/whatsapp-templates";
import { logActivity } from "@/lib/services/activity";

export type ClientInput = Omit<Client, "id" | "createdAt" | "updatedAt">;

function normalize(raw: Record<string, unknown>, id: string): Client {
  return {
    id,
    name: String(raw.name ?? ""),
    phone: String(raw.phone ?? ""),
    email: raw.email ? String(raw.email) : undefined,
    gstin: raw.gstin ? String(raw.gstin) : undefined,
    pan: raw.pan ? String(raw.pan) : undefined,
    address: raw.address ? String(raw.address) : undefined,
    work: String(raw.work ?? ""),
    dueDate: String(raw.dueDate ?? ""),
    amount: Number(raw.amount ?? 0),
    paymentStatus: (raw.paymentStatus as PaymentStatus) ?? "pending",
    status: (raw.status as ClientStatus) ?? "active",
    notes: raw.notes ? String(raw.notes) : undefined,
    reminderFrequency: (raw.reminderFrequency as ReminderFrequency) ?? "none",
    nextReminderDate: raw.nextReminderDate ? String(raw.nextReminderDate) : undefined,
    lastReminderSentAt: raw.lastReminderSentAt ? Number(raw.lastReminderSentAt) : undefined,
    whatsappTemplateId: raw.whatsappTemplateId as Client["whatsappTemplateId"],
    createdAt: Number(raw.createdAt ?? Date.now()),
    updatedAt: Number(raw.updatedAt ?? Date.now()),
  };
}

export function subscribeClients(
  workspaceId: string,
  callback: (clients: Client[]) => void,
  options?: { onError?: (code: string) => void; onReady?: () => void }
) {
  const q = query(wsClientsRef(workspaceId), orderBy("updatedAt", "desc"));
  return subscribeQuery<Record<string, unknown>>(
    q,
    (items) => callback(items.map((raw) => normalize(raw, String(raw.id ?? "")))),
    mapSubscribeOptions(options)
  );
}

export function prepareClientPayload(data: ClientInput): ClientInput {
  return {
    ...data,
    nextReminderDate:
      data.nextReminderDate ??
      computeNextReminderDate(data.reminderFrequency, data.dueDate),
  };
}

export async function createClient(
  workspaceId: string,
  data: ClientInput,
  actor: { uid: string; email?: string }
) {
  const now = Date.now();
  const payload = prepareClientPayload(data);
  const ref = await addDoc(wsClientsRef(workspaceId), {
    ...payload,
    createdAt: now,
    updatedAt: now,
  });
  await logActivity(workspaceId, {
    action: "created",
    entityType: "client",
    entityId: ref.id,
    entityLabel: data.name,
    userId: actor.uid,
    userEmail: actor.email,
  });
  return ref.id;
}

export async function updateClient(
  workspaceId: string,
  id: string,
  data: Partial<ClientInput>,
  actor: { uid: string; email?: string }
) {
  const payload =
    data.reminderFrequency !== undefined
      ? {
          ...data,
          nextReminderDate:
            data.nextReminderDate ??
            computeNextReminderDate(
              data.reminderFrequency,
              data.dueDate ?? new Date().toISOString().split("T")[0]!
            ),
        }
      : data;
  await updateDoc(wsClientRef(workspaceId, id), {
    ...payload,
    updatedAt: Date.now(),
  });
  await logActivity(workspaceId, {
    action: "updated",
    entityType: "client",
    entityId: id,
    entityLabel: data.name,
    userId: actor.uid,
    userEmail: actor.email,
  });
}

export async function deleteClient(
  workspaceId: string,
  id: string,
  actor: { uid: string; email?: string },
  name?: string
) {
  await deleteDoc(wsClientRef(workspaceId, id));
  await logActivity(workspaceId, {
    action: "deleted",
    entityType: "client",
    entityId: id,
    entityLabel: name,
    userId: actor.uid,
    userEmail: actor.email,
  });
}

export async function markReminderSent(
  workspaceId: string,
  client: Client,
  actor: { uid: string; email?: string }
) {
  const next = computeNextReminderDate(
    client.reminderFrequency,
    new Date().toISOString().split("T")[0]!
  );
  await updateClient(
    workspaceId,
    client.id,
    { lastReminderSentAt: Date.now(), nextReminderDate: next },
    actor
  );
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function clientStatusLabel(status: ClientStatus): string {
  const map: Record<ClientStatus, string> = {
    active: "Active",
    completed: "Completed",
    reminder_due: "Reminder Due",
  };
  return map[status];
}

export function paymentStatusLabel(status: PaymentStatus): string {
  const map: Record<PaymentStatus, string> = {
    pending: "Pending",
    paid: "Paid",
    partial: "Partial",
    overdue: "Overdue",
  };
  return map[status];
}

export function filterSortClients(
  clients: Client[],
  opts: {
    search?: string;
    status?: ClientStatus | "all";
    payment?: PaymentStatus | "all";
    sortKey?: "name" | "dueDate" | "amount" | "updatedAt";
    sortDir?: "asc" | "desc";
  }
) {
  let list = [...clients];
  const q = opts.search?.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.gstin?.toLowerCase().includes(q) ||
        c.pan?.toLowerCase().includes(q) ||
        c.work.toLowerCase().includes(q)
    );
  }
  if (opts.status && opts.status !== "all") {
    list = list.filter((c) => c.status === opts.status);
  }
  if (opts.payment && opts.payment !== "all") {
    list = list.filter((c) => c.paymentStatus === opts.payment);
  }
  const key = opts.sortKey ?? "updatedAt";
  const dir = opts.sortDir === "asc" ? 1 : -1;
  list.sort((a, b) => {
    if (key === "name") return a.name.localeCompare(b.name) * dir;
    if (key === "amount") return (a.amount - b.amount) * dir;
    if (key === "dueDate") return a.dueDate.localeCompare(b.dueDate) * dir;
    return (a.updatedAt - b.updatedAt) * dir;
  });
  return list;
}
