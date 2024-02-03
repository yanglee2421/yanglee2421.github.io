// Router Imports
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";

// Provider Imports
import { ThemeProvider } from "@/theme";
import { QueryProvider } from "@/plugins";

// Toast Imports
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
