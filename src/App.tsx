import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryProvider } from "@/components/QueryProvider";
import { routes } from "@/router/routes";

export function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

const router = import.meta.env.PROD
  ? createHashRouter(routes)
  : createBrowserRouter(routes);
