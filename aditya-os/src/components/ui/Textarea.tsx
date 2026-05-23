export default function Textarea({
  label,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-sm text-zinc-400">{label}</span>
      )}
      <textarea
        className={`min-h-[120px] w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500/50 ${className ?? ""}`}
        {...props}
      />
    </label>
  );
}
