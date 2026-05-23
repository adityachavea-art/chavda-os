"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import AppShell from "@/components/AppShell";
import AnimatedPage from "@/components/AnimatedPage";
import PageLoader from "@/components/ui/PageLoader";
import PageHeader from "@/components/ui/PageHeader";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import EmptyState from "@/components/ui/EmptyState";
import { useWorkspace } from "@/hooks/useWorkspace";
import {
  createCompliance,
  updateCompliance,
  deleteCompliance,
  complianceTypeLabel,
  isOverdue,
} from "@/lib/services/compliance";
import type { ComplianceRecord, ComplianceStatus, ComplianceType } from "@/lib/types";
import { BRAND } from "@/lib/branding";
import { formatDateInput } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";

export default function CompliancePage() {
  const { workspaceId, actor, clients, compliance, loading } = useWorkspace();
  const [filter, setFilter] = useState<ComplianceType | "all">("all");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<ComplianceRecord | undefined>();
  const [saving, setSaving] = useState(false);
  const [clientId, setClientId] = useState("");
  const [type, setType] = useState<ComplianceType>("gst");
  const [period, setPeriod] = useState("");
  const [dueDate, setDueDate] = useState(formatDateInput());
  const [status, setStatus] = useState<ComplianceStatus>("pending");
  const [notes, setNotes] = useState("");

  const filtered = useMemo(() => {
    if (filter === "all") return compliance;
    return compliance.filter((c) => c.type === filter);
  }, [compliance, filter]);

  const reset = () => {
    setEdit(undefined);
    setClientId("");
    setType("gst");
    setPeriod("");
    setDueDate(formatDateInput());
    setStatus("pending");
    setNotes("");
  };

  const openEdit = (r: ComplianceRecord) => {
    setEdit(r);
    setClientId(r.clientId);
    setType(r.type);
    setPeriod(r.period);
    setDueDate(r.dueDate);
    setStatus(r.status);
    setNotes(r.notes ?? "");
    setOpen(true);
  };

  const save = async () => {
    if (!workspaceId || !clientId) return;
    const client = clients.find((c) => c.id === clientId);
    if (!client) return;
    setSaving(true);
    try {
      const payload = {
        clientId,
        clientName: client.name,
        type,
        period,
        dueDate,
        status,
        notes: notes || undefined,
      };
      if (edit) {
        await updateCompliance(workspaceId, edit.id, payload, actor);
        toast.success("Updated");
      } else {
        await createCompliance(workspaceId, payload, actor);
        toast.success("Created");
      }
      setOpen(false);
      reset();
    } catch {
      toast.error("Save failed");
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
          title="Compliance"
          subtitle={`${BRAND.foundedBy} · GST, TDS, ITR, ROC & audit tracking`}
          actions={
            <Button
              onClick={() => {
                reset();
                setOpen(true);
              }}
            >
              Add filing
            </Button>
          }
        />
        <div className="mb-6 flex flex-wrap gap-2">
          {(["all", "gst", "tds", "itr", "roc", "audit"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={`rounded-full px-4 py-2 text-sm capitalize ${
                filter === t
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-zinc-400"
              }`}
            >
              {t === "all" ? "All" : complianceTypeLabel(t as ComplianceType)}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <EmptyState
            title="No compliance records"
            description="Add GST, TDS, ITR, ROC or audit filings."
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((r) => (
              <div
                key={r.id}
                className={`glass-card flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between ${isOverdue(r) ? "border-orange-500/30" : ""}`}
              >
                <div>
                  <p className="font-bold">
                    {complianceTypeLabel(r.type)} · {r.clientName}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {r.period} · Due {r.dueDate} · {r.status}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => openEdit(r)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={async () => {
                      if (!workspaceId || !confirm("Delete?")) return;
                      await deleteCompliance(workspaceId, r.id, actor);
                      toast.success("Deleted");
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        <Modal open={open} title={edit ? "Edit filing" : "New filing"} onClose={() => setOpen(false)}>
          <div className="space-y-4">
            <Select label="Client" value={clientId} onChange={(e) => setClientId(e.target.value)}>
              <option value="">Select client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
            <Select label="Type" value={type} onChange={(e) => setType(e.target.value as ComplianceType)}>
              <option value="gst">GST</option>
              <option value="tds">TDS</option>
              <option value="itr">ITR</option>
              <option value="roc">ROC</option>
              <option value="audit">Audit</option>
            </Select>
            <Input label="Period" value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="Apr 2026" />
            <Input label="Due date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value as ComplianceStatus)}>
              <option value="pending">Pending</option>
              <option value="in_progress">In progress</option>
              <option value="filed">Filed</option>
              <option value="overdue">Overdue</option>
              <option value="completed">Completed</option>
            </Select>
            <Textarea label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
            <Button onClick={save} disabled={saving} className="w-full">
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </Modal>
      </AnimatedPage>
    </AppShell>
  );
}
