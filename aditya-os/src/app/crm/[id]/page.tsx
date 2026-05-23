"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2, Upload, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import AppShell from "@/components/AppShell";
import AnimatedPage from "@/components/AnimatedPage";
import PageLoader from "@/components/ui/PageLoader";
import ClientForm, { type ClientFormValues } from "@/components/crm/ClientForm";
import WhatsAppPanel from "@/components/crm/WhatsAppPanel";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useWorkspace } from "@/hooks/useWorkspace";
import {
  updateClient,
  deleteClient,
  formatCurrency,
  paymentStatusLabel,
  clientStatusLabel,
} from "@/lib/services/clients";
import { uploadDocument, deleteDocument } from "@/lib/services/documents";
import { BRAND } from "@/lib/branding";
import type { WhatsAppTemplateId } from "@/lib/types";

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { workspaceId, actor, user, clients, payments, documents, loading } = useWorkspace();
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const client = useMemo(
    () => clients.find((c) => c.id === id),
    [clients, id]
  );

  const relatedPayments = useMemo(
    () =>
      payments.filter(
        (p) =>
          p.clientName?.toLowerCase() === client?.name.toLowerCase()
      ),
    [payments, client]
  );

  const clientDocuments = useMemo(
    () => documents.filter((d) => d.clientId === id),
    [documents, id]
  );

  if (loading) {
    return (
      <AppShell>
        <PageLoader />
      </AppShell>
    );
  }

  if (!client) {
    return (
      <AppShell>
        <div className="glass-card rounded-3xl p-10 text-center">
          <p className="text-lg font-bold">Client not found</p>
          <Link href="/crm" className="mt-4 inline-block text-blue-400">
            Back to CRM
          </Link>
        </div>
      </AppShell>
    );
  }

  const handleUpdate = async (values: ClientFormValues) => {
    if (!workspaceId) return;
    setSaving(true);
    try {
      await updateClient(workspaceId, client.id, {
        ...values,
        email: values.email || undefined,
        gstin: values.gstin || undefined,
        pan: values.pan || undefined,
        address: values.address || undefined,
        notes: values.notes || undefined,
      }, actor);
      toast.success("Client updated");
      setEditOpen(false);
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!workspaceId || !confirm(`Delete ${client.name}?`)) return;
    try {
      await deleteClient(workspaceId, client.id, actor, client.name);
      toast.success("Client deleted");
      router.push("/crm");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleTemplateChange = async (templateId: WhatsAppTemplateId) => {
    if (!workspaceId) return;
    await updateClient(workspaceId, client.id, { whatsappTemplateId: templateId }, actor);
    toast.success("Template saved");
  };

  return (
    <AppShell>
      <AnimatedPage>
        <Link
          href="/crm"
          className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to clients
        </Link>

        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
            {BRAND.appName}
          </p>
          <h1 className="page-title mt-2">{client.name}</h1>
          <p className="page-subtitle">{client.work}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="glass-card grid gap-4 rounded-3xl p-6 sm:grid-cols-2">
              <div>
                <p className="text-xs text-zinc-500">Phone</p>
                <p className="mt-1 font-medium">{client.phone}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Due date</p>
                <p className="mt-1 font-medium">{client.dueDate}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Amount</p>
                <p className="mt-1 text-xl font-bold text-emerald-400">
                  {formatCurrency(client.amount)}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Status</p>
                <p className="mt-1 font-medium">
                  {clientStatusLabel(client.status)} ·{" "}
                  {paymentStatusLabel(client.paymentStatus)}
                </p>
              </div>
              {client.gstin && (
                <div>
                  <p className="text-xs text-zinc-500">GSTIN</p>
                  <p className="mt-1 font-medium">{client.gstin}</p>
                </div>
              )}
              {client.pan && (
                <div>
                  <p className="text-xs text-zinc-500">PAN</p>
                  <p className="mt-1 font-medium">{client.pan}</p>
                </div>
              )}
              {client.email && (
                <div>
                  <p className="text-xs text-zinc-500">Email</p>
                  <p className="mt-1 font-medium">{client.email}</p>
                </div>
              )}
              {client.address && (
                <div className="sm:col-span-2">
                  <p className="text-xs text-zinc-500">Address</p>
                  <p className="mt-1 text-sm text-zinc-300">{client.address}</p>
                </div>
              )}
              {client.notes && (
                <div className="sm:col-span-2">
                  <p className="text-xs text-zinc-500">Notes</p>
                  <p className="mt-1 text-sm text-zinc-300">{client.notes}</p>
                </div>
              )}
            </div>

            <div className="glass-card rounded-3xl p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-bold">Documents</h3>
                <label
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm transition hover:bg-white/10 ${uploading ? "pointer-events-none opacity-50" : ""}`}
                >
                  <input
                    type="file"
                    className="hidden"
                    disabled={uploading || !workspaceId}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file || !workspaceId) return;
                      setUploading(true);
                      try {
                        await uploadDocument(
                          workspaceId,
                          file,
                          {
                            clientId: client.id,
                            clientName: client.name,
                            folder: "documents",
                            uploadedBy: user?.email ?? actor.uid,
                          },
                          actor
                        );
                        toast.success("Document uploaded");
                      } catch {
                        toast.error("Upload failed");
                      } finally {
                        setUploading(false);
                        e.target.value = "";
                      }
                    }}
                  />
                  <Upload className="h-4 w-4" />
                  {uploading ? "Uploading..." : "Upload"}
                </label>
              </div>
              {clientDocuments.length === 0 ? (
                <p className="text-sm text-zinc-500">No documents for this client</p>
              ) : (
                <ul className="space-y-2">
                  {clientDocuments.map((doc) => (
                    <li
                      key={doc.id}
                      className="flex items-center justify-between gap-2 rounded-xl border border-white/5 px-3 py-2"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-zinc-500">
                          {(doc.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        {doc.downloadUrl && (
                          <a
                            href={doc.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        <button
                          type="button"
                          className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"
                          onClick={async () => {
                            if (!workspaceId || !confirm("Delete file?")) return;
                            try {
                              await deleteDocument(workspaceId, doc, actor);
                              toast.success("Deleted");
                            } catch {
                              toast.error("Delete failed");
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {workspaceId && (
              <WhatsAppPanel
                client={client}
                uid={workspaceId}
                onTemplateChange={handleTemplateChange}
              />
            )}
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Button onClick={() => setEditOpen(true)}>Edit client</Button>
              <Button variant="danger" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>

            <div className="glass-card rounded-3xl p-5">
              <h3 className="font-bold">Related payments</h3>
              {relatedPayments.length === 0 ? (
                <p className="mt-3 text-sm text-zinc-500">No linked payments</p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {relatedPayments.map((p) => (
                    <li
                      key={p.id}
                      className="rounded-xl border border-white/5 px-3 py-2 text-sm"
                    >
                      <p className="font-medium">{p.title}</p>
                      <p className="text-zinc-500">
                        {formatCurrency(p.amount)} · {p.date}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <Modal
          open={editOpen}
          title="Edit client"
          onClose={() => setEditOpen(false)}
        >
          <ClientForm
            initial={client}
            loading={saving}
            onCancel={() => setEditOpen(false)}
            onSubmit={handleUpdate}
          />
        </Modal>
      </AnimatedPage>
    </AppShell>
  );
}
