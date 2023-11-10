// API Hooks
import { useInsightsTrend } from "@/hooks/api-posthog";

// Components Imports
import { LineChart } from "./line-chart";
import { ResultTable } from "./result-table";

// MUI Imports
import { Grid } from "@mui/material";

export function PosthogInsights() {
  const query = useInsightsTrend(
    {
      insight: "TRENDS",
      date_from: "-7d",
      entity_type: "events",
      interval: "day",
      display: "ActionsLineGraph",
      compare: "",
      session_id: "",
      client_query_id: "",
      events: JSON.stringify([
        {
          order: 0,
          type: "events",
          id: "$pageview",
          name: "$pageview",
          math: "total",
          properties: [
            {
              key: "$current_url",
              value: "vsr_click",
              operator: "icontains",
              type: "event",
            },
          ],
        },
        {
          order: 1,
          type: "events",
          id: "WarpDrivenVSRView",
          name: "WarpDrivenVSRView",
          math: "total",
        },
      ]),
    },
    { project_id: 1 }
  );

  console.log(query.data);

  return (
    <>
      <Grid container spacing={6} p={6}>
        <Grid item xs={12}>
          <LineChart
            categories={query.data?.result[0].labels || []}
            series={[
              {
                name: query.data?.result[0].label,
                data: query.data?.result[0].data || [],
              },
              {
                name: query.data?.result[1].label,
                data: query.data?.result[1].data || [],
              },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <ResultTable />
        </Grid>
      </Grid>
    </>
  );
}
