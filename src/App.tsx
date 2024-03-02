import { RouterProvider } from "react-router-dom";
import { router } from "@/router/router";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ToastContainer } from "react-toastify";
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
