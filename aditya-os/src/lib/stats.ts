import { clientsDueForReminder } from "@/lib/reminders";
import { isOverdue } from "@/lib/services/compliance";
import type {
  Client,
  ComplianceRecord,
  DashboardStats,
  DocumentFile,
  Invoice,
  Note,
  Payment,
  Task,
} from "@/lib/types";

export function computeDashboardStats(
  clients: Client[],
  tasks: Task[],
  notes: Note[],
  payments: Payment[],
  compliance: ComplianceRecord[],
  invoices: Invoice[],
  documents: DocumentFile[]
): DashboardStats {
  const now = new Date();
  const weekAhead = new Date(now);
  weekAhead.setDate(weekAhead.getDate() + 7);
  const today = now.toISOString().split("T")[0]!;

  const pendingClients = clients.filter((c) => c.paymentStatus !== "paid");
  const pendingAmount = pendingClients.reduce((sum, c) => sum + c.amount, 0);

  const totalRevenue = payments
    .filter((p) => p.type === "income")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalExpenses = payments
    .filter((p) => p.type === "expense")
    .reduce((sum, p) => sum + p.amount, 0);

  const upcomingDue = clients.filter((c) => {
    if (!c.dueDate) return false;
    const due = new Date(c.dueDate);
    return due >= now && due <= weekAhead;
  }).length;

  const unpaidInvoices = invoices.filter(
    (i) => i.status !== "paid" && i.status !== "partial"
  );

  return {
    totalClients: clients.length,
    activeClients: clients.filter((c) => c.status !== "completed").length,
    pendingPayments: pendingClients.length,
    pendingAmount,
    totalRevenue,
    totalExpenses,
    pendingTasks: tasks.filter((t) => t.status !== "done").length,
    completedTasks: tasks.filter((t) => t.status === "done").length,
    totalTasks: tasks.length,
    notesCount: notes.length,
    upcomingDue,
    recurringReminders: clientsDueForReminder(clients).length,
    overdueCompliance: compliance.filter(isOverdue).length,
    pendingCompliance: compliance.filter(
      (c) => c.status === "pending" || c.status === "in_progress"
    ).length,
    unpaidInvoices: unpaidInvoices.length,
    unpaidInvoiceAmount: unpaidInvoices.reduce((s, i) => s + i.total, 0),
    documentsCount: documents.length,
  };
}
