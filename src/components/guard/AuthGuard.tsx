import React from "react";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import { authReady } from "@/api/query/firebase";
import { Typography } from "@mui/material";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";

const LOGINPATH = "/login";

export function AuthGuard(props: React.PropsWithChildren) {
  const currentUser = useCurrentUser();
  const query = useQuery(authReady);

  if (query.isPending) {
    return <Typography sx={{ textAlign: "center" }}>Loading...</Typography>;
  }

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
