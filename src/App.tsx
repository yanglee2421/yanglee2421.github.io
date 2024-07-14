import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { QueryProvider } from "@/components/QueryProvider";
import { routes } from "@/router/routes";
import { ThemeProvider } from "@/theme/ThemeProvider";

export function App() {
  return (
    <QueryProvider>
      <ToastContainer limit={3} />
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryProvider>
  );
}

const router = import.meta.env.PROD
  ? createHashRouter(routes)
  : createBrowserRouter(routes, { basename: "/" });
