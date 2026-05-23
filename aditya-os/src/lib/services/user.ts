import {
  collectionGroup,
  getDoc,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { userProfileRef } from "@/lib/firestore/refs";
import type { UserProfile } from "@/lib/types";

export async function ensureUserWorkspace(
  uid: string,
  email: string | null,
  displayName: string | null
): Promise<UserProfile> {
  const ref = userProfileRef(uid);
  const snap = await getDoc(ref);
  const now = Date.now();

  if (!snap.exists()) {
    if (email) {
      const linked = await linkTeamMembership(uid, email);
      if (linked) return linked;
    }
    const profile: UserProfile = {
      email,
      displayName,
      role: "admin",
      theme: "dark",
      createdAt: now,
      updatedAt: now,
    };
    await setDoc(ref, {
      ...profile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return profile;
  }

  const data = snap.data() as UserProfile;
  if (email && !data.workspaceOwnerId) {
    const linked = await linkTeamMembership(uid, email);
    if (linked) return linked;
  }

  await updateDoc(ref, {
    email: email ?? data.email,
    displayName: displayName ?? data.displayName,
    updatedAt: serverTimestamp(),
  });

  return {
    ...data,
    email: email ?? data.email,
    displayName: displayName ?? data.displayName,
  };
}

async function linkTeamMembership(
  uid: string,
  email: string
): Promise<UserProfile | null> {
  try {
    const q = query(
      collectionGroup(db, "team"),
      where("email", "==", email.toLowerCase().trim()),
      where("status", "==", "invited")
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const teamDoc = snap.docs[0]!;
    const workspaceOwnerId = teamDoc.ref.parent.parent?.id;
    if (!workspaceOwnerId) return null;
    const member = teamDoc.data();
    const profile: UserProfile = {
      email,
      displayName: member.displayName ?? null,
      role: member.role ?? "staff",
      workspaceOwnerId,
      theme: "dark",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await setDoc(userProfileRef(uid), {
      ...profile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    await updateDoc(teamDoc.ref, { status: "active" });
    return profile;
  } catch {
    return null;
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(userProfileRef(uid));
  if (!snap.exists()) return null;
  return snap.data() as UserProfile;
}

export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>
) {
  await updateDoc(userProfileRef(uid), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}
