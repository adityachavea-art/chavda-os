import {
  addDoc,
  deleteDoc,
  orderBy,
  query,
  updateDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { userNoteRef, userNotesRef } from "@/lib/firestore/refs";
import { subscribeQuery } from "@/lib/firestore/subscribe";
import type { Note } from "@/lib/types";

export type NoteInput = Omit<Note, "id" | "createdAt" | "updatedAt">;

export function subscribeNotes(
  uid: string,
  callback: (notes: Note[]) => void,
  options?: { onError?: (code: string) => void; onReady?: () => void }
): Unsubscribe {
  const q = query(userNotesRef(uid), orderBy("updatedAt", "desc"));
  return subscribeQuery<Note>(q, callback, {
    onReady: options?.onReady,
    onError: (err) => options?.onError?.(err.code),
  });
}

export async function createNote(uid: string, data: NoteInput) {
  const now = Date.now();
  await addDoc(userNotesRef(uid), { ...data, createdAt: now, updatedAt: now });
}

export async function updateNote(
  uid: string,
  id: string,
  data: Partial<NoteInput>
) {
  await updateDoc(userNoteRef(uid, id), { ...data, updatedAt: Date.now() });
}

export async function deleteNote(uid: string, id: string) {
  await deleteDoc(userNoteRef(uid, id));
}
