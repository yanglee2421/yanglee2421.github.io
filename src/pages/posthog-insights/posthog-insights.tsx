import { useInsightsTrend } from "@/hooks/api-posthog";

export function PosthogInsights() {
  const query = useInsightsTrend(
    {
      client_query_id: "",
      compare: "",
      date_from: "",
      display: "",
      interval: "",
      entity_type: "",
      session_id: "",
      insight: "",
      events: JSON.stringify([]),
    },
    { project_id: 1 }
  );

  console.log(query.data);

  return <></>;
}
