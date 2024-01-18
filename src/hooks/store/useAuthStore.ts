// React Imports
import React from "react";

// Firebase Imports
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/api/firebase";

// Zustand Imports
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

export function useAuth() {
  const { updateAt, setUpdateAt } = useAuthStore(
    useShallow((store) => {
      return {
        updateAt: store.updateAt,
        setUpdateAt: store.setUpdateAt,
      };
    })
  );

  const auth = React.useMemo(() => {
    void updateAt;
    return getAuth(app);
  }, [updateAt]);

  React.useEffect(() => {
    return onAuthStateChanged(getAuth(app), () => {
      setUpdateAt(Date.now());
    });
  }, [setUpdateAt]);

  return [auth, setUpdateAt] as [typeof auth, typeof setUpdateAt];
}

export const useAuthStore = create<AuthStore>((set, get) => {
  return {
    updateAt: 0,
    setUpdateAt(action) {
      return set({
        updateAt:
          typeof action === "function" ? action(get().updateAt) : action,
      });
    },
  };
});

export interface AuthStore {
  updateAt: number;
  setUpdateAt: React.Dispatch<React.SetStateAction<number>>;
}
