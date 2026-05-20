import {
  TrendingUp,
  Users,
  Wallet,
  Activity,
  ArrowUpRight,
} from "lucide-react";

const metrics = [
  {
    title: "Revenue Growth",
    value: "+18.4%",
    icon: TrendingUp,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Client Retention",
    value: "92%",
    icon: Users,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "Cashflow Stability",
    value: "87%",
    icon: Wallet,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    title: "AI Productivity",
    value: "96%",
    icon: Activity,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
];

const reports = [
  {
    title: "Monthly Financial Report",
    status: "Completed",
    date: "May 2026",
  },
  {
    title: "Client Engagement Analysis",
    status: "Processing",
    date: "May 2026",
  },
  {
    title: "Business Growth Forecast",
    status: "Generated",
    date: "Q2 2026",
  },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-violet-400">
            Business Intelligence
          </p>

          <h1 className="mt-3 text-5xl font-black tracking-tight">
            Analytics Center
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Monitor growth, financial performance, client
            activity and AI-driven operational insights from
            a unified analytics workspace.
          </p>
        </div>

        <button className="rounded-2xl bg-violet-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-400">
          Export Analytics
        </button>
      </div>

      {/* METRICS */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.title}
              className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${metric.bg}`}
                >
                  <Icon
                    className={`h-7 w-7 ${metric.color}`}
                  />
                </div>

                <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  <ArrowUpRight className="h-3 w-3" />

                  Stable
                </div>
              </div>

              <p className="mt-6 text-sm text-zinc-500">
                {metric.title}
              </p>

              <h2 className="mt-2 text-4xl font-black">
                {metric.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* PERFORMANCE */}

        <div className="xl:col-span-2 rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">
                Performance Overview
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                Revenue and operational analytics
              </p>
            </div>
          </div>

          {/* CHART */}

          <div className="mt-10 flex h-[320px] items-end gap-4">
            {[45, 60, 52, 78, 68, 92, 84].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex flex-1 flex-col items-center gap-3"
                >
                  <div
                    className="w-full rounded-t-2xl bg-gradient-to-t from-violet-500 to-violet-400"
                    style={{
                      height: `${height * 3}px`,
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
              )
            )}
          </div>
        </div>

        {/* REPORTS */}

        <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
          <h3 className="text-2xl font-bold">
            AI Reports
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Generated business intelligence reports
          </p>

          <div className="mt-8 space-y-4">
            {reports.map((report) => (
              <div
                key={report.title}
                className="rounded-2xl border border-white/[0.06] bg-[#0B0D11] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold leading-relaxed">
                      {report.title}
                    </h4>

                    <p className="mt-2 text-sm text-zinc-500">
                      {report.date}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      report.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : report.status === "Processing"
                        ? "bg-orange-500/10 text-orange-400"
                        : "bg-violet-500/10 text-violet-400"
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* AI INSIGHT */}

          <div className="mt-8 rounded-3xl border border-violet-500/10 bg-violet-500/10 p-5">
            <p className="text-sm leading-relaxed text-violet-200">
              AI forecasting predicts strong business growth
              and improved operational efficiency over the
              next quarter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}