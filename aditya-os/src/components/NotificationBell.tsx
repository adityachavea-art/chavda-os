"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { useWorkspace } from "@/hooks/useWorkspace";
import { markNotificationRead } from "@/lib/services/notifications";

export default function NotificationBell() {
  const { workspaceId, notifications } = useWorkspace();
  const [open, setOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative rounded-xl border border-white/10 p-2 text-zinc-400 transition hover:text-white"
      >
        <Bell className="h-5 w-5" />
        {unread.length > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">
            {unread.length > 9 ? "9+" : unread.length}
          </span>
        )}
      </button>
      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-80 max-h-96 overflow-y-auto rounded-2xl border border-white/10 bg-[#111318] shadow-xl">
            <div className="border-b border-white/5 p-3">
              <p className="text-sm font-semibold">Notifications</p>
            </div>
            {notifications.length === 0 ? (
              <p className="p-4 text-sm text-zinc-500">No notifications</p>
            ) : (
              <ul>
                {notifications.slice(0, 12).map((n) => (
                  <li key={n.id}>
                    <Link
                      href={n.link ?? "#"}
                      onClick={() => {
                        if (workspaceId) void markNotificationRead(workspaceId, n.id);
                        setOpen(false);
                      }}
                      className={`block border-b border-white/5 p-3 text-sm transition hover:bg-white/[0.03] ${!n.read ? "bg-blue-500/5" : ""}`}
                    >
                      <p className="font-medium">{n.title}</p>
                      <p className="mt-1 text-xs text-zinc-500">{n.message}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
