"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import toast from "react-hot-toast";
import AppShell from "@/components/AppShell";
import AnimatedPage from "@/components/AnimatedPage";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import Modal from "@/components/ui/Modal";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import ClientCard from "@/components/crm/ClientCard";
import ClientForm, { type ClientFormValues } from "@/components/crm/ClientForm";
import PageLoader from "@/components/ui/PageLoader";
import { useWorkspace } from "@/hooks/useWorkspace";
import {
  createClient,
  updateClient,
  deleteClient,
  formatCurrency,
  filterSortClients,
} from "@/lib/services/clients";
import type { Client, ClientStatus, PaymentStatus } from "@/lib/types";
import { CalendarDays, FileText, IndianRupee } from "lucide-react";
import { BRAND } from "@/lib/branding";

export default function CRMPage() {
  const { workspaceId, actor, clients, stats, loading } = useWorkspace();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ClientStatus | "all">("all");
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | "all">("all");
  const [sortKey, setSortKey] = useState<"name" | "dueDate" | "amount" | "updatedAt">("updatedAt");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Client | undefined>();
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(
    () =>
      filterSortClients(clients, {
        search,
        status: statusFilter,
        payment: paymentFilter,
        sortKey,
        sortDir: "desc",
      }),
    [clients, search, statusFilter, paymentFilter, sortKey]
  );

  const handleSubmit = async (values: ClientFormValues) => {
    if (!workspaceId) return;
    setSaving(true);
    try {
      const payload = {
        ...values,
        email: values.email || undefined,
        gstin: values.gstin || undefined,
        pan: values.pan || undefined,
        address: values.address || undefined,
        notes: values.notes || undefined,
      };
      if (editing) {
        await updateClient(workspaceId, editing.id, payload, actor);
        toast.success("Client updated");
      } else {
        await createClient(workspaceId, payload, actor);
        toast.success("Client added");
      }
      setModalOpen(false);
    } catch {
      toast.error("Failed to save");
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
        <PageHeader
          badge={BRAND.appName}
          title="Clients"
          subtitle={`${BRAND.foundedBy} · Full client registry with GST/PAN`}
          actions={
            <Button
              onClick={() => {
                setEditing(undefined);
                setModalOpen(true);
              }}
            >
              <Plus className="h-5 w-5" />
              Add Client
            </Button>
          }
        />

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Pending" value={formatCurrency(stats.pendingAmount)} icon={IndianRupee} accent="text-emerald-400" />
          <StatCard label="Active" value={stats.activeClients} icon={FileText} accent="text-blue-400" />
          <StatCard label="Due soon" value={stats.upcomingDue} icon={CalendarDays} accent="text-orange-400" />
        </div>

        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex h-12 flex-1 items-center gap-3 rounded-2xl border border-white/[0.06] bg-[#111318] px-4">
            <Search className="h-5 w-5 text-zinc-500" />
            <input
              placeholder="Search name, GSTIN, PAN, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as ClientStatus | "all")}>
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="reminder_due">Reminder due</option>
            <option value="completed">Completed</option>
          </Select>
          <Select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value as PaymentStatus | "all")}>
            <option value="all">All payments</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </Select>
          <Select value={sortKey} onChange={(e) => setSortKey(e.target.value as typeof sortKey)}>
            <option value="updatedAt">Sort: updated</option>
            <option value="name">Sort: name</option>
            <option value="dueDate">Sort: due date</option>
            <option value="amount">Sort: amount</option>
          </Select>
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <EmptyState title="No clients" description="Add your first client to begin." />
          ) : (
            filtered.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onEdit={() => {
                  setEditing(client);
                  setModalOpen(true);
                }}
                onDelete={async () => {
                  if (!workspaceId || !confirm(`Delete ${client.name}?`)) return;
                  await deleteClient(workspaceId, client.id, actor, client.name);
                  toast.success("Deleted");
                }}
              />
            ))
          )}
        </div>

        <Modal open={modalOpen} title={editing ? "Edit client" : "Add client"} onClose={() => setModalOpen(false)}>
          <ClientForm
            initial={editing}
            loading={saving}
            onCancel={() => setModalOpen(false)}
            onSubmit={handleSubmit}
          />
        </Modal>
      </AnimatedPage>
    </AppShell>
  );
}
