// NProgress Imports
import NProgress from "nprogress";

// Router Imports
import { useMatches, Navigate, useOutlet } from "react-router-dom";

// React Imports
import React from "react";

// Store Imports
import { useAuth } from "@/hooks/store";

// Acl Imports
import { defineAbilityFor, AclContext } from "@/configs/acl";

// Components Imports
import { HomeRoute } from "./HomeRoute";
import { LoginRoute } from "./LoginRoute";

export function RootRoute() {
  const matches = useMatches();
  const outlet = useOutlet();
  const [auth] = useAuth();
  const acl = defineAbilityFor(auth.currentUser ? "admin" : "");

  React.useEffect(() => {
    NProgress.done();

    const destructor = () => {
      NProgress.start();
    };

    const currentRoute = matches[matches.length - 1];

    if (!currentRoute) {
      return destructor;
    }

    const title = Reflect.get(Object(currentRoute.handle), "title");

    if (!title) {
      return destructor;
    }

    if (typeof title === "string") {
      document.title = title;
    }

    return destructor;
  }, [matches]);

  return (
    <AclContext.Provider value={acl}>
      {(() => {
        const currentRoute = matches[matches.length - 1];

        if (!currentRoute) {
          return null;
        }

        switch (Reflect.get(Object(currentRoute.handle), "auth")) {
          case "none":
            return outlet;

          case "guest":
            return auth.currentUser ? <HomeRoute /> : outlet;

          case "auth":
          default:
            // Not logged in
            if (!auth.currentUser) {
              return <LoginRoute />;
            }

            // Authorized pass
            if (
              acl.can(
                String(
                  Reflect.get(Object(currentRoute.handle), "aclAction") ||
                    "read"
                ),
                String(
                  Reflect.get(Object(currentRoute.handle), "aclSubject") ||
                    "fallback"
                )
              )
            ) {
              return outlet;
            }

            // Not authorized
            return <Navigate to="/403" />;
        }
      })()}
    </AclContext.Provider>
  );
}
