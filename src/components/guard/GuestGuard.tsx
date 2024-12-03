import React from "react";
import { authReady } from "@/api/query/firebase";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "@mui/material";
import { Navigate, useSearchParams } from "react-router";

const HOMEPATH = "/";

export function GuestGuard(props: React.PropsWithChildren) {
  const currentUser = useCurrentUser();
  const query = useQuery(authReady);

  if (query.isPending) {
    return <Typography sx={{ textAlign: "center" }}>Loading...</Typography>;
  }

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
