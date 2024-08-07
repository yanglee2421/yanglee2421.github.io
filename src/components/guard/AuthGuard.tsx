import React from "react";
import { useAuth } from "@/hooks/api-firebase/useAuth";
import { Loading } from "./Loading";
import { NavigateToLogin } from "./NavigateToLogin";

export function AuthGuard(props: Props) {
  const query = useAuth();

  if (query.isPending) {
    return <Loading />;
  }

  if (query.isError) {
    return <NavigateToLogin />;
  }

  if (query.data.currentUser) {
    return props.children;
  }

  return <NavigateToLogin />;
}

type Props = React.PropsWithChildren & {
  fallback?: React.ReactNode;
};
