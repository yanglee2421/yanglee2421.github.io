import React from "react";
import { useCurrentUser } from "@/hooks/store/useCurrentUser";
import { NavigateToHome } from "./NavigateToHome";

export function GuestGuard(props: React.PropsWithChildren) {
  const currentUser = useCurrentUser();

  if (currentUser) {
    return <NavigateToHome />;
  }

  return props.children;
}
