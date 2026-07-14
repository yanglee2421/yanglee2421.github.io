import { createRouter, createWebHashHistory } from "vue-router";
import { createRoutes } from "./routes";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: createRoutes(),
});
