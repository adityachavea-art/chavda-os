"use client";

import { AlertTriangle, ExternalLink } from "lucide-react";
import { useFirestoreStatus } from "@/contexts/FirestoreContext";
import { BRAND } from "@/lib/branding";

const RULES_URL =
  "https://console.firebase.google.com/project/chavda-os/firestore/rules";

export default function FirestoreSetupBanner() {
  const { permissionError } = useFirestoreStatus();

  if (!permissionError) return null;

  return (
    <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 sm:p-5">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-amber-200">
            Firestore rules not published
          </p>
          <p className="mt-1 text-sm leading-relaxed text-amber-100/80">
            {BRAND.appName} is connected to Firebase project{" "}
            <strong>chavda-os</strong>, but security rules are blocking
            reads/writes. Publish rules once:
          </p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-amber-100/80">
            <li>
              Run in terminal:{" "}
              <code className="rounded bg-black/30 px-1.5 py-0.5 text-xs">
                npm run firestore:deploy
              </code>{" "}
              (after{" "}
              <code className="rounded bg-black/30 px-1.5 py-0.5 text-xs">
                npx firebase login
              </code>
              )
            </li>
            <li>
              Or paste <code className="text-xs">firestore.rules</code> in
              Firebase Console and click Publish
            </li>
          </ol>
          <a
            href={RULES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400"
          >
            Open Firebase Rules
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
