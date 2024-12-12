import { QueryProvider } from "@/components/QueryProvider";
import { RouterUI } from "@/router/RouterUI";

export function App() {
  return (
    <QueryProvider>
      <RouterUI />
    </QueryProvider>
  );
}
