import { createClient } from "@/lib/services/clients";
import { createCompliance } from "@/lib/services/compliance";
import { createInvoice } from "@/lib/services/invoices";
import { createNote } from "@/lib/services/notes";
import { createPayment } from "@/lib/services/payments";
import { createTask } from "@/lib/services/tasks";
import type { WorkspaceExport } from "@/lib/types";

export async function importWorkspace(
  workspaceId: string,
  data: WorkspaceExport,
  actor: { uid: string; email?: string }
) {
  for (const c of data.clients) {
    await createClient(
      workspaceId,
      {
        ...c,
        reminderFrequency: c.reminderFrequency ?? "none",
      },
      actor
    );
  }
  if (data.compliance) {
    for (const r of data.compliance) await createCompliance(workspaceId, r, actor);
  }
  if (data.invoices) {
    for (const i of data.invoices) await createInvoice(workspaceId, i, actor);
  }
  for (const t of data.tasks) await createTask(workspaceId, t);
  for (const n of data.notes) await createNote(workspaceId, n);
  for (const p of data.payments) await createPayment(workspaceId, p);
}
