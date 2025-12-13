import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router";
import { createRoutes } from "./routes";

const createAppRouter = () => {
  const routes = createRoutes();

  const router = import.meta.env.PROD
    ? createHashRouter(routes)
    : createBrowserRouter(routes);

  return router;
};

export const AppRouter = () => {
  const router = createAppRouter();

  return <RouterProvider router={router} />;
};
