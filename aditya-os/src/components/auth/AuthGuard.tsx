"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { BRAND } from "@/lib/branding";

const PUBLIC = ["/", "/login"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    const isPublic = PUBLIC.includes(pathname);
    if (!user && !isPublic) router.replace("/login");
    if (user && pathname === "/login") router.replace("/dashboard");
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090B] text-zinc-400">
        Loading {BRAND.appName}...
      </div>
    );
  }

  if (!user && !PUBLIC.includes(pathname)) return null;

  return <>{children}</>;
}
