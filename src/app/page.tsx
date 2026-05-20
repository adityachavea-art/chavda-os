import Link from "next/link";

import {
  ArrowRight,
  LayoutDashboard,
  Users,
  Wallet,
  CheckSquare,
  BarChart3,
  Sparkles,
} from "lucide-react";

const modules = [
  {
    title: "Dashboard",
    description:
      "Business overview, AI insights and operational monitoring.",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "CRM",
    description:
      "Enterprise client management and relationship workflows.",
    href: "/crm",
    icon: Users,
  },
  {
    title: "Finance",
    description:
      "Revenue tracking, invoices, GST and financial reporting.",
    href: "/finance",
    icon: Wallet,
  },
  {
    title: "Tasks",
    description:
      "Productivity management and operational workflows.",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Analytics",
    description:
      "Business intelligence, forecasting and AI insights.",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "AI Assistant",
    description:
      "Smart enterprise AI workspace and automation center.",
    href: "/ai",
    icon: Sparkles,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      {/* HERO */}

      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_30%)]" />

        <div className="relative mx-auto flex max-w-[1700px] flex-col gap-16 px-8 py-24 xl:flex-row xl:items-center xl:justify-between">
          {/* LEFT */}

          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-400">
              AI-Powered Business Operating System
            </p>

            <h1 className="mt-8 text-6xl font-black leading-[1] tracking-tight xl:text-7xl">
              Chavda OS
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-zinc-400">
              Premium enterprise workspace for CRM,
              finance, productivity, analytics and AI
              automation — built for modern businesses.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-2xl bg-blue-500 px-6 py-4 text-sm font-medium transition hover:bg-blue-400"
              >
                Open Workspace

                <ArrowRight className="h-4 w-4" />
              </Link>

              <button className="rounded-2xl border border-white/[0.06] bg-[#111318] px-6 py-4 text-sm font-medium text-zinc-300 transition hover:text-white">
                Enterprise Suite
              </button>
            </div>
          </div>

          {/* RIGHT */}

          <div className="grid w-full max-w-2xl grid-cols-2 gap-5">
            {modules.slice(0, 4).map((module) => {
              const Icon = module.icon;

              return (
                <div
                  key={module.title}
                  className="rounded-3xl border border-white/[0.06] bg-[#111318] p-6"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
                    <Icon className="h-7 w-7 text-blue-400" />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold">
                    {module.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                    {module.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MODULES */}

      <section className="mx-auto max-w-[1700px] px-8 py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-violet-400">
              Enterprise Modules
            </p>

            <h2 className="mt-4 text-5xl font-black tracking-tight">
              Unified Business Workspace
            </h2>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <Link
                key={module.title}
                href={module.href}
                className="group rounded-3xl border border-white/[0.06] bg-[#111318] p-7 transition hover:-translate-y-1 hover:border-blue-500/20"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10">
                  <Icon className="h-8 w-8 text-blue-400" />
                </div>

                <h3 className="mt-7 text-3xl font-black tracking-tight">
                  {module.title}
                </h3>

                <p className="mt-4 leading-relaxed text-zinc-500">
                  {module.description}
                </p>

                <div className="mt-8 flex items-center gap-2 text-sm font-medium text-blue-400">
                  Open Module

                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}