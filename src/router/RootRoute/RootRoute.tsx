// Hooks Imports
import { useRouteTitle } from "./useRouteTitle";
import { useNProgress } from "./useNProgress";

// Router Imports
import {
  useMatches,
  useSearchParams,
  Navigate,
  useOutlet,
} from "react-router-dom";

// React Imports
import React from "react";

// Store Imports
import { useAuth } from "@/hooks/store";

// Acl Imports
import { defineAbilityFor, AclContext } from "@/configs/acl";

export function RootRoute() {
  // Router Hooks
  const outlet = useOutlet();
  const matches = useMatches();
  const [searchParams] = useSearchParams();

  const auth = useAuth();

  const routeNode = React.useMemo(() => {
    const currentRoute = matches[matches.length - 1];

    if (!currentRoute) {
      console.error("currentRoute is falsy");

      return null;
    }

    switch (Reflect.get(Object(currentRoute.handle), "auth")) {
      case "guest": {
        const returnURL = searchParams.get("returnURL") || "/";
        return auth.currentUser ? <Navigate to={returnURL}></Navigate> : outlet;
      }

      case "none":
        return outlet;

      case "auth":
      default: {
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.set("returnURL", currentRoute.pathname);
        const query = urlSearchParams.toString();
        const isGoHome = currentRoute.id === "home";
        const search = isGoHome ? void 0 : query;
        const to = { pathname: "/login", search };

        return auth.currentUser ? (
          outlet
        ) : (
          <Navigate to={to} replace></Navigate>
        );
      }
    }
  }, [matches, searchParams, outlet, auth.currentUser]);

  useNProgress();
  useRouteTitle();

  return (
    <AclContext.Provider value={defineAbilityFor("")}>
      {routeNode}
    </AclContext.Provider>
  );
}
