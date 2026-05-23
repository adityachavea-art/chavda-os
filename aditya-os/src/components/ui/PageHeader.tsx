export default function PageHeader({
  badge,
  title,
  subtitle,
  actions,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-start lg:justify-between">
      <div>
        {badge && (
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-blue-400 sm:text-sm">
            {badge}
          </p>
        )}
        <h1 className="page-title mt-2 sm:mt-3">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {actions && (
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {actions}
        </div>
      )}
    </div>
  );
}
