import React from "react";
import { useCurrentUser } from "@/hooks/store/useCurrentUser";
import { NavigateToLogin } from "./NavigateToLogin";

export function AuthGuard(props: React.PropsWithChildren) {
  const currentUser = useCurrentUser();

  if (currentUser) {
    return props.children;
  }

  return <NavigateToLogin />;
}
