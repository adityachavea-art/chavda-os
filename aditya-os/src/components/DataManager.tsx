"use client";

import { useRef, useState } from "react";
import { Download, Upload, Cloud, Trash2, FileSpreadsheet } from "lucide-react";
import toast from "react-hot-toast";
import { useWorkspace } from "@/hooks/useWorkspace";
import {
  buildWorkspaceExport,
  downloadJson,
  exportClientsCsv,
  parseImportFile,
} from "@/lib/backup";
import {
  deleteCloudBackup,
  listCloudBackups,
  saveBackupToCloud,
} from "@/lib/services/backup";
import { importWorkspace } from "@/lib/services/import";
import type { WorkspaceBackup } from "@/lib/types";
import Button from "@/components/ui/Button";
import RoleGuard from "@/components/auth/RoleGuard";
import { BRAND } from "@/lib/branding";

export default function DataManager() {
  const {
    workspaceId,
    actor,
    clients,
    compliance,
    invoices,
    tasks,
    notes,
    payments,
  } = useWorkspace();
  const fileRef = useRef<HTMLInputElement>(null);
  const [backups, setBackups] = useState<WorkspaceBackup[]>([]);
  const [busy, setBusy] = useState(false);

  const exportData = () =>
    buildWorkspaceExport({
      clients,
      compliance,
      invoices,
      tasks,
      notes,
      payments,
    });

  const refreshBackups = async () => {
    if (!workspaceId) return;
    setBackups(await listCloudBackups(workspaceId));
  };

  if (!workspaceId) return null;

  return (
    <RoleGuard allowed={["admin"]}>
      <div className="glass-card rounded-3xl p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
          {BRAND.appName}
        </p>
        <h2 className="mt-2 text-xl font-bold">Backup & export</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            variant="secondary"
            disabled={busy}
            onClick={() => {
              downloadJson(
                exportData(),
                `chavda-os-backup-${new Date().toISOString().slice(0, 10)}.json`
              );
              toast.success("JSON exported");
            }}
          >
            <Download className="h-4 w-4" />
            JSON
          </Button>
          <Button
            variant="secondary"
            disabled={busy}
            onClick={() => {
              exportClientsCsv(clients);
              toast.success("CSV exported");
            }}
          >
            <FileSpreadsheet className="h-4 w-4" />
            Excel (CSV)
          </Button>
          <Button
            variant="secondary"
            disabled={busy}
            onClick={() => fileRef.current?.click()}
          >
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                await saveBackupToCloud(
                  workspaceId,
                  `Backup ${new Date().toLocaleString("en-IN")}`,
                  exportData()
                );
                await refreshBackups();
                toast.success("Cloud backup saved");
              } catch {
                toast.error("Backup failed");
              } finally {
                setBusy(false);
              }
            }}
          >
            <Cloud className="h-4 w-4" />
            Cloud backup
          </Button>
          <Button variant="ghost" onClick={() => void refreshBackups()}>
            Load backups
          </Button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            setBusy(true);
            try {
              const data = await parseImportFile(f);
              await importWorkspace(workspaceId, data, actor);
              toast.success("Import complete");
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "Import failed");
            } finally {
              setBusy(false);
              e.target.value = "";
            }
          }}
        />
        {backups.length > 0 && (
          <ul className="mt-6 space-y-2">
            {backups.map((b) => (
              <li
                key={b.id}
                className="flex items-center justify-between rounded-xl border border-white/5 px-4 py-3 text-sm"
              >
                <span>{b.label}</span>
                <button
                  type="button"
                  className="text-zinc-500 hover:text-red-400"
                  onClick={async () => {
                    if (!confirm("Delete backup?")) return;
                    await deleteCloudBackup(workspaceId, b.id);
                    await refreshBackups();
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </RoleGuard>
  );
}
