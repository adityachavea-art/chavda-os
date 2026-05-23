"use client";

import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/lib/types";

export default function RoleGuard({
  allowed,
  children,
  fallback,
}: {
  allowed: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { profile, loading } = useAuth();
  if (loading) return null;
  const role = profile?.role ?? "staff";
  if (!allowed.includes(role)) {
    return (
      fallback ?? (
        <div className="glass-card rounded-3xl p-8 text-center">
          <p className="font-semibold text-zinc-300">Access restricted</p>
          <p className="mt-2 text-sm text-zinc-500">
            Your role ({role}) cannot access this section.
          </p>
        </div>
      )
    );
  }
  return <>{children}</>;
}
