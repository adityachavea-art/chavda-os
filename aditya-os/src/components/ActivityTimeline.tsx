"use client";

import type { ActivityLog } from "@/lib/types";

export default function ActivityTimeline({
  logs,
  limit = 20,
}: {
  logs: ActivityLog[];
  limit?: number;
}) {
  const items = logs.slice(0, limit);
  if (items.length === 0) {
    return <p className="text-sm text-zinc-500">No activity yet.</p>;
  }
  return (
    <ul className="space-y-3">
      {items.map((log) => (
        <li
          key={log.id}
          className="flex gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3"
        >
          <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
          <div className="min-w-0 flex-1">
            <p className="text-sm">
              <span className="font-medium capitalize">{log.action}</span>{" "}
              <span className="text-zinc-400">{log.entityType}</span>
              {log.entityLabel && (
                <span className="text-zinc-300"> · {log.entityLabel}</span>
              )}
            </p>
            <p className="mt-1 text-xs text-zinc-600">
              {new Date(log.createdAt).toLocaleString("en-IN")}
              {log.userEmail && ` · ${log.userEmail}`}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
