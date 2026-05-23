import { orderBy, query } from "firebase/firestore";
import { wsActivityRef } from "@/lib/firestore/refs";
import { mapSubscribeOptions, subscribeQuery } from "@/lib/firestore/subscribe";
import type { ActivityLog } from "@/lib/types";

function normalize(raw: Record<string, unknown>, id: string): ActivityLog {
  return {
    id,
    action: String(raw.action ?? ""),
    entityType: String(raw.entityType ?? ""),
    entityId: raw.entityId ? String(raw.entityId) : undefined,
    entityLabel: raw.entityLabel ? String(raw.entityLabel) : undefined,
    userId: String(raw.userId ?? ""),
    userEmail: raw.userEmail ? String(raw.userEmail) : undefined,
    meta: raw.meta as Record<string, string> | undefined,
    createdAt: Number(raw.createdAt ?? Date.now()),
  };
}

export function subscribeActivity(
  workspaceId: string,
  callback: (items: ActivityLog[]) => void,
  options?: { onError?: (code: string) => void; onReady?: () => void }
) {
  const q = query(wsActivityRef(workspaceId), orderBy("createdAt", "desc"));
  return subscribeQuery<Record<string, unknown>>(
    q,
    (items) => callback(items.map((r) => normalize(r, String(r.id ?? "")))),
    mapSubscribeOptions(options)
  );
}
