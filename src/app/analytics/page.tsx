import AppShell from "../components/AppShell";

import {
  TrendingUp,
  Users,
  Wallet,
  Activity,
} from "lucide-react";

export default function AnalyticsPage() {
  return (
    <AppShell>
      {/* HEADER */}

      <div className="mb-10 flex items-start justify-between">
        <div>
          <h1 className="page-title">
            Business Analytics
          </h1>

          <p className="page-subtitle">
            Monitor growth, performance and AI-driven
            insights.
          </p>
        </div>

        <button className="rounded-2xl bg-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-400">
          Export Analytics
        </button>
      </div>

      {/* KPI SECTION */}

      <div className="grid grid-cols-4 gap-6">
        {/* REVENUE */}

        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="card-title">
                Revenue Growth
              </p>

              <h2 className="card-value">
                +18%
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="h-7 w-7" />
            </div>
          </div>

          <p className="mt-5 text-sm text-zinc-400">
            Compared to previous month
          </p>
        </div>

        {/* CLIENTS */}

        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="card-title">
                New Clients
              </p>

              <h2 className="card-value">
                24
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <Users className="h-7 w-7" />
            </div>
          </div>

          <p className="mt-5 text-sm text-zinc-400">
            Added in last 30 days
          </p>
        </div>

        {/* CASHFLOW */}

        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="card-title">
                Net Cashflow
              </p>

              <h2 className="card-value">
                ₹9.7L
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
              <Wallet className="h-7 w-7" />
            </div>
          </div>

          <p className="mt-5 text-sm text-zinc-400">
            Healthy operational balance
          </p>
        </div>

        {/* ACTIVITY */}

        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="card-title">
                System Activity
              </p>

              <h2 className="card-value">
                98%
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">
              <Activity className="h-7 w-7" />
            </div>
          </div>

          <p className="mt-5 text-sm text-zinc-400">
            AI workflow efficiency
          </p>
        </div>
      </div>

      {/* MAIN SECTION */}

      <div className="mt-10 grid grid-cols-12 gap-6">
        {/* PERFORMANCE */}

        <div className="glass-card col-span-8 rounded-3xl p-7">
          <div className="mb-7">
            <h2 className="section-title">
              Performance Overview
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Monthly business growth tracking
            </p>
          </div>

          {/* CHART */}

          <div className="flex h-[340px] items-end gap-5">
            {[
              120,
              180,
              150,
              240,
              280,
              320,
              290,
            ].map((height, index) => (
              <div
                key={index}
                className="flex flex-1 flex-col items-center gap-3"
              >
                <div
                  className="w-full rounded-t-2xl bg-blue-500/60"
                  style={{
                    height,
                  }}
                />

                <span className="text-sm text-zinc-500">
                  {
                    [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                    ][index]
                  }
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* INSIGHTS */}

        <div className="glass-card col-span-4 rounded-3xl p-7">
          <h2 className="section-title">
            AI Insights
          </h2>

          <div className="mt-6 space-y-5">
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
              <p className="text-sm leading-relaxed text-zinc-300">
                Revenue trend indicates stable long-term
                business growth.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
              <p className="text-sm leading-relaxed text-zinc-300">
                Client retention improved by 22% over the
                last quarter.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
              <p className="text-sm leading-relaxed text-zinc-300">
                AI automation reduced operational workload
                significantly.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
              <p className="text-sm leading-relaxed text-zinc-300">
                Productivity metrics suggest high workflow
                efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}