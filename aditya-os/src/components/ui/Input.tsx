export default function Input({
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-sm text-zinc-400">{label}</span>
      )}
      <input
        className={`h-12 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500/50 ${className ?? ""}`}
        {...props}
      />
    </label>
  );
}
