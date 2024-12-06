import { QueryProvider } from "@/components/QueryProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { RouterUI } from "@/router/RouterUI";

export function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <RouterUI />
      </ThemeProvider>
    </QueryProvider>
  );
}
