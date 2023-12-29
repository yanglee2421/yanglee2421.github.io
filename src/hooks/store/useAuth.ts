// React Imports
import React from "react";

// Firebase Imports
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/api/firebase";

export function useAuth() {
  return React.useSyncExternalStore(
    (trigger) => {
      return onAuthStateChanged(getAuth(app), () => {
        trigger();

        state = {
          auth: getAuth(app),
        };
      });
    },
    () => {
      return getAuth(app);
    }
  );
}

let state = {
  auth: getAuth(app),
};
