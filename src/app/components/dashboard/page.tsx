import {
  ArrowUpRight,
  DollarSign,
  Users,
  Wallet,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "₹12.4L",
    growth: "+18.2%",
    icon: DollarSign,
  },
  {
    title: "Active Clients",
    value: "128",
    growth: "+9.4%",
    icon: Users,
  },
  {
    title: "Pending Invoices",
    value: "24",
    growth: "+3.1%",
    icon: Wallet,
  },
  {
    title: "Completed Tasks",
    value: "342",
    growth: "+21.7%",
    icon: CheckCircle2,
  },
];

const recentClients = [
  {
    name: "Reliance Industries",
    company: "Enterprise Client",
    amount: "₹4.2L",
    status: "Paid",
  },
  {
    name: "Tata Motors",
    company: "Automobile Division",
    amount: "₹2.8L",
    status: "Pending",
  },
  {
    name: "Infosys Ltd",
    company: "Technology Partner",
    amount: "₹1.9L",
    status: "Paid",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* HERO */}

      <div className="flex items-center justify-between rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#111318] to-[#0B0D11] p-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
            Business Overview
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight">
            Welcome back, Aditya 👋
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Monitor business performance, manage clients,
            track finances and automate workflows from one
            unified workspace.
          </p>
        </div>

        <div className="hidden h-44 w-44 items-center justify-center rounded-full bg-blue-500/10 lg:flex">
          <TrendingUp className="h-20 w-20 text-blue-400" />
        </div>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
                  <Icon className="h-7 w-7 text-blue-400" />
                </div>

                <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  <ArrowUpRight className="h-3 w-3" />

                  {item.growth}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-zinc-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-4xl font-bold tracking-tight">
                  {item.value}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* GRID */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* CLIENTS */}

        <div className="xl:col-span-2 rounded-3xl border border-white/[0.06] bg-[#111318]">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">
            <div>
              <h3 className="text-xl font-bold">
                Recent Clients
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                Latest business activities and invoices
              </p>
            </div>

            <button className="rounded-xl border border-white/[0.06] px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.04] hover:text-white">
              View All
            </button>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {recentClients.map((client) => (
              <div
                key={client.name}
                className="flex items-center justify-between px-6 py-5"
              >
                <div>
                  <h4 className="font-semibold">
                    {client.name}
                  </h4>

                  <p className="mt-1 text-sm text-zinc-500">
                    {client.company}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    {client.amount}
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      client.status === "Paid"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-orange-500/10 text-orange-400"
                    }`}
                  >
                    {client.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVITY */}

        <div className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6">
          <h3 className="text-xl font-bold">
            AI Insights
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            Automated business intelligence generated from
            client activities and financial workflows.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-blue-500/10 bg-blue-500/10 p-4">
              <p className="text-sm font-medium text-blue-300">
                Revenue increased 18% this month.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/10 p-4">
              <p className="text-sm font-medium text-emerald-300">
                12 pending invoices require follow-up.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-500/10 bg-orange-500/10 p-4">
              <p className="text-sm font-medium text-orange-300">
                AI automation saved 14 working hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}