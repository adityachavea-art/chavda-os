import type { LucideIcon } from "lucide-react";

export default function StatCard({
  label,
  value,
  icon: Icon,
  accent = "text-blue-400",
  sub,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: string;
  sub?: string;
}) {
  return (
    <div className="glass-card rounded-3xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="card-title truncate">{label}</p>
          <h2 className={`card-value mt-2 truncate ${accent}`}>{value}</h2>
          {sub && <p className="mt-3 text-sm text-zinc-500">{sub}</p>}
        </div>
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/[0.04] sm:h-14 sm:w-14 ${accent}`}
        >
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
        </div>
      </div>
    </div>
  );
}
