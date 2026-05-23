import Link from "next/link";
import {
  ArrowRight,
  LayoutDashboard,
  Users,
  CheckSquare,
  StickyNote,
  Wallet,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandMark";
import { BRAND } from "@/lib/branding";

const modules = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Clients", href: "/crm", icon: Users },
  { title: "Tasks", href: "/tasks", icon: CheckSquare },
  { title: "Notes", href: "/notes", icon: StickyNote },
  { title: "Payments", href: "/payments", icon: Wallet },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_30%)]" />
        <div className="relative mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:py-28">
          <div className="max-w-xl">
            <BrandLogo size="lg" />
            <h1 className="mt-8 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Premium business workspace
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              {BRAND.tagline}
            </p>
            <p className="mt-4 text-sm font-medium text-zinc-500">
              {BRAND.foundedBy}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-medium transition hover:bg-blue-500"
              >
                Sign in to {BRAND.appName}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="rounded-2xl border border-white/[0.06] bg-[#111318] px-6 py-4 text-sm font-medium text-zinc-300 transition hover:text-white"
              >
                Open dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
          {BRAND.appName}
        </p>
        <h2 className="mt-3 text-3xl font-black">Workspace modules</h2>
        <p className="mt-2 text-sm text-zinc-500">{BRAND.foundedBy}</p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.href}
                href={m.href}
                className="group rounded-3xl border border-white/[0.06] bg-[#111318] p-6 transition hover:border-blue-500/20"
              >
                <Icon className="h-8 w-8 text-blue-400" />
                <h3 className="mt-4 text-xl font-bold">{m.title}</h3>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-blue-400">
                  Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-8 text-center text-sm text-zinc-600">
        {BRAND.appName} · {BRAND.foundedBy}
      </footer>
    </main>
  );
}
