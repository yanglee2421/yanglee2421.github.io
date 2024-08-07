import { useQuery } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import React from "react";
import { app } from "@/api/firebase/app";
import { useCurrentUser } from "@/hooks/store/useCurrentUser";
import { NavigateToHome } from "./NavigateToHome";

export function GuestGuard(props: React.PropsWithChildren) {
  const currentUser = useCurrentUser();

  const query = useQuery({
    queryKey: ["firebase/authStateReady"],
    async queryFn() {
      await getAuth(app).authStateReady();

      return getAuth(app);
    },
  });

  if (query.isPending) {
    return <div>loading...</div>;
  }

  if (query.isError) {
    return <div>{query.error.message}</div>;
  }

  if (currentUser) {
    return <NavigateToHome />;
  }

  return props.children;
}
