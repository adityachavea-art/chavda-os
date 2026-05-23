export default function Select({
  label,
  children,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-sm text-zinc-400">{label}</span>
      )}
      <select
        className={`h-12 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white focus:border-blue-500/50 ${className ?? ""}`}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}
