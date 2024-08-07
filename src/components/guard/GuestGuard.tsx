import React from "react";
import { useAuth } from "@/hooks/api-firebase/useAuth";
import { Loading } from "./Loading";
import { NavigateToHome } from "./NavigateToHome";

export function GuestGuard(props: React.PropsWithChildren) {
  const query = useAuth();

  if (query.isPending) {
    return <Loading />;
  }

  if (query.isError) {
    return props.children;
  }

  if (query.data.currentUser) {
    return <NavigateToHome />;
  }

  return props.children;
}
