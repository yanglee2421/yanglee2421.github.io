// API Hooks
import { useInsightsTrend } from "@/hooks/api-posthog";

// Components Imports
import { LineChart } from "./line-chart";

export function PosthogInsights() {
  const query = useInsightsTrend(
    {
      insight: "TRENDS",
      date_from: "all",
      entity_type: "events",
      display: "ActionsLineGraph",
      interval: "day",
      compare: "",
      session_id: "",
      client_query_id: "",
      events: JSON.stringify([
        {
          type: "events",
          id: "$pageview",
          properties: [
            {
              key: "$current_url",
              value: "vsr_click",
              operator: "icontains",
              type: "event",
            },
          ],
        },
        { type: "events", id: "WarpDrivenVSRView" },
      ]),
    },
    { project_id: 1 }
  );

  console.log(query.data);

  return (
    <>
      <LineChart />
    </>
  );
}
