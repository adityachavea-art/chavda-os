#!/usr/bin/env node
/**
 * Deploy firestore.rules to project chavda-os.
 * Auth (pick one):
 *   1. npx firebase login  then: npm run firestore:deploy
 *   2. Set GOOGLE_APPLICATION_CREDENTIALS to service account JSON path
 */
import { readFileSync, existsSync } from "fs";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const projectId = "chavda-os";
const rulesPath = join(root, "firestore.rules");

async function deployWithGoogleAuth() {
  const { GoogleAuth } = await import("google-auth-library");
  const rulesContent = readFileSync(rulesPath, "utf8");

  const auth = new GoogleAuth({
    scopes: [
      "https://www.googleapis.com/auth/cloud-platform",
      "https://www.googleapis.com/auth/firebase",
    ],
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) throw new Error("No access token from service account");

  const headers = {
    Authorization: `Bearer ${token.token}`,
    "Content-Type": "application/json",
  };

  const rulesetRes = await fetch(
    `https://firebaserules.googleapis.com/v1/projects/${projectId}/rulesets`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        source: {
          files: [{ name: "firestore.rules", content: rulesContent }],
        },
      }),
    }
  );

  if (!rulesetRes.ok) {
    const err = await rulesetRes.text();
    throw new Error(`Ruleset create failed: ${rulesetRes.status} ${err}`);
  }

  const ruleset = await rulesetRes.json();
  const rulesetName = ruleset.name;

  const releaseRes = await fetch(
    `https://firebaserules.googleapis.com/v1/projects/${projectId}/releases`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: `projects/${projectId}/releases/cloud.firestore`,
        rulesetName,
      }),
    }
  );

  if (!releaseRes.ok) {
    const err = await releaseRes.text();
    throw new Error(`Release failed: ${releaseRes.status} ${err}`);
  }

  console.log("✓ Firestore rules deployed to", projectId);
}

function deployWithFirebaseCli() {
  execSync("npx firebase deploy --only firestore:rules --project chavda-os", {
    cwd: root,
    stdio: "inherit",
  });
  console.log("✓ Firestore rules deployed via Firebase CLI");
}

async function main() {
  const hasSa =
    process.env.GOOGLE_APPLICATION_CREDENTIALS &&
    existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS);

  if (hasSa) {
    await deployWithGoogleAuth();
    return;
  }

  try {
    deployWithFirebaseCli();
  } catch {
    console.error("\nFirestore rules were NOT deployed.\n");
    console.error("Option A — Firebase CLI:");
    console.error("  npx firebase login");
    console.error("  npm run firestore:deploy\n");
    console.error("Option B — Service account:");
    console.error("  Download key from Firebase Console → Project settings → Service accounts");
    console.error("  set GOOGLE_APPLICATION_CREDENTIALS=path\\to\\key.json");
    console.error("  npm run firestore:deploy\n");
    console.error("Option C — Manual:");
    console.error(
      `  Open https://console.firebase.google.com/project/${projectId}/firestore/rules`
    );
    console.error("  Paste contents of firestore.rules and click Publish\n");
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
