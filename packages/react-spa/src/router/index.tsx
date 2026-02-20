import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router";
import { createRoutes } from "./routes";
import type { RouteObject } from "react-router";

const createAppRouter = (routes: RouteObject[]) => {
  const router = import.meta.env.PROD
    ? createHashRouter(routes)
    : createBrowserRouter(routes);

  return router;
};

const routes = createRoutes();
const router = createAppRouter(routes);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
