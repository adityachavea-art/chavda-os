import {
  addDoc,
  deleteDoc,
  orderBy,
  query,
  updateDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { userPaymentRef, userPaymentsRef } from "@/lib/firestore/refs";
import { subscribeQuery } from "@/lib/firestore/subscribe";
import type { Payment } from "@/lib/types";

export type PaymentInput = Omit<Payment, "id" | "createdAt" | "updatedAt">;

export function subscribePayments(
  uid: string,
  callback: (payments: Payment[]) => void,
  options?: { onError?: (code: string) => void; onReady?: () => void }
): Unsubscribe {
  const q = query(userPaymentsRef(uid), orderBy("updatedAt", "desc"));
  return subscribeQuery<Payment>(q, callback, {
    onReady: options?.onReady,
    onError: (err) => options?.onError?.(err.code),
  });
}

export async function createPayment(uid: string, data: PaymentInput) {
  const now = Date.now();
  await addDoc(userPaymentsRef(uid), {
    ...data,
    createdAt: now,
    updatedAt: now,
  });
}

export async function updatePayment(
  uid: string,
  id: string,
  data: Partial<PaymentInput>
) {
  await updateDoc(userPaymentRef(uid, id), {
    ...data,
    updatedAt: Date.now(),
  });
}

export async function deletePayment(uid: string, id: string) {
  await deleteDoc(userPaymentRef(uid, id));
}
