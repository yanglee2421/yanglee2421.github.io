import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryProvider } from "@/components/QueryProvider";
import { routes } from "@/router/routes";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryProvider>
  );
}

const router = import.meta.env.PROD
  ? createHashRouter(routes)
  : createBrowserRouter(routes);
