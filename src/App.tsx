import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { QueryProvider } from "@/components/QueryProvider";
import { SwrProvider } from "@/components/SwrProvider";
import { routes } from "@/router/routes";
import { ThemeProvider } from "@/theme/ThemeProvider";

export function App() {
  return (
    <QueryProvider>
      <SwrProvider>
        <ToastContainer limit={3} />
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </SwrProvider>
    </QueryProvider>
  );
}

const router = import.meta.env.PROD
  ? createHashRouter(routes)
  : createBrowserRouter(routes, { basename: "/react-mui" });
