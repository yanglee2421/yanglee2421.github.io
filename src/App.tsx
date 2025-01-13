import { QueryProvider } from "@/components/query";
import { RouterUI } from "@/router/RouterUI";

export function App() {
  return (
    <QueryProvider>
      <RouterUI />
    </QueryProvider>
  );
}
