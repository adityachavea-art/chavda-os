"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useWorkspace } from "@/hooks/useWorkspace";
import { complianceTypeLabel } from "@/lib/services/compliance";

export default function GlobalSearch() {
  const { clients, compliance, invoices, tasks } = useWorkspace();
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];
    const out: { type: string; label: string; href: string }[] = [];
    clients
      .filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.gstin?.toLowerCase().includes(term) ||
          c.pan?.toLowerCase().includes(term)
      )
      .slice(0, 5)
      .forEach((c) =>
        out.push({ type: "Client", label: c.name, href: `/crm/${c.id}` })
      );
    compliance
      .filter((c) => c.clientName.toLowerCase().includes(term))
      .slice(0, 3)
      .forEach((c) =>
        out.push({
          type: "Compliance",
          label: `${complianceTypeLabel(c.type)} · ${c.clientName}`,
          href: "/compliance",
        })
      );
    invoices
      .filter(
        (i) =>
          i.invoiceNumber.toLowerCase().includes(term) ||
          i.clientName.toLowerCase().includes(term)
      )
      .slice(0, 3)
      .forEach((i) =>
        out.push({
          type: "Invoice",
          label: i.invoiceNumber,
          href: "/invoices",
        })
      );
    tasks
      .filter((t) => t.title.toLowerCase().includes(term))
      .slice(0, 3)
      .forEach((t) =>
        out.push({ type: "Task", label: t.title, href: "/tasks" })
      );
    return out;
  }, [q, clients, compliance, invoices, tasks]);

  return (
    <div className="relative hidden flex-1 md:block md:max-w-md">
      <div className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-[#111318] px-3">
        <Search className="h-4 w-4 text-zinc-500" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Search clients, GST, invoices..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600"
        />
      </div>
      {focused && results.length > 0 && (
        <div className="absolute left-0 right-0 top-12 z-50 rounded-2xl border border-white/10 bg-[#111318] py-2 shadow-xl">
          {results.map((r, i) => (
            <Link
              key={`${r.href}-${i}`}
              href={r.href}
              className="block px-4 py-2 text-sm hover:bg-white/[0.04]"
            >
              <span className="text-xs text-blue-400">{r.type}</span>
              <p className="font-medium">{r.label}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
