import type { UserProfile } from "@/lib/types";

export function getWorkspaceId(
  uid: string,
  profile?: UserProfile | null
): string {
  return profile?.workspaceOwnerId || uid;
}

export function canManageUsers(role: UserProfile["role"]) {
  return role === "admin";
}

export function canManageClients(role: UserProfile["role"]) {
  return role === "admin" || role === "staff";
}

export function canManageInvoices(role: UserProfile["role"]) {
  return role === "admin" || role === "accountant";
}

export function canManageCompliance(role: UserProfile["role"]) {
  return role === "admin" || role === "staff" || role === "accountant";
}
