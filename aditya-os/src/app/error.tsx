"use client";

import { useEffect } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/branding";
import Button from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[CHAVDA OS]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#09090B] px-4 text-white">
      <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
        {BRAND.appName}
      </p>
      <h1 className="mt-4 text-3xl font-black">Something went wrong</h1>
      <p className="mt-3 max-w-md text-center text-sm text-zinc-500">
        {error.message || "An unexpected error occurred."}
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Link href="/dashboard">
          <Button variant="secondary">Dashboard</Button>
        </Link>
      </div>
      <p className="mt-10 text-xs text-zinc-600">{BRAND.foundedBy}</p>
    </div>
  );
}
