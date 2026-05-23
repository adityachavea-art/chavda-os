import type { Client, WhatsAppTemplateId } from "@/lib/types";
import { formatCurrency } from "@/lib/services/clients";
import { BRAND } from "@/lib/branding";

export interface WhatsAppTemplate {
  id: WhatsAppTemplateId;
  label: string;
  description: string;
  build: (client: Client) => string;
}

export const WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: "payment_reminder",
    label: "Payment reminder",
    description: "Pending payment follow-up",
    build: (c) =>
      `Hi ${c.name},\n\nThis is a gentle reminder from ${BRAND.appName} regarding *${c.work}*.\n\nAmount: ${formatCurrency(c.amount)}\nStatus: ${c.paymentStatus}\nDue: ${c.dueDate}\n\nPlease let us know once processed.\n\n— ${BRAND.founderName}`,
  },
  {
    id: "due_date_reminder",
    label: "Due date reminder",
    description: "Upcoming deadline",
    build: (c) =>
      `Hi ${c.name},\n\nReminder: *${c.work}* is due on *${c.dueDate}*.\n\nPlease share required documents at your earliest convenience.\n\n— ${BRAND.appName}`,
  },
  {
    id: "follow_up",
    label: "General follow-up",
    description: "Check-in message",
    build: (c) =>
      `Hi ${c.name},\n\nHope you're doing well. Following up on *${c.work}*.\n\nReply when convenient.\n\n— ${BRAND.founderName} · ${BRAND.appName}`,
  },
  {
    id: "gst_itr",
    label: "GST / ITR filing",
    description: "Tax compliance reminder",
    build: (c) =>
      `Hi ${c.name},\n\n*GST/ITR reminder* for ${c.work}.\n\nDue date: ${c.dueDate}\nPending: ${formatCurrency(c.amount)}\n\nPlease confirm documents for filing.\n\n— ${BRAND.appName}`,
  },
  {
    id: "invoice_unpaid",
    label: "Unpaid invoice",
    description: "Invoice payment reminder",
    build: (c) =>
      `Hi ${c.name},\n\nReminder: payment for *${c.work}* is pending.\nAmount: ${formatCurrency(c.amount)}\nDue: ${c.dueDate}\n\nPlease share payment confirmation.\n\n— ${BRAND.appName}`,
  },
  {
    id: "custom",
    label: "Standard reminder",
    description: "Default workspace template",
    build: (c) =>
      `Hi ${c.name}, reminder regarding ${c.work}. Due: ${c.dueDate}. Payment: ${c.paymentStatus}. — ${BRAND.appName}`,
  },
];

export function getTemplate(id: WhatsAppTemplateId = "custom") {
  return WHATSAPP_TEMPLATES.find((t) => t.id === id) ?? WHATSAPP_TEMPLATES[4]!;
}

export function buildWhatsAppUrl(
  client: Client,
  templateId?: WhatsAppTemplateId
): string {
  const phone = client.phone.replace(/\D/g, "");
  const template = getTemplate(templateId ?? client.whatsappTemplateId ?? "custom");
  return `https://wa.me/${phone}?text=${encodeURIComponent(template.build(client))}`;
}

export function computeNextReminderDate(
  frequency: Client["reminderFrequency"],
  fromDate: string = new Date().toISOString().split("T")[0]!
): string | undefined {
  if (frequency === "none") return undefined;
  const d = new Date(fromDate);
  if (frequency === "weekly") d.setDate(d.getDate() + 7);
  if (frequency === "monthly") d.setMonth(d.getMonth() + 1);
  return d.toISOString().split("T")[0];
}
