import { clsx } from "@/lib/utils";

export default function LoadingSpinner({
  className,
  label = "Loading...",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-4 py-16",
        className
      )}
    >
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-blue-500" />
      <p className="text-sm text-zinc-500">{label}</p>
    </div>
  );
}
