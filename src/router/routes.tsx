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
        handle: {
          title: "Login",
          auth: "guest",
        },
        async lazy() {
          const { Unauthorized } = await import("@/pages/login/Unauthorized");

          return {
            Component: Unauthorized,
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
            handle: { title: "Swiper" },
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
