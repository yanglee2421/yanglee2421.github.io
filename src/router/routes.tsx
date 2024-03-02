import { RouteObject } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";

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
        async lazy() {
          const { Unauthorized } = await import("@/pages/login/Unauthorized");

          return {
            Component: Unauthorized,
          };
        },
      },
      {
        id: "forgot-passwd",
        path: "forgot-passwd",
        lazy() {
          return import("@/pages/forgot-passwd");
        },
      },
      {
        id: "register",
        path: "register",
        lazy() {
          return import("@/pages/register");
        },
      },
      {
        id: "privacy-policy",
        path: "privacy-policy",
        lazy() {
          return import("@/pages/privacy-policy");
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
            async lazy() {
              const { Home } = await import("@/pages/home");

              return {
                Component: Home,
              };
            },
          },
          {
            id: "account",
            path: "account",
            lazy() {
              return import("@/pages/account");
            },
          },
          {
            id: "picture",
            path: "picture",
            lazy() {
              return import("@/pages/picture");
            },
          },

          // ** Form
          {
            id: "input",
            path: "input",
            lazy() {
              return import("@/pages/input");
            },
          },
          {
            id: "autocomplete",
            path: "autocomplete",
            lazy() {
              return import("@/pages/autocomplete");
            },
          },
          {
            id: "tinymce",
            path: "tinymce",
            lazy() {
              return import("@/pages/tinymce");
            },
          },

          // ** Table
          {
            id: "table",
            path: "table",
            async lazy() {
              const { Table } = await import("@/pages/table");
              return {
                Component: Table,
              };
            },
          },

          // ** List
          {
            id: "virtualized-list",
            path: "virtualized-list",
            lazy() {
              return import("@/pages/virtualized-list");
            },
          },

          // ** Lab
          {
            id: "transition",
            path: "transition",
            async lazy() {
              const { Transition } = await import("@/pages/transition");

              return {
                Component: Transition,
              };
            },
          },
          {
            id: "swiper",
            path: "swiper",
            async lazy() {
              const { SwiperPage } = await import("@/pages/swiper");

              return {
                Component: SwiperPage,
              };
            },
          },
          {
            id: "charts",
            path: "charts",
            lazy() {
              return import("@/pages/charts");
            },
          },
          {
            id: "toast",
            path: "toast",
            async lazy() {
              const { Toast } = await import("@/pages/toast");

              return {
                Component: Toast,
              };
            },
          },
        ],
      },

      {
        id: "blank",
        path: "blank",
        lazy() {
          return import("@/pages/blank");
        },
      },
    ],
  },
];
