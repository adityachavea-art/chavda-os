"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  clientStatusBreakdown,
  paymentStatusBreakdown,
  paymentsByMonth,
} from "@/lib/analytics";
import type { Client, Payment } from "@/lib/types";
import { formatCurrency } from "@/lib/services/clients";

export default function AnalyticsCharts({
  clients,
  payments,
}: {
  clients: Client[];
  payments: Payment[];
}) {
  const monthly = paymentsByMonth(payments);
  const statusData = clientStatusBreakdown(clients);
  const paymentData = paymentStatusBreakdown(clients);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <div className="glass-card rounded-3xl p-6">
        <h3 className="font-bold">Revenue vs expenses</h3>
        <p className="mt-1 text-sm text-zinc-500">Last 6 months</p>
        <div className="mt-6 h-[280px]">
          {monthly.length === 0 ? (
            <p className="flex h-full items-center justify-center text-sm text-zinc-500">
              Add payments to see trends
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "#111318",
                    border: "1px solid #ffffff10",
                    borderRadius: 12,
                  }}
                  formatter={(v) => formatCurrency(Number(v))}
                />
                <Legend />
                <Bar dataKey="income" fill="#34d399" name="Income" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expense" fill="#f87171" name="Expense" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6">
        <h3 className="font-bold">Client status</h3>
        <div className="mt-6 h-[280px]">
          {statusData.length === 0 ? (
            <p className="flex h-full items-center justify-center text-sm text-zinc-500">
              No clients yet
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                >
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#111318",
                    border: "1px solid #ffffff10",
                    borderRadius: 12,
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6 xl:col-span-2">
        <h3 className="font-bold">Payment status (clients)</h3>
        <div className="mt-6 h-[240px]">
          {paymentData.length === 0 ? (
            <p className="text-sm text-zinc-500">No payment data</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paymentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis type="number" stroke="#71717a" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#71717a" width={80} fontSize={12} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {paymentData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
