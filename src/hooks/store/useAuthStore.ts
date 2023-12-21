// Firebase Imports
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/api/firebase";

// Zustand Imports
import { create } from "zustand";

// React Imports
import React from "react";
import { useShallow } from "zustand/react/shallow";

export const useAuthStore = create<AuthStore>((set) => {
  return {
    lastUpdateAt: Date.now(),
    setLastUpdateAt(lastUpdateAt) {
      return set({ lastUpdateAt });
    },
  };
});

export function useAuth() {
  const { lastUpdateAt, setLastUpdateAt } = useAuthStore(
    useShallow((store) => {
      return {
        lastUpdateAt: store.lastUpdateAt,
        setLastUpdateAt: store.setLastUpdateAt,
      };
    })
  );

  const auth = React.useMemo(() => {
    void lastUpdateAt;
    return getAuth(app);
  }, [lastUpdateAt]);

  React.useEffect(() => {
    return onAuthStateChanged(getAuth(app), () => {
      setLastUpdateAt(Date.now());
    });
  }, [setLastUpdateAt]);

  return auth;
}

export interface AuthStore {
  lastUpdateAt: number;
  setLastUpdateAt(lastUpdateAt: number): void;
}
