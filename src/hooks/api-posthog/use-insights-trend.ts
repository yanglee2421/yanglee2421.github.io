// Query Imports
import { useQuery } from "@tanstack/react-query";

// API Imports
import { insights_trend } from "@/api/posthog";
import { Res, PathParams, Params } from "@/api/posthog/insights_trend";

export function useInsightsTrend(params: Params, pathParams: PathParams) {
  return useQuery<Res, Error>({
    queryKey: ["insights_trend", params, pathParams],
    queryFn({ signal }) {
      return insights_trend({ signal, params }, pathParams);
    },
  });
}
