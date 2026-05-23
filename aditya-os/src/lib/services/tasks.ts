import {
  addDoc,
  deleteDoc,
  orderBy,
  query,
  updateDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { userTaskRef, userTasksRef } from "@/lib/firestore/refs";
import { subscribeQuery } from "@/lib/firestore/subscribe";
import type { Task } from "@/lib/types";

export type TaskInput = Omit<Task, "id" | "createdAt" | "updatedAt">;

export function subscribeTasks(
  uid: string,
  callback: (tasks: Task[]) => void,
  options?: { onError?: (code: string) => void; onReady?: () => void }
): Unsubscribe {
  const q = query(userTasksRef(uid), orderBy("updatedAt", "desc"));
  return subscribeQuery<Task>(q, callback, {
    onReady: options?.onReady,
    onError: (err) => options?.onError?.(err.code),
  });
}

export async function createTask(uid: string, data: TaskInput) {
  const now = Date.now();
  await addDoc(userTasksRef(uid), { ...data, createdAt: now, updatedAt: now });
}

export async function updateTask(
  uid: string,
  id: string,
  data: Partial<TaskInput>
) {
  await updateDoc(userTaskRef(uid, id), { ...data, updatedAt: Date.now() });
}

export async function deleteTask(uid: string, id: string) {
  await deleteDoc(userTaskRef(uid, id));
}
