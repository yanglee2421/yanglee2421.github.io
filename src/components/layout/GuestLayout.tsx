import React from "react";
import { authReady } from "@/api/firebase/app";

export const GuestLayout = React.lazy(async () => {
  await authReady;
  const { GuestGuard } = await import("@/components/guard/GuestGuard");
  return {
    default(props: React.PropsWithChildren) {
      return <GuestGuard>{props.children}</GuestGuard>;
    },
  };
});
