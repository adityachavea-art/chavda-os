"use client";

import { clsx } from "@/lib/utils";

type Variant = "primary" | "secondary" | "danger" | "success" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-500",
  secondary: "border border-white/10 bg-[#111318] text-zinc-200 hover:bg-white/[0.06]",
  danger: "bg-red-600/90 text-white hover:bg-red-500",
  success: "bg-emerald-600 text-white hover:bg-emerald-500",
  ghost: "text-zinc-400 hover:bg-white/[0.04] hover:text-white",
};

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
