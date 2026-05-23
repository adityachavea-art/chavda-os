import {
  addDoc,
  deleteDoc,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { wsInvoiceRef, wsInvoicesRef } from "@/lib/firestore/refs";
import { mapSubscribeOptions, subscribeQuery } from "@/lib/firestore/subscribe";
import type { Invoice, InvoiceLineItem, PaymentStatus } from "@/lib/types";
import { logActivity } from "@/lib/services/activity";
import { buildWhatsAppUrl } from "@/lib/whatsapp-templates";
import type { Client } from "@/lib/types";

export type InvoiceInput = Omit<Invoice, "id" | "createdAt" | "updatedAt">;

export function calcInvoiceTotals(
  items: InvoiceLineItem[],
  taxRate: number
) {
  const subtotal = items.reduce((s, i) => s + i.amount, 0);
  const taxAmount = Math.round(subtotal * (taxRate / 100));
  return { subtotal, taxAmount, total: subtotal + taxAmount };
}

function normalize(raw: Record<string, unknown>, id: string): Invoice {
  return {
    id,
    invoiceNumber: String(raw.invoiceNumber ?? ""),
    clientId: String(raw.clientId ?? ""),
    clientName: String(raw.clientName ?? ""),
    clientPhone: raw.clientPhone ? String(raw.clientPhone) : undefined,
    clientEmail: raw.clientEmail ? String(raw.clientEmail) : undefined,
    clientGstin: raw.clientGstin ? String(raw.clientGstin) : undefined,
    items: (raw.items as InvoiceLineItem[]) ?? [],
    subtotal: Number(raw.subtotal ?? 0),
    taxRate: Number(raw.taxRate ?? 18),
    taxAmount: Number(raw.taxAmount ?? 0),
    total: Number(raw.total ?? 0),
    status: (raw.status as PaymentStatus) ?? "pending",
    issueDate: String(raw.issueDate ?? ""),
    dueDate: String(raw.dueDate ?? ""),
    notes: raw.notes ? String(raw.notes) : undefined,
    remindersEnabled: raw.remindersEnabled !== false,
    lastReminderSentAt: raw.lastReminderSentAt
      ? Number(raw.lastReminderSentAt)
      : undefined,
    paidAt: raw.paidAt ? Number(raw.paidAt) : undefined,
    createdAt: Number(raw.createdAt ?? Date.now()),
    updatedAt: Number(raw.updatedAt ?? Date.now()),
  };
}

export function subscribeInvoices(
  workspaceId: string,
  callback: (items: Invoice[]) => void,
  options?: { onError?: (code: string) => void; onReady?: () => void }
) {
  const q = query(wsInvoicesRef(workspaceId), orderBy("updatedAt", "desc"));
  return subscribeQuery<Record<string, unknown>>(
    q,
    (items) => callback(items.map((r) => normalize(r, String(r.id ?? "")))),
    mapSubscribeOptions(options)
  );
}

export async function createInvoice(
  workspaceId: string,
  data: InvoiceInput,
  actor: { uid: string; email?: string }
) {
  const now = Date.now();
  const ref = await addDoc(wsInvoicesRef(workspaceId), {
    ...data,
    remindersEnabled: data.status !== "paid",
    createdAt: now,
    updatedAt: now,
  });
  await logActivity(workspaceId, {
    action: "created",
    entityType: "invoice",
    entityId: ref.id,
    entityLabel: data.invoiceNumber,
    userId: actor.uid,
    userEmail: actor.email,
  });
  return ref.id;
}

export async function updateInvoice(
  workspaceId: string,
  id: string,
  data: Partial<InvoiceInput>,
  actor: { uid: string; email?: string }
) {
  await updateDoc(wsInvoiceRef(workspaceId, id), {
    ...data,
    ...(data.status === "paid"
      ? { remindersEnabled: false, paidAt: Date.now() }
      : {}),
    updatedAt: Date.now(),
  });
  await logActivity(workspaceId, {
    action: data.status === "paid" ? "paid" : "updated",
    entityType: "invoice",
    entityId: id,
    userId: actor.uid,
    userEmail: actor.email,
  });
}

export async function deleteInvoice(
  workspaceId: string,
  id: string,
  actor: { uid: string; email?: string }
) {
  await deleteDoc(wsInvoiceRef(workspaceId, id));
  await logActivity(workspaceId, {
    action: "deleted",
    entityType: "invoice",
    entityId: id,
    userId: actor.uid,
    userEmail: actor.email,
  });
}

export function invoiceWhatsAppUrl(invoice: Invoice) {
  const client = {
    id: invoice.clientId,
    name: invoice.clientName,
    phone: invoice.clientPhone ?? "",
    work: `Invoice ${invoice.invoiceNumber}`,
    dueDate: invoice.dueDate,
    amount: invoice.total,
    paymentStatus: invoice.status,
    status: "active" as const,
    reminderFrequency: "none" as const,
    createdAt: 0,
    updatedAt: 0,
  } satisfies Client;
  return buildWhatsAppUrl(client, "invoice_unpaid");
}

export function nextInvoiceNumber(invoices: Invoice[]) {
  const year = new Date().getFullYear();
  const prefix = `INV-${year}-`;
  const nums = invoices
    .map((i) => i.invoiceNumber)
    .filter((n) => n.startsWith(prefix))
    .map((n) => parseInt(n.replace(prefix, ""), 10))
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return `${prefix}${String(next).padStart(4, "0")}`;
}
