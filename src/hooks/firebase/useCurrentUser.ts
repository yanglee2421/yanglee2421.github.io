import React from "react";
import { auth } from "@/api/firebase/app";

export const useCurrentUser = () =>
  React.useSyncExternalStore(
    (onStateChange) => auth.onIdTokenChanged(onStateChange),
    () => auth.currentUser,
    () => null,
  );
