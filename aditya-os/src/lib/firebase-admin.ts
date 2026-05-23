import {
  cert,
  getApps,
  initializeApp,
  type App,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "chavda-os";

function loadServiceAccount(): Record<string, string> | null {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    } catch {
      return null;
    }
  }
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_PATH) return null;
  try {
    const { readFileSync, existsSync } = require("fs") as typeof import("fs");
    const { resolve } = require("path") as typeof import("path");
    const path = resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
    if (!existsSync(path)) return null;
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

let adminApp: App | null = null;

export function getAdminApp(): App | null {
  if (getApps().length) return getApps()[0]!;
  const sa = loadServiceAccount();
  if (!sa) return null;
  adminApp = initializeApp({
    credential: cert(sa),
    projectId,
  });
  return adminApp;
}

export function getAdminDb() {
  const app = getAdminApp();
  if (!app) return null;
  return getFirestore(app);
}

export function getAdminAuth() {
  const app = getAdminApp();
  if (!app) return null;
  return getAuth(app);
}

export function adminEnabled() {
  return getAdminApp() !== null;
}
