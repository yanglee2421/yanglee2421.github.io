// Query Imports
import { useInfiniteQuery } from "@tanstack/react-query";

// API Imports
import { posthog_query } from "@/api/posthog";
import { Data, PathParams } from "@/api/posthog/posthog_query";

export function usePosthogQuery(data: Data, pathParams: PathParams) {
  return useInfiniteQuery({
    queryKey: ["posthog_query", data, pathParams],
    queryFn({ signal, pageParam }) {
      return posthog_query({ signal, data: pageParam }, pathParams);
    },

    initialPageParam: data,
    getNextPageParam(lastPage, allPages, lastPageParam) {
      void allPages;
      if (lastPage.hasMore) {
        const list = lastPage.results;
        lastPageParam.query.before = list[list.length - 1][5];
        return { ...lastPageParam };
      }

      return null;
    },
    getPreviousPageParam() {
      return null;
    },
  });
}
