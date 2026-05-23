import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { WorkspaceBackup, WorkspaceExport } from "@/lib/types";

function backupsRef(uid: string) {
  return collection(db, "users", uid, "backups");
}

export async function saveBackupToCloud(
  uid: string,
  label: string,
  data: WorkspaceExport
) {
  await addDoc(backupsRef(uid), {
    label,
    data,
    createdAt: Date.now(),
  });
}

export async function listCloudBackups(uid: string): Promise<WorkspaceBackup[]> {
  const q = query(backupsRef(uid), orderBy("createdAt", "desc"), limit(20));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<WorkspaceBackup, "id">),
  }));
}

export async function deleteCloudBackup(uid: string, id: string) {
  await deleteDoc(doc(db, "users", uid, "backups", id));
}
