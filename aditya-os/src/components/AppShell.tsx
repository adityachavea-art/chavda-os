"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Wallet,
  CheckSquare,
  StickyNote,
  Menu,
  X,
  LogOut,
  BarChart3,
  Settings,
  FileCheck,
  Receipt,
  FolderOpen,
  History,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import FirestoreSetupBanner from "@/components/FirestoreSetupBanner";
import GlobalSearch from "@/components/GlobalSearch";
import NotificationBell from "@/components/NotificationBell";
import { BrandLogo } from "@/components/BrandMark";
import { BRAND } from "@/lib/branding";
import { clsx } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Clients", href: "/crm", icon: Users },
  { name: "Compliance", href: "/compliance", icon: FileCheck },
  { name: "Invoices", href: "/invoices", icon: Receipt },
  { name: "Payments", href: "/payments", icon: Wallet },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Notes", href: "/notes", icon: StickyNote },
  { name: "Files", href: "/files", icon: FolderOpen },
  { name: "Activity", href: "/activity", icon: History },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, profile, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={clsx(
          "fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col border-r border-white/[0.06] bg-[#0D0F13] transition-transform duration-300 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="border-b border-white/[0.06] bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_55%)] px-6 py-6">
          <div className="flex items-start justify-between">
            <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
              <BrandLogo size="md" />
            </Link>
            <button
              type="button"
              className="rounded-xl p-2 text-zinc-400 lg:hidden"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-zinc-600">
            {BRAND.tagline}
          </p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/[0.06] p-4">
          <div className="mb-3 rounded-2xl border border-white/[0.06] bg-[#111318]/80 px-3 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
              Founder
            </p>
            <p className="mt-1 text-sm font-semibold text-zinc-300">
              {BRAND.founderName}
            </p>
            <p className="mt-0.5 text-xs capitalize text-zinc-500">
              Role: {profile?.role ?? "admin"}
            </p>
          </div>

          <div className="mb-3 flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-[#111318] px-3 py-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 text-sm font-bold">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{displayName}</p>
              <p className="truncate text-xs text-zinc-500">{user?.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => logout()}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      <main className="lg:ml-[260px]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-white/[0.06] bg-[#09090B]/95 px-4 backdrop-blur-xl sm:px-6 lg:h-[72px] lg:px-8">
          <button
            type="button"
            className="shrink-0 rounded-xl border border-white/10 p-2 text-zinc-400 lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex min-w-0 flex-1 flex-col items-center lg:hidden">
            <span className="truncate text-sm font-black tracking-[0.14em]">
              {BRAND.appName}
            </span>
            <span className="truncate text-[10px] font-medium text-zinc-500">
              {BRAND.foundedBy}
            </span>
          </div>

          <GlobalSearch />

          <div className="flex items-center gap-2">
            <NotificationBell />
          <div className="hidden items-center gap-2 rounded-2xl border border-white/[0.06] bg-[#111318] px-4 py-2 lg:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 text-xs font-bold">
              {initials}
            </div>
            <div className="min-w-0 text-right">
              <p className="truncate text-sm font-medium leading-none">
                {displayName}
              </p>
              <p className="mt-1 truncate text-[10px] text-zinc-500">
                {user?.email}
              </p>
            </div>
          </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1700px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <FirestoreSetupBanner />
          {children}
        </div>
      </main>
    </div>
  );
}
