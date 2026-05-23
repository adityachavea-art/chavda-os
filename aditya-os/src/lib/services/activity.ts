import { addDoc } from "firebase/firestore";
import { wsActivityRef } from "@/lib/firestore/refs";

export async function logActivity(
  workspaceId: string,
  data: {
    action: string;
    entityType: string;
    entityId?: string;
    entityLabel?: string;
    userId: string;
    userEmail?: string;
    meta?: Record<string, string>;
  }
) {
  try {
    await addDoc(wsActivityRef(workspaceId), {
      ...data,
      createdAt: Date.now(),
    });
  } catch (e) {
    console.error("[Activity]", e);
  }
}
