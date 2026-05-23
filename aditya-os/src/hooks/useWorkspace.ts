"use client";

import { useAuth, useActor } from "@/contexts/AuthContext";
import { useWorkspaceData } from "@/hooks/useWorkspaceData";

export function useWorkspace() {
  const { user, profile, workspaceId, loading: authLoading } = useAuth();
  const actor = useActor();
  const data = useWorkspaceData(workspaceId);

  return {
    user,
    profile,
    workspaceId,
    actor,
    authLoading,
    ...data,
  };
}
