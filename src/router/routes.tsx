// Router Imports
import { Navigate, RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "",
    async lazy() {
      const { RootRoute } = await import("./RootRoute");

      return {
        Component: RootRoute,
        // errorElement: <Navigate to="/500" replace />,
      };
    },
    children: [
      { path: "*", element: <Navigate to="/404" replace /> },
      {
        id: "401",
        path: "401",
        handle: {
          title: "401 Unauthorized",
          auth: "guest",
        },
        async lazy() {
          const { Unauthorized } = await import("@/pages/401");

          return {
            Component: Unauthorized,
          };
        },
      },
      {
        id: "403",
        path: "403",
        handle: {
          title: "403 Forbidden",
          auth: "auth",
        },
        async lazy() {
          const { Forbidden } = await import("@/pages/403");

          return {
            Component: Forbidden,
          };
        },
      },
      {
        id: "404",
        path: "404",
        handle: {
          title: "404 Not Found",
          auth: "none",
        },
        async lazy() {
          const { NotFound } = await import("@/pages/404");

          return {
            Component: NotFound,
          };
        },
      },
      {
        id: "500",
        path: "500",
        handle: {
          title: "500 Internal Server Error",
          auth: "none",
        },
        async lazy() {
          const { InternalServerError } = await import("@/pages/500");

          return {
            Component: InternalServerError,
          };
        },
      },

      // Guest pages
      {
        id: "forgot-passwd",
        path: "forgot-passwd",
        handle: {
          title: "Forgot Password",
          auth: "guest",
        },
        lazy() {
          return import("@/pages/forgot-passwd");
        },
      },
      {
        id: "register",
        path: "register",
        handle: {
          title: "Register",
          auth: "guest",
        },
        lazy() {
          return import("@/pages/register");
        },
      },

      {
        id: "privacy-policy",
        path: "privacy-policy",
        handle: {
          title: "Privacy Policy",
          auth: "none",
        },
        lazy() {
          return import("@/pages/privacy-policy");
        },
      },

      // With App Bar
      {
        id: "with-appbar",
        path: "",
        async lazy() {
          const { Layout } = await import("@/layout");

          return {
            Component: Layout,
          };
        },
        children: [
          {
            id: "home",
            index: true,
            handle: {
              title: "首页",
              auth: "auth",
            },
            lazy() {
              return import("@/pages/home");
            },
          },
          {
            id: "account",
            path: "account",
            handle: { title: "Account" },
            lazy() {
              return import("@/pages/account");
            },
          },
          {
            id: "picture",
            path: "picture",
            handle: { title: "Picture" },
            lazy() {
              return import("@/pages/picture");
            },
          },

          // ** Form
          {
            id: "input",
            path: "input",
            handle: { title: "Input" },
            lazy() {
              return import("@/pages/input");
            },
          },
          {
            id: "upload",
            path: "upload",
            handle: { title: "Upload Image" },
            lazy() {
              return import("@/pages/upload");
            },
          },
          {
            id: "autocomplete",
            path: "autocomplete",
            handle: { title: "AutoComplete" },
            lazy() {
              return import("@/pages/autocomplete");
            },
          },
          {
            id: "tinymce",
            path: "tinymce",
            handle: { title: "TinyMCE" },
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
            handle: { title: "Virtualized List" },
            lazy() {
              return import("@/pages/virtualized-list");
            },
          },

          // ** Lab
          {
            id: "transition",
            path: "transition",
            handle: { title: "Transition" },
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
            handle: "Swiper",
            async lazy() {
              const { SwiperPage } = await import("@/pages/swiper");

              return {
                Component: SwiperPage,
              };
            },
          },

          // ** Charts
          {
            id: "charts",
            path: "charts",
            handle: { title: "Charts" },
            lazy() {
              return import("@/pages/charts");
            },
          },
          {
            id: "toast",
            path: "toast",
            handle: { title: "Toast" },
            async lazy() {
              const { Toast } = await import("@/pages/toast");

              return {
                Component: Toast,
              };
            },
          },
        ],
      },

      // Without App Bar
      {
        id: "blank",
        path: "blank",
        handle: { title: "blank" },
        lazy() {
          return import("@/pages/blank");
        },
      },
    ],
  },
];
