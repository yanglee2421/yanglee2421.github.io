import { RouteObject } from "react-router";

export const routes: RouteObject[] = [{
  id: "root",
  path: ":lang?",
  async lazy() {
    const { RootRoute } = await import("./RootRoute");

    return {
      Component: RootRoute,
    };
  },
  children: [
    {
      id: "404",
      path: "*",
      lazy() {
        return import("@/pages/not-fount/route");
      },
    },
    {
      id: "guest_layout",
      lazy() {
        return import("@/components/layout/GuestLayout");
      },
      children: [
        {
          id: "login",
          path: "login",
          lazy: () => import("@/pages/login/route"),
        },
      ],
    },
    {
      id: "auth_layout",
      lazy: () => import("@/components/layout/AuthLayout"),
      children: [
        {
          id: "home",
          index: true,
          lazy: () => import("@/pages/home/route"),
        },
        {
          id: "dashboard",
          path: "dashboard",
          lazy: () => import("@/pages/dashboard/route"),
        },
        {
          id: "overtime",
          path: "overtime",
          lazy: () => import("@/pages/overtime/route"),
        },
        {
          id: "minesweeper",
          path: "minesweeper",
          lazy: () => import("@/pages/minesweeper/route"),
        },
        {
          id: "lab",
          path: "lab",
          lazy: () => import("@/pages/lab/route"),
        },
        {
          id: "calendar",
          path: "calendar",
          lazy: () => import("@/pages/calendar/Component"),
        },
      ],
    },
  ],
}];
