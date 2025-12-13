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

export const AppRouter = () => {
  /**
   * Already memoized by react compiler
   * So no need to wrap with useMemo
   */
  const routes = createRoutes();
  const router = createAppRouter(routes);

  return <RouterProvider router={router} />;
};
