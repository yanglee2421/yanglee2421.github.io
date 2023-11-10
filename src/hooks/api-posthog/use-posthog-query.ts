// Query Imports
import { useQuery } from "@tanstack/react-query";

// API Imports
import { posthog_query } from "@/api/posthog";
import { Data, PathParams } from "@/api/posthog/posthog_query";

export function usePosthogQuery(data: Data, pathParams: PathParams) {
  return useQuery({
    queryKey: ["posthog_query", data, pathParams],
    queryFn({ signal }) {
      return posthog_query({ signal, data }, pathParams);
    },
  });
}
