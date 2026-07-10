import { auth, authReady } from "@/api/firebase/app";
import React from "react";

export const useCurrentUser = () => {
  React.use(authReady);

  return React.useSyncExternalStore(
    (onStateChange) => auth.onIdTokenChanged(onStateChange),
    () => auth.currentUser,
  );
};
