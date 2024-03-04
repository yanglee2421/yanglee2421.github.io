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
        id: "signin",
        path: "signin",
        lazy() {
          return import("@/pages/signin/Component");
        },
      },
      {
        id: "signup",
        path: "signup",
        lazy() {
          return import("@/pages/signup/Component");
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
        ],
      },

      {
        id: "newtab",
        path: "newtab",
        lazy() {
          return import("@/pages/newtab/Component");
        },
      },
    ],
  },
];
