import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { wsTeamRef } from "@/lib/firestore/refs";
import type { TeamMember, UserRole } from "@/lib/types";
import { logActivity } from "@/lib/services/activity";

export async function listTeam(workspaceId: string): Promise<TeamMember[]> {
  const q = query(wsTeamRef(workspaceId), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as TeamMember));
}

export async function inviteTeamMember(
  workspaceId: string,
  data: { email: string; role: UserRole; displayName?: string },
  actor: { uid: string; email?: string }
) {
  const ref = await addDoc(wsTeamRef(workspaceId), {
    email: data.email.toLowerCase().trim(),
    role: data.role,
    displayName: data.displayName ?? "",
    status: "invited",
    createdAt: Date.now(),
  });
  await logActivity(workspaceId, {
    action: "invited",
    entityType: "team",
    entityId: ref.id,
    entityLabel: data.email,
    userId: actor.uid,
    userEmail: actor.email,
  });
}

export async function removeTeamMember(
  workspaceId: string,
  id: string,
  actor: { uid: string; email?: string }
) {
  await deleteDoc(doc(wsTeamRef(workspaceId), id));
  await logActivity(workspaceId, {
    action: "removed",
    entityType: "team",
    entityId: id,
    userId: actor.uid,
    userEmail: actor.email,
  });
}

export async function updateTeamMemberRole(
  workspaceId: string,
  id: string,
  role: UserRole,
  actor: { uid: string; email?: string }
) {
  await updateDoc(doc(wsTeamRef(workspaceId), id), { role });
  await logActivity(workspaceId, {
    action: "updated",
    entityType: "team",
    entityId: id,
    meta: { role },
    userId: actor.uid,
    userEmail: actor.email,
  });
}
