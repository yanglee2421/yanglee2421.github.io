// Router Imports
import { Navigate, RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "",
    lazy() {
      return import("./router-guard");
    },
    children: [
      { path: "*", element: <Navigate to="/404" replace /> },
      {
        id: "404",
        path: "404",
        handle: { title: "404，NotFound" },
        lazy() {
          return import("@/pages/404");
        },
      },
      {
        id: "login",
        path: "login",
        handle: { title: "登录" },
        lazy() {
          return import("@/pages/login");
        },
      },
      {
        id: "index",
        index: true,
        handle: { title: "首页" },
        lazy() {
          return import("@/pages/home");
        },
      },
      {
        id: "input",
        path: "input",
        handle: { title: "Input" },
        lazy() {
          return import("@/pages/input");
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
    ],
  },
];
