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
    <Route id="404" path="*" lazy={() => import("@/pages/not-fount/route")} />

    {/* Guest Pages */}
    <Route
      id="guest_layout"
      lazy={() => import("@/components/layout/GuestLayout")}
    >
      <Route
        id="login"
        path="login"
        lazy={() => import("@/pages/login/route")}
      />
    </Route>

    {/* Auth Pages */}
    <Route
      id="auth_layout"
      lazy={() => import("@/components/layout/AuthLayout")}
    >
      <Route
        id="dashboard"
        path="dashboard"
        lazy={() => import("@/pages/dashboard/route")}
      />
      <Route
        id="overtime"
        path="overtime"
        lazy={() => import("@/pages/overtime/route")}
      />
    </Route>

    {/* No */}
    <Route id="lab" path="lab" lazy={() => import("@/pages/lab/route")} />
    <Route id="home" index lazy={() => import("@/pages/home/route")} />
    <Route
      id="minesweeper"
      path="minesweeper"
      lazy={() => import("@/pages/minesweeper/route")}
    />
    <Route
      id="calendar"
      path="calendar"
      lazy={() => import("@/pages/calendar/Component")}
    />
  </Route>,
);
