export type UserRole = "admin" | "staff" | "accountant";
export type PaymentStatus = "pending" | "paid" | "partial" | "overdue";
export type ClientStatus = "active" | "completed" | "reminder_due";
export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";
export type PaymentType = "income" | "expense";
export type ReminderFrequency = "none" | "weekly" | "monthly";
export type WhatsAppTemplateId =
  | "payment_reminder"
  | "due_date_reminder"
  | "follow_up"
  | "gst_itr"
  | "invoice_unpaid"
  | "custom";

export type ComplianceType = "gst" | "tds" | "itr" | "roc" | "audit";
export type ComplianceStatus =
  | "pending"
  | "in_progress"
  | "filed"
  | "overdue"
  | "completed";

export interface UserProfile {
  email: string | null;
  displayName: string | null;
  role: UserRole;
  workspaceOwnerId?: string;
  theme?: "dark" | "light";
  brandingAppName?: string;
  createdAt: number;
  updatedAt: number;
}

export interface TeamMember {
  id: string;
  email: string;
  role: UserRole;
  displayName?: string;
  status: "active" | "invited";
  createdAt: number;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  gstin?: string;
  pan?: string;
  address?: string;
  work: string;
  dueDate: string;
  amount: number;
  paymentStatus: PaymentStatus;
  status: ClientStatus;
  notes?: string;
  reminderFrequency: ReminderFrequency;
  nextReminderDate?: string;
  lastReminderSentAt?: number;
  whatsappTemplateId?: WhatsAppTemplateId;
  createdAt: number;
  updatedAt: number;
}

export interface ComplianceRecord {
  id: string;
  clientId: string;
  clientName: string;
  type: ComplianceType;
  period: string;
  dueDate: string;
  status: ComplianceStatus;
  filingDate?: string;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  clientPhone?: string;
  clientEmail?: string;
  clientGstin?: string;
  items: InvoiceLineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  status: PaymentStatus;
  issueDate: string;
  dueDate: string;
  notes?: string;
  remindersEnabled: boolean;
  lastReminderSentAt?: number;
  paidAt?: number;
  createdAt: number;
  updatedAt: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  clientId?: string;
  clientName?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  clientId?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Payment {
  id: string;
  title: string;
  clientId?: string;
  clientName?: string;
  invoiceId?: string;
  amount: number;
  type: PaymentType;
  status: PaymentStatus;
  date: string;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface DocumentFile {
  id: string;
  clientId: string;
  clientName: string;
  name: string;
  storagePath: string;
  downloadUrl?: string;
  mimeType: string;
  size: number;
  folder: string;
  uploadedBy: string;
  createdAt: number;
}

export interface ActivityLog {
  id: string;
  action: string;
  entityType: string;
  entityId?: string;
  entityLabel?: string;
  userId: string;
  userEmail?: string;
  meta?: Record<string, string>;
  createdAt: number;
}

export interface AppNotification {
  id: string;
  type: "due" | "overdue" | "payment" | "compliance" | "system";
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: number;
}

export interface WorkspaceBackup {
  id: string;
  label: string;
  data: WorkspaceExport;
  createdAt: number;
}

export interface WorkspaceExport {
  version: 2;
  exportedAt: string;
  clients: Omit<Client, "id">[];
  compliance: Omit<ComplianceRecord, "id">[];
  invoices: Omit<Invoice, "id">[];
  tasks: Omit<Task, "id">[];
  notes: Omit<Note, "id">[];
  payments: Omit<Payment, "id">[];
}

export interface DashboardStats {
  totalClients: number;
  activeClients: number;
  pendingPayments: number;
  pendingAmount: number;
  totalRevenue: number;
  totalExpenses: number;
  pendingTasks: number;
  completedTasks: number;
  totalTasks: number;
  notesCount: number;
  upcomingDue: number;
  recurringReminders: number;
  overdueCompliance: number;
  pendingCompliance: number;
  unpaidInvoices: number;
  unpaidInvoiceAmount: number;
  documentsCount: number;
}

export type ClientSortKey = "name" | "dueDate" | "amount" | "updatedAt";
export type SortDir = "asc" | "desc";
