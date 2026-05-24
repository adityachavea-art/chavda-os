"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  Wallet,
  CheckSquare,
  BarChart3,
  Sparkles,
  Bell,
  Search,
  Plus,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "CRM",
    href: "/crm",
    icon: Users,
  },
  {
    name: "Finance",
    href: "/finance",
    icon: Wallet,
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "AI Assistant",
    href: "/ai",
    icon: Sparkles,
  },
];

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* SIDEBAR */}

      <aside className="fixed left-0 top-0 flex h-screen w-[260px] flex-col border-r border-white/[0.06] bg-[#0D0F13]">
        {/* LOGO */}

        <div className="border-b border-white/[0.06] px-6 py-7">
          <h1 className="text-3xl font-black tracking-tight">
            Chavda OS
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Enterprise Business Suite
          </p>
        </div>

        {/* NAVIGATION */}

        <nav className="flex-1 space-y-2 px-4 py-6">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href;

            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />

                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* STATUS */}

        <div className="border-t border-white/[0.06] p-4">
          <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/10 p-4">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

              <span className="text-sm font-medium text-emerald-300">
                AI Systems Active
              </span>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              Automation, analytics and workflows are
              operational.
            </p>
          </div>
        </div>
      </aside>

      {/* MAIN */}

      <main className="ml-[260px]">
        {/* TOPBAR */}

        <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-white/[0.06] bg-[#09090B]/90 px-8 backdrop-blur-xl">
          {/* SEARCH */}

          <div className="flex w-[420px] items-center gap-3 rounded-2xl border border-white/[0.06] bg-[#111318] px-4">
            <Search className="h-4 w-4 text-zinc-500" />

            <input
              placeholder="Search clients, tasks, analytics..."
              className="h-11 w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </div>

          {/* ACTIONS */}

          <div className="flex items-center gap-4">
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.06] bg-[#111318] text-zinc-400 transition hover:text-white">
              <Bell className="h-5 w-5" />
            </button>

            <button className="flex items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-400">
              <Plus className="h-4 w-4" />

              Quick Create
            </button>

            <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-[#111318] px-4 py-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-sm font-bold">
                AC
              </div>

              <div>
                <p className="text-sm font-medium">
                  Aditya Chavda
                </p>

                <p className="text-xs text-zinc-500">
                  Founder
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}

        <div className="mx-auto max-w-[1700px] px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}