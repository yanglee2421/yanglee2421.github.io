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
      path="*"
      loader={() => {
        throw new Response("Error: No route matches URL", {
          status: 404,
          statusText: "Not Found",
        });
      }}
      shouldRevalidate={() => false}
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
    <Route
      id="with-appbar"
      lazy={async () => {
        const { Layout } = await import("@/components/layout/Layout");

        return {
          Component: Layout,
        };
      }}
    >
      <Route id="home" index lazy={() => import("@/pages/home/Component")} />
      <Route
        id="charts"
        path="charts"
        lazy={() => import("@/pages/charts/Component")}
      />
    </Route>
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
    <Route
      id="calendar"
      path="calendar"
      lazy={() => import("@/pages/calendar/Component")}
    />
    <Route
      id="decimal"
      path="decimal"
      lazy={() => import("@/pages/decimal/route")}
    />
  </Route>,
);
