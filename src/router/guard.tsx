import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { useLocalStore } from "@/hooks/store/useLocalStore";
import { fetchUserByFirebase, netlify } from "@/api/netlify";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { NavigateToHome, NavigateToLogin } from "./nav";

export const GuestGuard = () =>
  useCurrentUser() ? <NavigateToHome /> : <Outlet />;

export const AuthGuard = () => {
  const user = useCurrentUser();
  const netlifyToken = useLocalStore((s) => s.netlifyToken);
  const setNetlifyToken = useLocalStore.setState;

  const auth = useQuery({
    ...fetchUserByFirebase({
      data: {
        firebaseId: user?.uid || "",
        name: user?.displayName || "",
      },
    }),
    enabled: !!user?.uid,
  });

  React.useInsertionEffect(() => {
    if (!auth.data?.data.token) return;
    setNetlifyToken({ netlifyToken: auth.data.data.token });
  }, [auth.data?.data.token]);

  React.useInsertionEffect(() => {
    if (!netlifyToken) return;

    const id = netlify.interceptors.request.use((config) => {
      config.headers.setAuthorization(`Bearer ${netlifyToken}`, false);
      return config;
    });

    return () => {
      netlify.interceptors.request.eject(id);
    };
  }, [netlifyToken]);

  return user ? <Outlet /> : <NavigateToLogin />;
};
