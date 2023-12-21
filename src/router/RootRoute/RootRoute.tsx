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
import { whitelist } from "./whitelist";

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

    // Login page
    if (currentRoute.id === "login") {
      const returnURL = searchParams.get("returnURL") || "/";
      return auth.currentUser ? <Navigate to={returnURL} replace /> : outlet;
    }

    // Register page
    if (currentRoute.id === "register") {
      const returnURL = searchParams.get("returnURL") || "/";
      return auth.currentUser ? <Navigate to={returnURL} replace /> : outlet;
    }

    // Whitelist
    if (whitelist.has(currentRoute.id)) {
      return outlet;
    }

    // Has Logged
    if (auth.currentUser) {
      // const hasPermission = acl.can("read", `page-${currentRoute.id}`);
      // return hasPermission ? outlet : <Navigate to={"/401"} replace />;
      return outlet;
    }

    // Not Logged
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("returnURL", currentRoute.pathname);
    const query = urlSearchParams.toString();
    const isGoHome = currentRoute.id === "home";
    const search = isGoHome ? void 0 : query;
    const to = { pathname: "/login", search };

    return <Navigate to={to} replace />;
  }, [matches, searchParams, outlet, auth.currentUser]);

  useNProgress();
  useRouteTitle();

  return (
    <AclContext.Provider value={defineAbilityFor("")}>
      {routeNode}
    </AclContext.Provider>
  );
}
