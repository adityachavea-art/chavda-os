"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AppShell from "@/components/AppShell";
import AnimatedPage from "@/components/AnimatedPage";
import PageHeader from "@/components/ui/PageHeader";
import DataManager from "@/components/DataManager";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import RoleGuard from "@/components/auth/RoleGuard";
import { useAuth } from "@/contexts/AuthContext";
import { useWorkspace } from "@/hooks/useWorkspace";
import { updateUserProfile } from "@/lib/services/user";
import { inviteTeamMember, listTeam, removeTeamMember } from "@/lib/services/team";
import { BRAND } from "@/lib/branding";
import type { UserRole } from "@/lib/types";

export default function SettingsPage() {
  const { user, profile, refreshProfile } = useAuth();
  const { workspaceId, actor } = useWorkspace();
  const [team, setTeam] = useState<Awaited<ReturnType<typeof listTeam>>>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<UserRole>("staff");
  const [appName, setAppName] = useState(profile?.brandingAppName ?? BRAND.appName);

  useEffect(() => {
    if (workspaceId) void listTeam(workspaceId).then(setTeam);
  }, [workspaceId]);

  const firebaseOk =
    typeof window !== "undefined" &&
    Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);

  return (
    <AppShell>
      <AnimatedPage>
        <PageHeader
          badge={BRAND.appName}
          title="Settings"
          subtitle={`${BRAND.foundedBy} · Workspace configuration`}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card rounded-3xl p-6">
            <h2 className="font-bold">Profile</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Role: <span className="capitalize">{profile?.role ?? "admin"}</span>
            </p>
            <p className="text-sm text-zinc-500">{user?.email}</p>
            <Input
              label="Display app name"
              className="mt-4"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
            />
            <Button
              className="mt-4"
              onClick={async () => {
                if (!user) return;
                await updateUserProfile(user.uid, {
                  brandingAppName: appName,
                });
                await refreshProfile();
                toast.success("Saved");
              }}
            >
              Save branding
            </Button>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h2 className="font-bold">Firebase connection</h2>
            <div className="mt-4 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${firebaseOk ? "bg-emerald-400" : "bg-red-400"}`}
                />
                Client SDK: {firebaseOk ? "Configured" : "Missing env"}
              </p>
              <p className="text-zinc-500">
                Project: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "chavda-os"}
              </p>
              <p className="text-zinc-500">
                Storage: Firebase Storage enabled for documents
              </p>
            </div>
          </div>
        </div>

        <RoleGuard allowed={["admin"]}>
          <div className="glass-card mt-6 rounded-3xl p-6">
            <h2 className="font-bold">Team</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Invite staff or accountants to your workspace
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Input
                placeholder="email@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
              <Select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as UserRole)}
              >
                <option value="staff">Staff</option>
                <option value="accountant">Accountant</option>
                <option value="admin">Admin</option>
              </Select>
              <Button
                onClick={async () => {
                  if (!workspaceId || !inviteEmail) return;
                  await inviteTeamMember(
                    workspaceId,
                    { email: inviteEmail, role: inviteRole },
                    actor
                  );
                  setInviteEmail("");
                  setTeam(await listTeam(workspaceId));
                  toast.success("Invited — they must sign up with this email");
                }}
              >
                Invite
              </Button>
            </div>
            <ul className="mt-4 space-y-2">
              {team.map((m) => (
                <li
                  key={m.id}
                  className="flex items-center justify-between rounded-xl border border-white/5 px-4 py-2 text-sm"
                >
                  <span>
                    {m.email} · <span className="capitalize">{m.role}</span> ·{" "}
                    {m.status}
                  </span>
                  <button
                    type="button"
                    className="text-red-400"
                    onClick={async () => {
                      if (!workspaceId) return;
                      await removeTeamMember(workspaceId, m.id, actor);
                      setTeam(await listTeam(workspaceId));
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </RoleGuard>

        <div className="mt-6">
          <DataManager />
        </div>
      </AnimatedPage>
    </AppShell>
  );
}
