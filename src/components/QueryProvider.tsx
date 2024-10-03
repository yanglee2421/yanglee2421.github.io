import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/queryClient";

export function QueryProvider(props: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>{props.children}</QueryErrorResetBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
