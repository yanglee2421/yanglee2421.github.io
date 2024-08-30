import React from "react";
import { authReady, auth } from "@/api/firebase/auth";
import { Loading } from "./Loading";
import { NavigateToHome } from "./NavigateToHome";

export function GuestGuard(props: React.PropsWithChildren) {
  return (
    <React.Suspense fallback={<Loading />}>
      <Content>{props.children}</Content>
    </React.Suspense>
  );
}

function Content(props: React.PropsWithChildren) {
  React.use(authReady);
  const currentUser = React.useSyncExternalStore(
    (onStateChange) => {
      return auth.onAuthStateChanged(onStateChange);
    },
    () => auth.currentUser,
    () => null,
  );

  if (!currentUser) {
    return props.children;
  }

  return <NavigateToHome />;
}
