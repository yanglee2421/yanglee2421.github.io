import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryProvider } from "@/components/QueryProvider";
import { routes } from "@/router/routes";
import { ThemeProvider } from "@/theme/ThemeProvider";

import "react-toastify/ReactToastify.css";

export function App() {
  return (
    <QueryProvider>
      <ToastContainer limit={3}></ToastContainer>
      <ThemeProvider>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

const router = import.meta.env.PROD
  ? createHashRouter(routes)
  : createBrowserRouter(routes, { basename: "/react-mui" });
