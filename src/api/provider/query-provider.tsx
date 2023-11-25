// Query Imports
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient, persister } from "./query-client";

export function QueryProvider(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      key={import.meta.env.VITE_QUERY_PERSISTER_KEY}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
