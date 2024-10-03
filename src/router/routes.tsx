import { createRoutesFromElements, Route } from "react-router-dom";

export const routes = createRoutesFromElements(
  <Route
    id="root"
    path=":lang?"
    lazy={async () => {
      const { RootRoute } = await import("./RootRoute");

      return {
        Component: RootRoute,
      };
    }}
  >
    <Route
      id="404"
      path="*"
      lazy={() => import("@/pages/not-fount/Component")}
    />
    {/* Guest Pages */}
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

    {/* Auth Pages */}
    <Route
      id="AuthLayout"
      lazy={async () => {
        const { Layout } = await import("@/components/Layout");

        return { Component: Layout };
      }}
    >
      <Route id="home" index lazy={() => import("@/pages/home/Component")} />
      <Route
        id="account"
        path="account"
        lazy={() => import("@/pages/account/Component")}
      />
      <Route
        id="calendar"
        path="calendar"
        lazy={() => import("@/pages/calendar/Component")}
      />
      <Route
        id="charts"
        path="charts"
        lazy={() => import("@/pages/charts/Component")}
      />
      <Route
        id="table"
        path="table"
        lazy={() => import("@/pages/table/Component")}
      />
      <Route id="lab" path="lab" lazy={() => import("@/pages/lab/route")} />
      <Route
        id="overtime"
        path="overtime"
        lazy={() => import("@/pages/overtime/component")}
      />
    </Route>
  </Route>,
);
