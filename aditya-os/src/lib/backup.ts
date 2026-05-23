import type {
  Client,
  ComplianceRecord,
  Invoice,
  Note,
  Payment,
  Task,
  WorkspaceExport,
} from "@/lib/types";

export function buildWorkspaceExport(data: {
  clients: Client[];
  compliance: ComplianceRecord[];
  invoices: Invoice[];
  tasks: Task[];
  notes: Note[];
  payments: Payment[];
}): WorkspaceExport {
  const strip = <T extends { id: string }>(items: T[]) =>
    items.map(({ id: _id, ...rest }) => rest);

  return {
    version: 2,
    exportedAt: new Date().toISOString(),
    clients: strip(data.clients) as WorkspaceExport["clients"],
    compliance: strip(data.compliance) as WorkspaceExport["compliance"],
    invoices: strip(data.invoices) as WorkspaceExport["invoices"],
    tasks: strip(data.tasks) as WorkspaceExport["tasks"],
    notes: strip(data.notes) as WorkspaceExport["notes"],
    payments: strip(data.payments) as WorkspaceExport["payments"],
  };
}

export function downloadJson(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportClientsCsv(clients: Client[]) {
  downloadCsv("chavda-os-clients.csv", [
    ["Name", "Phone", "Email", "GSTIN", "PAN", "Work", "Due", "Amount", "Payment", "Status"],
    ...clients.map((c) => [
      c.name,
      c.phone,
      c.email ?? "",
      c.gstin ?? "",
      c.pan ?? "",
      c.work,
      c.dueDate,
      String(c.amount),
      c.paymentStatus,
      c.status,
    ]),
  ]);
}

export function parseImportFile(file: File): Promise<WorkspaceExport> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as WorkspaceExport;
        if (!parsed.version || !Array.isArray(parsed.clients)) {
          reject(new Error("Invalid backup format"));
          return;
        }
        resolve(parsed);
      } catch {
        reject(new Error("Could not parse JSON"));
      }
    };
    reader.onerror = () => reject(new Error("Read failed"));
    reader.readAsText(file);
  });
}
