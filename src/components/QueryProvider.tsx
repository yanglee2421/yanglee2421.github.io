import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

export function QueryProvider(props: React.PropsWithChildren) {
  return (
    <PersistQueryClientProvider
      client={getQueryClient()}
      persistOptions={{ persister }}
    >
      {props.children}
    </PersistQueryClientProvider>
  );
}

const persister = createAsyncStoragePersister({
  storage: globalThis.sessionStorage,
  key: "YotuLeeQueryCache",
});

let browserQueryClient: QueryClient | null = null;

function getQueryClient() {
  // Server: always generate a new object
  if (typeof window === "undefined") {
    return makeQueryClient();
  }

  // Client: only generate object once
  browserQueryClient ||= makeQueryClient();

  return browserQueryClient;
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 2,

        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,

        retry: 1,
        retryDelay(attemptIndex) {
          return Math.min(1000 * 2 ** attemptIndex, 1000 * 8);
        },
      },
    },
  });
}
