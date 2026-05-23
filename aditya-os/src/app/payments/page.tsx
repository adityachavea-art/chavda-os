"use client";

import { useState } from "react";
import {
  Plus,
  ArrowDownRight,
  ArrowUpRight,
  IndianRupee,
  Receipt,
  Wallet,
  Pencil,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import AppShell from "@/components/AppShell";
import AnimatedPage from "@/components/AnimatedPage";
import PageLoader from "@/components/ui/PageLoader";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import EmptyState from "@/components/ui/EmptyState";
import { useWorkspace } from "@/hooks/useWorkspace";
import {
  createPayment,
  updatePayment,
  deletePayment,
} from "@/lib/services/payments";
import { formatCurrency } from "@/lib/services/clients";
import type { Payment, PaymentStatus, PaymentType } from "@/lib/types";
import { formatDateInput, clsx } from "@/lib/utils";
import { BRAND } from "@/lib/branding";

export default function PaymentsPage() {
  const { workspaceId, actor, payments, stats, loading } = useWorkspace();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Payment | undefined>();
  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<PaymentType>("income");
  const [status, setStatus] = useState<PaymentStatus>("pending");
  const [date, setDate] = useState(formatDateInput());
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const pendingCount = payments.filter(
    (p) => p.status !== "paid" && p.type === "income"
  ).length;

  const openNew = () => {
    setEditing(undefined);
    setTitle("");
    setClientName("");
    setAmount(0);
    setType("income");
    setStatus("pending");
    setDate(formatDateInput());
    setNotes("");
    setModalOpen(true);
  };

  const openEdit = (p: Payment) => {
    setEditing(p);
    setTitle(p.title);
    setClientName(p.clientName ?? "");
    setAmount(p.amount);
    setType(p.type);
    setStatus(p.status);
    setDate(p.date);
    setNotes(p.notes ?? "");
    setModalOpen(true);
  };

  const save = async () => {
    if (!workspaceId || !title.trim()) return;
    setSaving(true);
    try {
      const data = {
        title: title.trim(),
        clientName: clientName.trim() || undefined,
        amount: Number(amount),
        type,
        status,
        date,
        notes: notes.trim() || undefined,
      };
      if (editing) {
        await updatePayment(workspaceId, editing.id, data);
        toast.success("Payment updated");
      } else {
        await createPayment(workspaceId, data);
        toast.success("Payment recorded");
      }
      setModalOpen(false);
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p: Payment) => {
    if (!workspaceId || !confirm(`Delete "${p.title}"?`)) return;
    try {
      await deletePayment(workspaceId, p.id);
      toast.success("Deleted");
    } catch {
      toast.error("Failed to delete");
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
      <PageHeader
        badge={BRAND.appName}
        title="Payments"
        subtitle={`${BRAND.foundedBy} · Track income, expenses and invoice status.`}
        actions={
          <Button onClick={openNew}>
            <Plus className="h-4 w-4" />
            Add Payment
          </Button>
        }
      />

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={IndianRupee}
          accent="text-emerald-400"
        />
        <StatCard
          label="Expenses"
          value={formatCurrency(stats.totalExpenses)}
          icon={Wallet}
          accent="text-red-400"
        />
        <StatCard
          label="Pending income"
          value={pendingCount}
          icon={Receipt}
          accent="text-orange-400"
          sub="Unpaid income entries"
        />
        <StatCard
          label="Net cashflow"
          value={formatCurrency(stats.totalRevenue - stats.totalExpenses)}
          icon={Wallet}
          accent="text-blue-400"
        />
      </div>

      {payments.length === 0 ? (
        <EmptyState
          title="No payments yet"
          description="Record client payments and business expenses."
        />
      ) : (
        <div className="space-y-3">
          {payments.map((p) => (
            <div
              key={p.id}
              className="glass-card flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <h3 className="font-semibold">{p.title}</h3>
                {p.clientName && (
                  <p className="text-sm text-zinc-500">{p.clientName}</p>
                )}
                <p className="mt-1 text-xs text-zinc-600">{p.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p
                    className={clsx(
                      "text-lg font-bold",
                      p.type === "income" ? "text-emerald-300" : "text-red-300"
                    )}
                  >
                    {p.type === "income" ? "+" : "-"}
                    {formatCurrency(p.amount)}
                  </p>
                  <p className="text-xs capitalize text-zinc-500">{p.status}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-xl border border-white/10 p-2 text-zinc-400 hover:text-white"
                    onClick={() => openEdit(p)}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-white/10 p-2 text-zinc-400 hover:text-red-400"
                    onClick={() => remove(p)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        title={editing ? "Edit payment" : "Add payment"}
        onClose={() => setModalOpen(false)}
      >
        <div className="space-y-4">
          <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Input label="Client / party" value={clientName} onChange={(e) => setClientName(e.target.value)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Amount (₹)"
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Select label="Type" value={type} onChange={(e) => setType(e.target.value as PaymentType)}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Select>
            <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value as PaymentStatus)}>
              <option value="pending">Pending</option>
              <option value="partial">Partial</option>
              <option value="paid">Paid</option>
            </Select>
          </div>
          <Textarea label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          <div className="flex gap-3">
            <Button onClick={save} disabled={saving} className="flex-1">
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
      </AnimatedPage>
    </AppShell>
  );
}
