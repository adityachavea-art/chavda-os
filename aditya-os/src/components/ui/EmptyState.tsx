export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="glass-card rounded-3xl p-10 text-center">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 text-sm text-zinc-500">{description}</p>
    </div>
  );
}
