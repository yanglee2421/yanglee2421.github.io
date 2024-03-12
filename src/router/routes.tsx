import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    id: "root",
    async lazy() {
      const { ErrorBoundary } = await import("./ErrorBoundary");
      const { RootRoute } = await import("./RootRoute");

      return {
        ErrorBoundary,
        Component: RootRoute,
      };
    },
    children: [
      {
        path: "*",
        Component() {
          return null;
        },
        loader() {
          throw new Response("Error: No route matches URL", {
            status: 404,
            statusText: "Not Found",
          });
        },
        shouldRevalidate() {
          return false;
        },
      },
      {
        id: "login",
        path: "login",
        lazy() {
          return import("@/pages/login/Component");
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
          {
            id: "table",
            path: "table",
            lazy() {
              return import("@/pages/table/Component");
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
        id: "newtab",
        path: "newtab",
        lazy() {
          return import("@/pages/newtab/Component");
        },
      },
    ],
  },
];
