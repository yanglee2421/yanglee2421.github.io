import { QueryClient } from "@tanstack/react-query";
import React from "react";

export const nonPersistQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 5,

      retry: false,
      retryDelay(failureCount) {
        return Math.max(1000 * 2 ** failureCount, 1000 * 8);
      },

      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const nonPersistQueryContext = React.createContext(
  nonPersistQueryClient,
);
