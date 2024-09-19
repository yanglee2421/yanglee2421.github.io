import React from "react";
import { authReady } from "@/api/firebase/app";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { NavigateToLogin } from "./NavigateToLogin";

export function AuthGuard(props: React.PropsWithChildren) {
  React.use(authReady);
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return <NavigateToLogin />;
  }

  return props.children;
}
