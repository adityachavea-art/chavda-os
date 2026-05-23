export function clsx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatDateInput(date: Date = new Date()) {
  return date.toISOString().split("T")[0];
}
