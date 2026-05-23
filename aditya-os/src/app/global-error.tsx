"use client";

import { BRAND } from "@/lib/branding";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#09090B] px-4 text-white">
        <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
          {BRAND.appName}
        </p>
        <h1 className="mt-4 text-2xl font-black">Critical error</h1>
        <p className="mt-3 text-sm text-zinc-500">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-medium"
        >
          Reload app
        </button>
      </body>
    </html>
  );
}
