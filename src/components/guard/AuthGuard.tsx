import React from "react";

import { useAuthStore } from "@/hooks/store/useAuthStore";

import { LoginRoute } from "./LoginRoute";

export function AuthGuard(props: React.PropsWithChildren) {
  const authValue = useAuthStore((s) => s.value);

  if (authValue.auth.currentUser) {
    return props.children;
  }

  return <LoginRoute></LoginRoute>;
}
