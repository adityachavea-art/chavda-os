"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ensureUserWorkspace, getUserProfile } from "@/lib/services/user";
import { getWorkspaceId } from "@/lib/workspace";
import type { UserProfile } from "@/lib/types";

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  workspaceId: string | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    if (!user) return;
    const p = await getUserProfile(user.uid);
    setProfile(p);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          await u.getIdToken(true);
          const p = await ensureUserWorkspace(
            u.uid,
            u.email,
            u.displayName
          );
          setProfile(p);
        } catch (e) {
          console.error("[Auth]", e);
          const p = await getUserProfile(u.uid);
          setProfile(p);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const workspaceId = useMemo(() => {
    if (!user) return null;
    return getWorkspaceId(user.uid, profile);
  }, [user, profile]);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        workspaceId,
        loading,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function useActor() {
  const { user } = useAuth();
  return {
    uid: user?.uid ?? "",
    email: user?.email ?? undefined,
  };
}
