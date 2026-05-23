"use client";

import { useEffect, useState } from "react";
import type {
  Client,
  ClientStatus,
  PaymentStatus,
  ReminderFrequency,
  WhatsAppTemplateId,
} from "@/lib/types";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { formatDateInput } from "@/lib/utils";
import { WHATSAPP_TEMPLATES } from "@/lib/whatsapp-templates";

export type ClientFormValues = {
  name: string;
  phone: string;
  email: string;
  gstin: string;
  pan: string;
  address: string;
  work: string;
  dueDate: string;
  amount: number;
  paymentStatus: PaymentStatus;
  status: ClientStatus;
  notes: string;
  reminderFrequency: ReminderFrequency;
  whatsappTemplateId: WhatsAppTemplateId;
};

const empty: ClientFormValues = {
  name: "",
  phone: "",
  email: "",
  gstin: "",
  pan: "",
  address: "",
  work: "",
  dueDate: formatDateInput(),
  amount: 0,
  paymentStatus: "pending",
  status: "active",
  notes: "",
  reminderFrequency: "none",
  whatsappTemplateId: "custom",
};

export default function ClientForm({
  initial,
  onSubmit,
  onCancel,
  loading,
}: {
  initial?: Client;
  onSubmit: (values: ClientFormValues) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}) {
  const [values, setValues] = useState<ClientFormValues>(empty);

  useEffect(() => {
    if (initial) {
      setValues({
        name: initial.name,
        phone: initial.phone,
        email: initial.email ?? "",
        gstin: initial.gstin ?? "",
        pan: initial.pan ?? "",
        address: initial.address ?? "",
        work: initial.work,
        dueDate: initial.dueDate,
        amount: initial.amount,
        paymentStatus: initial.paymentStatus,
        status: initial.status,
        notes: initial.notes ?? "",
        reminderFrequency: initial.reminderFrequency ?? "none",
        whatsappTemplateId: initial.whatsappTemplateId ?? "custom",
      });
    } else {
      setValues(empty);
    }
  }, [initial]);

  const handle = (field: keyof ClientFormValues, value: string | number) => {
    setValues((v) => ({ ...v, [field]: value }));
  };

  return (
    <form
      className="max-h-[70vh] space-y-4 overflow-y-auto pr-1"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(values);
      }}
    >
      <Input label="Client name" required value={values.name} onChange={(e) => handle("name", e.target.value)} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Phone" required placeholder="+91..." value={values.phone} onChange={(e) => handle("phone", e.target.value)} />
        <Input label="Email" type="email" value={values.email} onChange={(e) => handle("email", e.target.value)} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="GSTIN" value={values.gstin} onChange={(e) => handle("gstin", e.target.value)} />
        <Input label="PAN" value={values.pan} onChange={(e) => handle("pan", e.target.value)} />
      </div>
      <Textarea label="Address" value={values.address} onChange={(e) => handle("address", e.target.value)} />
      <Input label="Work / service" required value={values.work} onChange={(e) => handle("work", e.target.value)} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Due date" type="date" required value={values.dueDate} onChange={(e) => handle("dueDate", e.target.value)} />
        <Input label="Amount (₹)" type="number" min={0} required value={values.amount} onChange={(e) => handle("amount", Number(e.target.value))} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Payment" value={values.paymentStatus} onChange={(e) => handle("paymentStatus", e.target.value as PaymentStatus)}>
          <option value="pending">Pending</option>
          <option value="partial">Partial</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </Select>
        <Select label="Status" value={values.status} onChange={(e) => handle("status", e.target.value as ClientStatus)}>
          <option value="active">Active</option>
          <option value="reminder_due">Reminder Due</option>
          <option value="completed">Completed</option>
        </Select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Recurring reminder" value={values.reminderFrequency} onChange={(e) => handle("reminderFrequency", e.target.value as ReminderFrequency)}>
          <option value="none">None</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </Select>
        <Select label="WhatsApp template" value={values.whatsappTemplateId} onChange={(e) => handle("whatsappTemplateId", e.target.value as WhatsAppTemplateId)}>
          {WHATSAPP_TEMPLATES.map((t) => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </Select>
      </div>
      <Textarea label="Notes" value={values.notes} onChange={(e) => handle("notes", e.target.value)} />
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? "Saving..." : initial ? "Update" : "Add client"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
