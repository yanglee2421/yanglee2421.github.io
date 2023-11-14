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
      refresh: true,
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
        {
          order: 2,
          type: "events",
          id: "$autocapture",
          name: "$autocapture",
          properties: [
            {
              key: "$el_text",
              value: "Add to cart",
              operator: "icontains",
              type: "event",
            },
          ],
        },
        {
          order: 3,
          type: "events",
          id: "$autocapture",
          name: "$autocapture",
          properties: [
            {
              key: "$el_text",
              value: "Checkout",
              operator: "icontains",
              type: "event",
            },
          ],
        },
      ]),
    },
    { project_id: 1 }
  );

  return (
    <>
      <Grid container spacing={6} p={6}>
        <Grid item xs={12}>
          <LineChart
            loading={query.isFetching}
            onRefresh={() => query.refetch()}
            categories={query.data?.result[0].labels || []}
            last_refresh={new Date(query.data?.last_refresh || "")}
            series={[
              {
                name: query.data?.result[0].label,
                data: query.data?.result[0].data || [],
              },
              {
                name: query.data?.result[1].label,
                data: query.data?.result[1].data || [],
              },
              {
                name: query.data?.result[2].label,
                data: query.data?.result[2].data || [],
              },
              {
                name: query.data?.result[3].label,
                data: query.data?.result[3].data || [],
              },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <ResultTable rows={query.data?.result || []} />
        </Grid>
      </Grid>
    </>
  );
}
