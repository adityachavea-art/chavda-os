"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface FirestoreContextValue {
  permissionError: boolean;
  setPermissionError: (v: boolean) => void;
}

const FirestoreContext = createContext<FirestoreContextValue | null>(null);

export function FirestoreProvider({ children }: { children: ReactNode }) {
  const [permissionError, setPermissionError] = useState(false);

  return (
    <FirestoreContext.Provider
      value={{ permissionError, setPermissionError }}
    >
      {children}
    </FirestoreContext.Provider>
  );
}

export function useFirestoreStatus() {
  const ctx = useContext(FirestoreContext);
  if (!ctx) throw new Error("useFirestoreStatus requires FirestoreProvider");
  return ctx;
}
