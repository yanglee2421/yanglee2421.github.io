// NProgress Imports
import NProgress from "nprogress";
// import "nprogress/nprogress.css";

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
  const outlet = useOutlet();
  const matches = useMatches();
  const [searchParams] = useSearchParams();
  const auth = useAuth();

  const routeNode = React.useMemo(() => {
    const currentRoute = matches[matches.length - 1];

    if (!currentRoute) return null;

    switch (Reflect.get(Object(currentRoute.handle), "auth")) {
      case "guest": {
        const returnURL = searchParams.get("returnURL") || "/";
        return auth.currentUser ? <Navigate to={returnURL} replace /> : outlet;
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

        return auth.currentUser ? outlet : <Navigate to={to} replace />;
      }
    }
  }, [matches, searchParams, outlet, auth.currentUser]);

  React.useEffect(() => {
    void matches;
    NProgress.done();
    return () => {
      NProgress.start();
    };
  }, [matches]);

  React.useEffect(() => {
    const currentRoute = matches[matches.length - 1];

    if (!currentRoute) return;

    const title = Reflect.get(Object(currentRoute.handle), "title");

    if (!title) return;

    if (typeof title === "string") {
      document.title = title;
    }
  }, [matches]);

  return (
    <AclContext.Provider value={defineAbilityFor("")}>
      {routeNode}
    </AclContext.Provider>
  );
}
