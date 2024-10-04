import React from "react";
import { authReady } from "@/api/query/firebase";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { NavigateToHome } from "./NavigateToHome";
import { useQuery } from "@tanstack/react-query";

export function GuestGuard(props: React.PropsWithChildren) {
  const currentUser = useCurrentUser();
  const query = useQuery(authReady);

  if (query.isPending) {
    return <p>loading...</p>;
  }

  if (!currentUser) {
    return props.children;
  }

  return <NavigateToHome />;
}
