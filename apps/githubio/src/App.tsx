import { AppRouter } from "@/router";
import { QueryProvider } from "./components/query";

export const App = () => {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
};
