import React from "react";
import { authReady } from "@/api/firebase/app";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { Loading } from "./Loading";
import { NavigateToLogin } from "./NavigateToLogin";

export function AuthGuard(props: React.PropsWithChildren) {
  return (
    <React.Suspense fallback={<Loading />}>
      <Content>{props.children}</Content>
    </React.Suspense>
  );
}

function Content(props: React.PropsWithChildren) {
  React.use(authReady);
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return <NavigateToLogin />;
  }

  return props.children;
}
