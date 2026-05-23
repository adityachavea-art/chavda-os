"use client";

import AppShell from "@/components/AppShell";
import AnimatedPage from "@/components/AnimatedPage";
import PageHeader from "@/components/ui/PageHeader";
import PageLoader from "@/components/ui/PageLoader";
import StatCard from "@/components/ui/StatCard";
import AnalyticsCharts from "@/components/charts/AnalyticsCharts";
import { useWorkspace } from "@/hooks/useWorkspace";
import { formatCurrency } from "@/lib/services/clients";
import { BRAND } from "@/lib/branding";
import { TrendingUp, Users, Wallet, Bell } from "lucide-react";

export default function AnalyticsPage() {
  const { clients, payments, stats, loading } = useWorkspace();

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
          title="Analytics"
          subtitle={`${BRAND.foundedBy} · Live charts from your workspace data.`}
        />

        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Revenue"
            value={formatCurrency(stats.totalRevenue)}
            icon={TrendingUp}
            accent="text-emerald-400"
          />
          <StatCard
            label="Expenses"
            value={formatCurrency(stats.totalExpenses)}
            icon={Wallet}
            accent="text-red-400"
          />
          <StatCard
            label="Clients"
            value={stats.totalClients}
            icon={Users}
            accent="text-blue-400"
          />
          <StatCard
            label="Reminders due"
            value={stats.recurringReminders}
            icon={Bell}
            accent="text-orange-400"
          />
        </div>

        <AnalyticsCharts clients={clients} payments={payments} />
      </AnimatedPage>
    </AppShell>
  );
}
