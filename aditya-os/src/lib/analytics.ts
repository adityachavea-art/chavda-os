import type { Client, Payment } from "@/lib/types";

export function paymentsByMonth(payments: Payment[]) {
  const map = new Map<string, { income: number; expense: number }>();
  for (const p of payments) {
    const month = p.date.slice(0, 7);
    const row = map.get(month) ?? { income: 0, expense: 0 };
    if (p.type === "income") row.income += p.amount;
    else row.expense += p.amount;
    map.set(month, row);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, v]) => ({
      month: formatMonth(month),
      income: v.income,
      expense: v.expense,
      net: v.income - v.expense,
    }));
}

function formatMonth(ym: string) {
  const [y, m] = ym.split("-");
  const d = new Date(Number(y), Number(m) - 1, 1);
  return d.toLocaleDateString("en-IN", { month: "short" });
}

export function clientStatusBreakdown(clients: Client[]) {
  const counts = { active: 0, completed: 0, reminder_due: 0 };
  for (const c of clients) counts[c.status]++;
  return [
    { name: "Active", value: counts.active, fill: "#3b82f6" },
    { name: "Reminder due", value: counts.reminder_due, fill: "#f97316" },
    { name: "Completed", value: counts.completed, fill: "#34d399" },
  ].filter((x) => x.value > 0);
}

export function paymentStatusBreakdown(clients: Client[]) {
  const counts = { pending: 0, partial: 0, paid: 0, overdue: 0 };
  for (const c of clients) {
    if (c.paymentStatus in counts) counts[c.paymentStatus]++;
  }
  return [
    { name: "Pending", value: counts.pending, fill: "#fbbf24" },
    { name: "Partial", value: counts.partial, fill: "#fb923c" },
    { name: "Overdue", value: counts.overdue, fill: "#f87171" },
    { name: "Paid", value: counts.paid, fill: "#34d399" },
  ].filter((x) => x.value > 0);
}
