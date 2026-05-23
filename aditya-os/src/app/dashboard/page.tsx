"use client";

import Link from "next/link";
import {
  Users,
  CheckCircle2,
  IndianRupee,
  FileCheck,
  Receipt,
  Bell,
  ArrowRight,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import AnimatedPage from "@/components/AnimatedPage";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import PageLoader from "@/components/ui/PageLoader";
import ActivityTimeline from "@/components/ActivityTimeline";
import AnalyticsCharts from "@/components/charts/AnalyticsCharts";
import { useAuth } from "@/contexts/AuthContext";
import { useWorkspace } from "@/hooks/useWorkspace";
import { formatCurrency } from "@/lib/services/clients";
import { BRAND } from "@/lib/branding";

export default function DashboardPage() {
  const { user } = useAuth();
  const {
    clients,
    payments,
    stats,
    activity,
    compliance,
    invoices,
    loading,
    usingApiFallback,
  } = useWorkspace();

  const firstName =
    user?.displayName?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "there";

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
          title={`Welcome back, ${firstName}`}
          subtitle={`${BRAND.foundedBy} · CA office command center`}
          actions={
            <div className="glass-card rounded-2xl px-4 py-3 text-sm">
              <span className="text-emerald-400">●</span>{" "}
              {usingApiFallback ? "API sync" : "Realtime Firestore"}
            </div>
          }
        />

        <div className="grid-auto mb-8">
          <StatCard label="Revenue" value={formatCurrency(stats.totalRevenue)} icon={IndianRupee} accent="text-emerald-400" />
          <StatCard label="Clients" value={stats.totalClients} icon={Users} accent="text-blue-400" />
          <StatCard label="Compliance pending" value={stats.pendingCompliance} icon={FileCheck} accent="text-orange-400" />
          <StatCard label="Unpaid invoices" value={stats.unpaidInvoices} icon={Receipt} accent="text-amber-400" sub={formatCurrency(stats.unpaidInvoiceAmount)} />
          <StatCard label="Overdue filings" value={stats.overdueCompliance} icon={Bell} accent="text-red-400" />
          <StatCard label="Open tasks" value={stats.pendingTasks} icon={CheckCircle2} accent="text-violet-400" />
        </div>

        <div className="mb-8">
          <AnalyticsCharts clients={clients} payments={payments} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="glass-card rounded-3xl p-6">
            <div className="mb-4 flex justify-between">
              <h2 className="section-title">Recent activity</h2>
              <Link href="/activity" className="text-sm text-blue-400">
                View all <ArrowRight className="inline h-4 w-4" />
              </Link>
            </div>
            <ActivityTimeline logs={activity} limit={8} />
          </section>
          <section className="glass-card rounded-3xl p-6">
            <h2 className="section-title">Quick links</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { href: "/compliance", label: "Compliance", count: compliance.length },
                { href: "/invoices", label: "Invoices", count: invoices.length },
                { href: "/crm", label: "Clients", count: clients.length },
                { href: "/files", label: "Documents", count: stats.documentsCount },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-blue-500/30"
                >
                  <p className="font-semibold">{l.label}</p>
                  <p className="text-2xl font-black text-blue-400">{l.count}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </AnimatedPage>
    </AppShell>
  );
}
