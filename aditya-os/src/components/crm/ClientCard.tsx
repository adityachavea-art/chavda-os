"use client";

import Link from "next/link";
import {
  Phone,
  CalendarDays,
  MessageCircle,
  Pencil,
  Trash2,
  Bell,
  ChevronRight,
} from "lucide-react";
import type { Client } from "@/lib/types";
import {
  clientStatusLabel,
  formatCurrency,
  paymentStatusLabel,
} from "@/lib/services/clients";
import { buildWhatsAppUrl } from "@/lib/whatsapp-templates";
import { isReminderDueToday } from "@/lib/reminders";
import Button from "@/components/ui/Button";
import { clsx } from "@/lib/utils";

export default function ClientCard({
  client,
  onEdit,
  onDelete,
}: {
  client: Client;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const statusClass =
    client.status === "completed"
      ? "bg-emerald-500/10 text-emerald-400"
      : client.status === "reminder_due"
        ? "bg-orange-500/10 text-orange-400"
        : "bg-blue-500/10 text-blue-400";

  const paymentClass =
    client.paymentStatus === "paid"
      ? "text-emerald-400"
      : client.paymentStatus === "partial"
        ? "text-orange-400"
        : "text-amber-400";

  const dueReminder = isReminderDueToday(client);

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-8">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/crm/${client.id}`}
              className="truncate text-2xl font-black tracking-tight transition hover:text-blue-400 sm:text-3xl"
            >
              {client.name}
            </Link>
            <Link
              href={`/crm/${client.id}`}
              className="rounded-full border border-white/10 p-1.5 text-zinc-500 transition hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
            {dueReminder && (
              <span className="flex items-center gap-1 rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-300">
                <Bell className="h-3 w-3" />
                Reminder due
              </span>
            )}
          </div>
          <p className="mt-2 text-base text-zinc-400 sm:text-lg">{client.work}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              {client.phone}
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 shrink-0" />
              Due: {client.dueDate}
            </span>
            {client.reminderFrequency !== "none" && (
              <span className="text-xs text-zinc-600">
                Recurring: {client.reminderFrequency}
                {client.nextReminderDate && ` · next ${client.nextReminderDate}`}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 sm:items-stretch xl:items-end">
          <div className={clsx("text-2xl font-black sm:text-3xl", paymentClass)}>
            {formatCurrency(client.amount)}
          </div>
          <p className="text-sm text-zinc-500">
            {paymentStatusLabel(client.paymentStatus)}
          </p>
          <span
            className={clsx(
              "inline-flex rounded-full px-4 py-1.5 text-sm font-medium",
              statusClass
            )}
          >
            {clientStatusLabel(client.status)}
          </span>
          <div className="flex w-full flex-col gap-2 sm:flex-row xl:w-auto">
            <a
              href={buildWhatsAppUrl(client)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button variant="success" className="w-full sm:w-auto">
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </Button>
            </a>
            <Button variant="secondary" onClick={onEdit}>
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="danger" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
