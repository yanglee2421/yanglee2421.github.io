import React from "react";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { authReady } from "@/api/firebase/app";
import { Navigate, useLocation, useSearchParams } from "react-router";

const LOGINPATH = "/login";

export function AuthGuard(props: React.PropsWithChildren) {
  const currentUser = useCurrentUser();
  React.use(authReady);

  if (!currentUser) {
    return <NavigateToLogin />;
  }

  return props.children;
}

export function NavigateToLogin() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  searchParams.set("redirect_uri", location.pathname);

  return (
    <Navigate
      to={{
        pathname: LOGINPATH,
        search: searchParams.toString(),
      }}
    />
  );
}
