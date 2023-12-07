// Router Imports
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";

// Provider Imports
import { ThemeProvider } from "@/theme";
import { ReduxProvider } from "@/redux";
import { QueryProvider } from "@/api/provider";
import { AclProvider } from "@/configs/acl";

// Toast Imports
import { Toaster } from "react-hot-toast";

export function App() {
  return (
    <ReduxProvider>
      <QueryProvider>
        <AclProvider>
          <Toaster />
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </AclProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}
