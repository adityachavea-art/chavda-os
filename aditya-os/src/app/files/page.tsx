"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Upload, Trash2, ExternalLink } from "lucide-react";
import AppShell from "@/components/AppShell";
import AnimatedPage from "@/components/AnimatedPage";
import PageLoader from "@/components/ui/PageLoader";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import EmptyState from "@/components/ui/EmptyState";
import { useWorkspace } from "@/hooks/useWorkspace";
import { uploadDocument, deleteDocument } from "@/lib/services/documents";
import { BRAND } from "@/lib/branding";

export default function FilesPage() {
  const { workspaceId, actor, user, clients, documents, loading } = useWorkspace();
  const [clientFilter, setClientFilter] = useState("all");
  const [uploading, setUploading] = useState(false);

  const filtered = useMemo(() => {
    if (clientFilter === "all") return documents;
    return documents.filter((d) => d.clientId === clientFilter);
  }, [documents, clientFilter]);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !workspaceId || clientFilter === "all") {
      toast.error("Select a client first");
      return;
    }
    const client = clients.find((c) => c.id === clientFilter);
    if (!client) return;
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
      toast.success("Uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
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
          title="Documents"
          subtitle="Client-wise file storage with Firebase"
        />
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end">
          <Select
            label="Client folder"
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="flex-1"
          >
            <option value="all">All clients</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
          <label
            className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#111318] px-5 py-3 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.06] ${uploading || clientFilter === "all" ? "pointer-events-none opacity-50" : ""}`}
          >
            <input type="file" className="hidden" onChange={onUpload} disabled={uploading} />
            <Upload className="h-4 w-4" />
            {uploading ? "Uploading..." : "Upload"}
          </label>
        </div>
        {filtered.length === 0 ? (
          <EmptyState title="No documents" description="Upload files for a client." />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((doc) => (
              <div key={doc.id} className="glass-card rounded-2xl p-4">
                <p className="truncate font-medium">{doc.name}</p>
                <p className="text-xs text-zinc-500">{doc.clientName}</p>
                <p className="mt-1 text-xs text-zinc-600">
                  {(doc.size / 1024).toFixed(1)} KB
                </p>
                <div className="mt-4 flex gap-2">
                  {doc.downloadUrl && (
                    <a href={doc.downloadUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="secondary" className="py-2">
                        <ExternalLink className="h-4 w-4" />
                        {doc.mimeType.includes("pdf") ? "Preview" : "Open"}
                      </Button>
                    </a>
                  )}
                  <Button
                    variant="danger"
                    className="py-2"
                    onClick={async () => {
                      if (!workspaceId || !confirm("Delete file?")) return;
                      await deleteDocument(workspaceId, doc, actor);
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
      </AnimatedPage>
    </AppShell>
  );
}
