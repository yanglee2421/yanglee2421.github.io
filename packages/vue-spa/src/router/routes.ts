import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    name: "root",
    path: "/",
    children: [
      {
        name: "home",
        path: "",
        component: () => import("../pages/HomePage.vue"),
      },
      {
        name: "about",
        path: "about",
        component: () => import("../pages/AboutPage.vue"),
      },
    ],
  },
];
