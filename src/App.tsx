// Router Imports
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";

// Provider Imports
import { ThemeProvider } from "@/theme";
import { QueryProvider } from "@/plugins";

// Toast Imports
import { Toaster } from "react-hot-toast";

export function App() {
  return (
    <QueryProvider>
      <Toaster></Toaster>
      <ThemeProvider>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
