import React from "react";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { NavigateToLogin } from "./NavigateToLogin";

export function AuthGuard(props: React.PropsWithChildren) {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return <NavigateToLogin />;
  }

  return props.children;
}
