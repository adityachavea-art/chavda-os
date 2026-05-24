import AppShell from "../components/AppShell";

import {
  TrendingUp,
  Wallet,
  Users,
  CheckCircle2,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <AppShell>
      {/* HEADER */}

      <div className="mb-10 flex items-start justify-between">
        <div>
          <h1 className="page-title">
            Welcome back, Aditya 👋
          </h1>

          <p className="page-subtitle">
            AI-powered business operating system overview.
          </p>
        </div>

        <div className="glass-card rounded-2xl px-5 py-4">
          <p className="text-sm text-zinc-400">
            System Status
          </p>

          <div className="mt-2 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-400" />

            <span className="font-medium text-emerald-300">
              Operational
            </span>
          </div>
        </div>
      </div>

      {/* STATS */}

      <div className="grid-auto">
        {/* CARD */}

        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="card-title">
                Revenue
              </p>

              <h2 className="card-value">
                ₹12.4L
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
              <Wallet className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm text-emerald-300">
            <TrendingUp className="h-4 w-4" />

            <span>
              +18.2% growth this month
            </span>
          </div>
        </div>

        {/* CARD */}

        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="card-title">
                Active Clients
              </p>

              <h2 className="card-value">
                128
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <Users className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-5 text-sm text-zinc-400">
            14 new onboarded this week
          </div>
        </div>

        {/* CARD */}

        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="card-title">
                Pending Tasks
              </p>

              <h2 className="card-value">
                12
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">
              <CheckCircle2 className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-5 text-sm text-orange-300">
            4 high-priority tasks remaining
          </div>
        </div>
      </div>

      {/* SECOND SECTION */}

      <div className="mt-10 grid grid-cols-12 gap-6">
        {/* LEFT */}

        <div className="glass-card col-span-8 rounded-3xl p-7">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="section-title">
                Revenue Analytics
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Business performance overview
              </p>
            </div>

            <button className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.05]">
              Export Report
            </button>
          </div>

          {/* CHART PLACEHOLDER */}

          <div className="flex h-[320px] items-end gap-5">
            <div className="flex flex-1 flex-col items-center gap-3">
              <div className="h-[140px] w-full rounded-t-2xl bg-blue-500/60" />

              <span className="text-sm text-zinc-500">
                Jan
              </span>
            </div>

            <div className="flex flex-1 flex-col items-center gap-3">
              <div className="h-[200px] w-full rounded-t-2xl bg-blue-500/60" />

              <span className="text-sm text-zinc-500">
                Feb
              </span>
            </div>

            <div className="flex flex-1 flex-col items-center gap-3">
              <div className="h-[170px] w-full rounded-t-2xl bg-blue-500/60" />

              <span className="text-sm text-zinc-500">
                Mar
              </span>
            </div>

            <div className="flex flex-1 flex-col items-center gap-3">
              <div className="h-[260px] w-full rounded-t-2xl bg-blue-500/60" />

              <span className="text-sm text-zinc-500">
                Apr
              </span>
            </div>

            <div className="flex flex-1 flex-col items-center gap-3">
              <div className="h-[300px] w-full rounded-t-2xl bg-blue-500/60" />

              <span className="text-sm text-zinc-500">
                May
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="glass-card col-span-4 rounded-3xl p-7">
          <h2 className="section-title">
            AI Insights
          </h2>

          <div className="mt-6 space-y-5">
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <p className="text-sm leading-relaxed text-zinc-300">
                Revenue growth increased by 18% compared
                to last month.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <p className="text-sm leading-relaxed text-zinc-300">
                4 enterprise clients require follow-up
                this week.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <p className="text-sm leading-relaxed text-zinc-300">
                AI automation reduced manual workflow by
                37%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}