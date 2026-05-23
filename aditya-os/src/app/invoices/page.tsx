"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { MessageCircle, FileDown, Pencil, Trash2 } from "lucide-react";
import AppShell from "@/components/AppShell";
import AnimatedPage from "@/components/AnimatedPage";
import PageLoader from "@/components/ui/PageLoader";
import PageHeader from "@/components/ui/PageHeader";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import EmptyState from "@/components/ui/EmptyState";
import RoleGuard from "@/components/auth/RoleGuard";
import { useWorkspace } from "@/hooks/useWorkspace";
import {
  createInvoice,
  updateInvoice,
  deleteInvoice,
  calcInvoiceTotals,
  nextInvoiceNumber,
  invoiceWhatsAppUrl,
} from "@/lib/services/invoices";
import { downloadInvoicePdf } from "@/lib/invoice-pdf";
import { formatCurrency } from "@/lib/services/clients";
import type { Invoice, PaymentStatus } from "@/lib/types";
import { BRAND } from "@/lib/branding";
import { formatDateInput } from "@/lib/utils";

export default function InvoicesPage() {
  const { workspaceId, actor, clients, invoices, loading } = useWorkspace();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [clientId, setClientId] = useState("");
  const [desc, setDesc] = useState("Professional fees");
  const [qty, setQty] = useState(1);
  const [rate, setRate] = useState(0);
  const [taxRate, setTaxRate] = useState(18);
  const [dueDate, setDueDate] = useState(formatDateInput());
  const [status, setStatus] = useState<PaymentStatus>("pending");

  const save = async () => {
    if (!workspaceId || !clientId) return;
    const client = clients.find((c) => c.id === clientId);
    if (!client) return;
    setSaving(true);
    try {
      const items = [{ description: desc, quantity: qty, rate, amount: qty * rate }];
      const { subtotal, taxAmount, total } = calcInvoiceTotals(items, taxRate);
      await createInvoice(
        workspaceId,
        {
          invoiceNumber: nextInvoiceNumber(invoices),
          clientId,
          clientName: client.name,
          clientPhone: client.phone,
          clientEmail: client.email,
          clientGstin: client.gstin,
          items,
          subtotal,
          taxRate,
          taxAmount,
          total,
          status,
          issueDate: formatDateInput(),
          dueDate,
          remindersEnabled: status !== "paid",
        },
        actor
      );
      toast.success("Invoice created");
      setOpen(false);
    } catch {
      toast.error("Failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AppShell>
        <PageLoader />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <AnimatedPage>
        <RoleGuard allowed={["admin", "accountant"]}>
          <PageHeader
            badge={BRAND.appName}
            title="Invoices"
            subtitle="Generate invoices, PDF export & WhatsApp reminders"
            actions={<Button onClick={() => setOpen(true)}>New invoice</Button>}
          />
          {invoices.length === 0 ? (
            <EmptyState title="No invoices" description="Create your first invoice." />
          ) : (
            <div className="space-y-3">
              {invoices.map((inv) => (
                <InvoiceRow
                  key={inv.id}
                  inv={inv}
                  workspaceId={workspaceId!}
                  actor={actor}
                />
              ))}
            </div>
          )}
          <Modal open={open} title="New invoice" onClose={() => setOpen(false)}>
            <div className="space-y-4">
              <Select label="Client" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                <option value="">Select</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
              <Input label="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Qty" type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
                <Input label="Rate" type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
              </div>
              <Input label="GST %" type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} />
              <Input label="Due date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              <Button onClick={save} disabled={saving} className="w-full">
                Create
              </Button>
            </div>
          </Modal>
        </RoleGuard>
      </AnimatedPage>
    </AppShell>
  );
}

function InvoiceRow({
  inv,
  workspaceId,
  actor,
}: {
  inv: Invoice;
  workspaceId: string;
  actor: { uid: string; email?: string };
}) {
  return (
    <div className="glass-card flex flex-col gap-4 rounded-2xl p-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="font-bold">{inv.invoiceNumber}</p>
        <p className="text-sm text-zinc-500">
          {inv.clientName} · Due {inv.dueDate}
        </p>
        <p className="mt-1 text-lg font-bold text-emerald-400">
          {formatCurrency(inv.total)}
        </p>
        <p className="text-xs capitalize text-zinc-600">
          {inv.status}
          {!inv.remindersEnabled && inv.status === "paid" ? " · reminders off" : ""}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => downloadInvoicePdf(inv)}>
          <FileDown className="h-4 w-4" />
          PDF
        </Button>
        {inv.status !== "paid" && inv.remindersEnabled && (
          <a href={invoiceWhatsAppUrl(inv)} target="_blank" rel="noopener noreferrer">
            <Button variant="success">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
          </a>
        )}
        {inv.status !== "paid" && (
          <Button
            variant="secondary"
            onClick={async () => {
              await updateInvoice(workspaceId, inv.id, { status: "paid" }, actor);
              toast.success("Marked paid — reminders stopped");
            }}
          >
            Mark paid
          </Button>
        )}
        <Button
          variant="danger"
          onClick={async () => {
            if (!confirm("Delete invoice?")) return;
            await deleteInvoice(workspaceId, inv.id, actor);
            toast.success("Deleted");
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
