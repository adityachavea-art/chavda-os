import { BRAND } from "@/lib/branding";
import { clsx } from "@/lib/utils";

export function BrandLogo({
  size = "md",
  showFounder = true,
  className,
}: {
  size?: "sm" | "md" | "lg";
  showFounder?: boolean;
  className?: string;
}) {
  const titleClass = clsx(
    "font-black tracking-[0.12em] text-white",
    size === "sm" && "text-sm",
    size === "md" && "text-xl sm:text-2xl",
    size === "lg" && "text-3xl sm:text-4xl"
  );

  return (
    <div className={className}>
      <p className={titleClass}>{BRAND.appName}</p>
      {showFounder && (
        <p
          className={clsx(
            "font-medium text-zinc-500",
            size === "sm" && "mt-0.5 text-[10px]",
            size === "md" && "mt-1 text-xs",
            size === "lg" && "mt-2 text-sm"
          )}
        >
          {BRAND.foundedBy}
        </p>
      )}
    </div>
  );
}

export function BrandBadge({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        "inline-block text-xs font-semibold uppercase tracking-[0.28em] text-blue-400",
        className
      )}
    >
      {BRAND.appName}
    </span>
  );
}
