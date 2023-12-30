// Router Imports
import { Navigate, RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "",
    async lazy() {
      const { RootRoute } = await import("./RootRoute");

      return {
        Component: RootRoute,
      };
    },
    children: [
      { path: "*", element: <Navigate to="/404" replace /> },
      {
        id: "401",
        path: "401",
        handle: {
          title: "Login",
          auth: "guest",
        },
        async lazy() {
          const { NotLogged } = await import("@/pages/401");
          return {
            Component: NotLogged,
          };
        },
      },
      {
        id: "403",
        path: "403",
        handle: {
          title: "403, Not authorization",
          auth: "none",
        },
        async lazy() {
          const { NotAuthorized } = await import("@/pages/403");
          return {
            Component: NotAuthorized,
          };
        },
      },
      {
        id: "404",
        path: "404",
        handle: {
          title: "404, NotFound",
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
          title: "500, System error",
          auth: "none",
        },
        async lazy() {
          const { SystemError } = await import("@/pages/500");
          return {
            Component: SystemError,
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
        lazy() {
          return import("@/layout/main");
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
            id: "data-grid",
            path: "data-grid",
            handle: { title: "Data Grid" },
            lazy() {
              return import("@/pages/data-grid");
            },
          },
          {
            id: "posthog-insights",
            path: "posthog-insights",
            handle: { title: "Posthog Insights" },
            lazy() {
              return import("@/pages/posthog-insights");
            },
          },
          {
            id: "posthog-events",
            path: "posthog-events",
            handle: { title: "Posthog Events" },
            lazy() {
              return import("@/pages/posthog-events");
            },
          },

          // ** List
          {
            id: "infinite-list",
            path: "infinite-list",
            handle: { title: "Infinite List" },
            lazy() {
              return import("@/pages/infinite-list");
            },
          },
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
            id: "fabric",
            path: "fabric",
            handle: { title: "fabric" },
            lazy() {
              return import("@/pages/fabric");
            },
          },
          {
            id: "menu",
            path: "menu",
            handle: { title: "Menu" },
            lazy() {
              return import("@/pages/menu");
            },
          },
          {
            id: "scrollbar",
            path: "scrollbar",
            handle: { title: "scrollbar" },
            lazy() {
              return import("@/pages/scrollbar");
            },
          },
          {
            id: "transition",
            path: "transition",
            handle: { title: "transition" },
            lazy() {
              return import("@/pages/transition");
            },
          },
          {
            id: "swiper",
            path: "swiper",
            handle: { title: "Swiper" },
            lazy() {
              return import("@/pages/swiper");
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
