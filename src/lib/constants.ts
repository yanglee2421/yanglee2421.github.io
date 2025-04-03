import { QueryClient } from "@tanstack/react-query";

export const GITHUB_URL = "https://github.com/yanglee2421";
export const FALLBACK_LANG = "en";
export const DEFAULT_MODE = "system";
export const LANGS = new Set(["en", "zh"]);

export const queryClient = new QueryClient({
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

      experimental_prefetchInRender: true,
    },
  },
});
