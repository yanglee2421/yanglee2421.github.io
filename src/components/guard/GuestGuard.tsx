import React from "react";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import { HomeRoute } from "./HomeRoute";

export function GuestGuard(props: React.PropsWithChildren) {
  const authValue = useAuthStore((s) => s.value);

  if (authValue.auth.currentUser) {
    return <HomeRoute></HomeRoute>;
  }

  return props.children;
}
