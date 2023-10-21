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
        id: "forgot-passwd",
        path: "forgot-passwd",
        handle: { title: "Forgot Password" },
        lazy() {
          return import("@/pages/forgot-passwd");
        },
      },
      {
        id: "register",
        path: "register",
        handle: { title: "Register" },
        lazy() {
          return import("@/pages/register");
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
      {
        id: "fabric",
        path: "fabric",
        handle: { title: "fabric" },
        lazy() {
          return import("@/pages/fabric");
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
      {
        id: "virtualized-list",
        path: "virtualized-list",
        handle: { title: "Virtualized List" },
        lazy() {
          return import("@/pages/virtualized-list");
        },
      },
      {
        id: "infinite-list",
        path: "infinite-list",
        handle: { title: "Infinite List" },
        lazy() {
          return import("@/pages/infinite-list");
        },
      },
    ],
  },
];
