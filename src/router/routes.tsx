import { createRoutesFromElements, Route } from "react-router-dom";

export const routes = createRoutesFromElements(
  <Route
    id="root"
    lazy={async () => {
      const { ErrorBoundary } = await import("./ErrorBoundary");
      const { RootRoute } = await import("./RootRoute");

      return {
        ErrorBoundary,
        Component: RootRoute,
      };
    }}
  >
    <Route
      id="404"
      path="*"
      lazy={async () => {
        const { NotFound } = await import("./NotFound");

        return {
          Component: NotFound,
        };
      }}
    />
    <Route
      id="login"
      path="login"
      lazy={() => import("@/pages/login/Component")}
    />
    <Route
      id="signup"
      path="signup"
      lazy={() => import("@/pages/signup/Component")}
    />
    <Route
      id="forgot-password"
      path="forgot-password"
      lazy={() => import("@/pages/forgot-password/Component")}
    />
    <Route id="home" index lazy={() => import("@/pages/home/Component")} />
    <Route
      id="charts"
      path="charts"
      lazy={() => import("@/pages/charts/Component")}
    />
    <Route
      id="newtab"
      path="newtab"
      lazy={() => import("@/pages/newtab/Component")}
    />
    <Route
      id="table"
      path="table"
      lazy={() => import("@/pages/table/Component")}
    />
    <Route
      id="virtual"
      path="virtual"
      lazy={() => import("@/pages/virtual/Component")}
    />
  </Route>,
);
