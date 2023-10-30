// Hooks Imports
import { useDocTitle } from "./use-doc-title";
import { useNprogress } from "./use-nprogress";

// API Imports
import { useLoginMe, useLogin } from "@/hooks";

// Router Imports
import {
  useMatches,
  useSearchParams,
  Navigate,
  useOutlet,
} from "react-router-dom";
import { toIsInWl } from "./router-whitelist";

// React Imports
import React from "react";

export function Component() {
  useDocTitle();
  useNprogress();
  useLoginMe();

  // Router Hooks
  const outlet = useOutlet();
  const matches = useMatches();
  const [searchParams] = useSearchParams();

  // Login Hooks
  const { usr } = useLogin();

  const routeNode = React.useMemo(() => {
    const nextRoute = matches[matches.length - 1];

    // To Login
    const isToLogin = nextRoute.id === "login";
    if (isToLogin) {
      const returnURL = searchParams.get("returnURL") || "/";
      return usr ? <Navigate to={returnURL} replace /> : outlet;
    }

    // To Whitelist
    const isInWhitelist = toIsInWl(nextRoute.id);
    if (isInWhitelist) return outlet;

    // Has Logged
    if (usr) return outlet;

    // Not Logged
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("returnURL", nextRoute.pathname);
    const query = urlSearchParams.toString();
    const isGoHome = nextRoute.id === "home";

    const to = {
      pathname: "/login",
      search: isGoHome ? void 0 : query,
    };

    return <Navigate to={to} replace />;
  }, [matches, searchParams, outlet, usr]);

  return <>{routeNode}</>;
}
