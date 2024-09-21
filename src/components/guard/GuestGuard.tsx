import React from "react";
import { authReady } from "@/api/firebase/app";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { NavigateToHome } from "./NavigateToHome";

export function GuestGuard(props: React.PropsWithChildren) {
  React.use(authReady);
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return props.children;
  }

  return <NavigateToHome />;
}
