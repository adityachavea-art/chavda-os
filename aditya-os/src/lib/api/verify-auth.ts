import { NextRequest } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";

export async function verifyRequestUser(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { error: "Unauthorized", status: 401 as const };
  }
  const token = authHeader.slice(7);
  const adminAuth = getAdminAuth();
  if (!adminAuth) {
    return { error: "Admin SDK not configured", status: 503 as const };
  }
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return { uid: decoded.uid };
  } catch {
    return { error: "Invalid token", status: 401 as const };
  }
}
