import React from "react";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { NavigateToLogin } from "./NavigateToLogin";
import { useQuery } from "@tanstack/react-query";
import { authReady } from "@/api/query/firebase";

export function AuthGuard(props: React.PropsWithChildren) {
  const currentUser = useCurrentUser();

  const query = useQuery(authReady);

  if (query.isPending) {
    return <p>loading...</p>;
  }

  if (!currentUser) {
    return <NavigateToLogin />;
  }

  return props.children;
}
