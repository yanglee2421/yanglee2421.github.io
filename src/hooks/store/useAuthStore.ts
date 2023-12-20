// Firebase Imports
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/api/firebase";

// React Imports
import React from "react";

export function useAuthStore() {
  const [uid, setUid] = React.useState("");

  const auth = React.useMemo(() => getAuth(app), [uid]);

  React.useEffect(() => {
    return onAuthStateChanged(getAuth(app), (user) => {
      setUid(user?.uid || "");
    });
  }, [setUid]);

  return auth;
}
