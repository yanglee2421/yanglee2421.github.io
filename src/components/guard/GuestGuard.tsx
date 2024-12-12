import React from "react";
import { authReady } from "@/api/firebase/app";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { Navigate, useSearchParams } from "react-router";

const HOMEPATH = "/";

export function GuestGuard(props: React.PropsWithChildren) {
  const currentUser = useCurrentUser();
  React.use(authReady);

  if (!currentUser) {
    return props.children;
  }

  return <NavigateToHome />;
}

export function NavigateToHome() {
  const [searchParams] = useSearchParams();

  searchParams.delete("redirect_uri");

  return (
    <Navigate
      to={{
        pathname: searchParams.get("redirect_uri") || HOMEPATH,
        search: searchParams.toString(),
      }}
    />
  );
}
