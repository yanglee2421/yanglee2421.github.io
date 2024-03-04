import { ErrorBoundary } from "./ErrorBoundary";

import type { RouteObject } from "react-router-dom";


export const routes: RouteObject[] = [
  {
    id: "root",
    ErrorBoundary,
    async lazy() {
      const { RootRoute } = await import("./RootRoute");

      return {
        Component: RootRoute,
      };
    },
    children: [
      {
        id: "login",
        path: "login",
        lazy() {
          return import("@/pages/login/Component");
        },
      },
      {
        id: "forgot-password",
        path: "forgot-password",
        lazy() {
          return import("@/pages/forgot-password/Component");
        },
      },
      {
        id: "register",
        path: "register",
        lazy() {
          return import("@/pages/register/Component");
        },
      },

      // With App Bar
      {
        id: "with-appbar",
        async lazy() {
          const { Layout } = await import("@/components/layout/Layout");

          return {
            Component: Layout,
          };
        },
        children: [
          {
            id: "home",
            index: true,
            lazy() {
              return import("@/pages/home/Component");
            },
          },
          {
            id: "charts",
            path: "charts",
            lazy() {
              return import("@/pages/charts/Component");
            },
          },
        ],
      },

      {
        id: "blank",
        path: "blank",
        lazy() {
          return import("@/pages/blank/Component");
        },
      },
    ],
  },
];
