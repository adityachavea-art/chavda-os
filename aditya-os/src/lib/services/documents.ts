import {
  addDoc,
  deleteDoc,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/lib/firebase";
import { wsDocumentRef, wsDocumentsRef } from "@/lib/firestore/refs";
import { mapSubscribeOptions, subscribeQuery } from "@/lib/firestore/subscribe";
import type { DocumentFile } from "@/lib/types";
import { logActivity } from "@/lib/services/activity";

export type DocumentInput = Omit<
  DocumentFile,
  "id" | "createdAt" | "downloadUrl"
>;

function normalize(raw: Record<string, unknown>, id: string): DocumentFile {
  return {
    id,
    clientId: String(raw.clientId ?? ""),
    clientName: String(raw.clientName ?? ""),
    name: String(raw.name ?? ""),
    storagePath: String(raw.storagePath ?? ""),
    downloadUrl: raw.downloadUrl ? String(raw.downloadUrl) : undefined,
    mimeType: String(raw.mimeType ?? "application/octet-stream"),
    size: Number(raw.size ?? 0),
    folder: String(raw.folder ?? "general"),
    uploadedBy: String(raw.uploadedBy ?? ""),
    createdAt: Number(raw.createdAt ?? Date.now()),
  };
}

export function subscribeDocuments(
  workspaceId: string,
  callback: (items: DocumentFile[]) => void,
  options?: { onError?: (code: string) => void; onReady?: () => void }
) {
  const q = query(wsDocumentsRef(workspaceId), orderBy("createdAt", "desc"));
  return subscribeQuery<Record<string, unknown>>(
    q,
    (items) => callback(items.map((r) => normalize(r, String(r.id ?? "")))),
    mapSubscribeOptions(options)
  );
}

export async function uploadDocument(
  workspaceId: string,
  file: File,
  meta: {
    clientId: string;
    clientName: string;
    folder: string;
    uploadedBy: string;
  },
  actor: { uid: string; email?: string }
) {
  const path = `workspaces/${workspaceId}/clients/${meta.clientId}/${Date.now()}_${file.name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  const now = Date.now();
  const docRef = await addDoc(wsDocumentsRef(workspaceId), {
    clientId: meta.clientId,
    clientName: meta.clientName,
    name: file.name,
    storagePath: path,
    downloadUrl: url,
    mimeType: file.type || "application/octet-stream",
    size: file.size,
    folder: meta.folder,
    uploadedBy: meta.uploadedBy,
    createdAt: now,
  });
  await logActivity(workspaceId, {
    action: "uploaded",
    entityType: "document",
    entityId: docRef.id,
    entityLabel: file.name,
    userId: actor.uid,
    userEmail: actor.email,
  });
  return docRef.id;
}

export async function deleteDocument(
  workspaceId: string,
  doc: DocumentFile,
  actor: { uid: string; email?: string }
) {
  try {
    await deleteObject(ref(storage, doc.storagePath));
  } catch {
    /* file may already be gone */
  }
  await deleteDoc(wsDocumentRef(workspaceId, doc.id));
  await logActivity(workspaceId, {
    action: "deleted",
    entityType: "document",
    entityId: doc.id,
    entityLabel: doc.name,
    userId: actor.uid,
    userEmail: actor.email,
  });
}
