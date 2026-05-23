import Link from "next/link";
import { BRAND } from "@/lib/branding";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#09090B] px-4 text-white">
      <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
        {BRAND.appName}
      </p>
      <h1 className="mt-4 text-6xl font-black">404</h1>
      <p className="mt-3 text-zinc-500">Page not found</p>
      <Link
        href="/dashboard"
        className="mt-8 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-medium"
      >
        Go to dashboard
      </Link>
      <p className="mt-10 text-xs text-zinc-600">{BRAND.foundedBy}</p>
    </div>
  );
}
