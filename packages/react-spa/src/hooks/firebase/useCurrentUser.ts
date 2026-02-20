import React from "react";
import { auth, authReady } from "@/api/firebase/app";

export const useCurrentUser = () => {
  React.use(authReady);
  return React.useSyncExternalStore(
    (onStateChange) => auth.onIdTokenChanged(onStateChange),
    () => auth.currentUser,
    () => null,
  );
};
