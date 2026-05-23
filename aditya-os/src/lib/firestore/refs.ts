import { collection, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function wsDoc(workspaceId: string) {
  return doc(db, "users", workspaceId);
}

export function wsClientsRef(workspaceId: string) {
  return collection(db, "users", workspaceId, "clients");
}

export function wsClientRef(workspaceId: string, id: string) {
  return doc(db, "users", workspaceId, "clients", id);
}

export function wsComplianceRef(workspaceId: string) {
  return collection(db, "users", workspaceId, "compliance");
}

export function wsComplianceDocRef(workspaceId: string, id: string) {
  return doc(db, "users", workspaceId, "compliance", id);
}

export function wsInvoicesRef(workspaceId: string) {
  return collection(db, "users", workspaceId, "invoices");
}

export function wsInvoiceRef(workspaceId: string, id: string) {
  return doc(db, "users", workspaceId, "invoices", id);
}

export function wsTasksRef(workspaceId: string) {
  return collection(db, "users", workspaceId, "tasks");
}

export function wsTaskRef(workspaceId: string, id: string) {
  return doc(db, "users", workspaceId, "tasks", id);
}

export function wsNotesRef(workspaceId: string) {
  return collection(db, "users", workspaceId, "notes");
}

export function wsNoteRef(workspaceId: string, id: string) {
  return doc(db, "users", workspaceId, "notes", id);
}

export function wsPaymentsRef(workspaceId: string) {
  return collection(db, "users", workspaceId, "payments");
}

export function wsPaymentRef(workspaceId: string, id: string) {
  return doc(db, "users", workspaceId, "payments", id);
}

export function wsDocumentsRef(workspaceId: string) {
  return collection(db, "users", workspaceId, "documents");
}

export function wsDocumentRef(workspaceId: string, id: string) {
  return doc(db, "users", workspaceId, "documents", id);
}

export function wsActivityRef(workspaceId: string) {
  return collection(db, "users", workspaceId, "activity");
}

export function wsNotificationsRef(workspaceId: string) {
  return collection(db, "users", workspaceId, "notifications");
}

export function wsBackupsRef(workspaceId: string) {
  return collection(db, "users", workspaceId, "backups");
}

export function wsTeamRef(workspaceId: string) {
  return collection(db, "users", workspaceId, "team");
}

export function userProfileRef(uid: string) {
  return doc(db, "users", uid);
}

/** @deprecated use ws* with workspaceId */
export const userDocRef = userProfileRef;
export const userClientsRef = wsClientsRef;
export const userClientRef = wsClientRef;
export const userTasksRef = wsTasksRef;
export const userTaskRef = wsTaskRef;
export const userNotesRef = wsNotesRef;
export const userNoteRef = wsNoteRef;
export const userPaymentsRef = wsPaymentsRef;
export const userPaymentRef = wsPaymentRef;
