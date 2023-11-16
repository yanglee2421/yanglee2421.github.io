// API Hooks
import { useInsightsTrend } from "@/hooks/api-posthog";

// Components Imports
import { LineChart } from "./line-chart";
import { ResultTable } from "./result-table";
import { IntervalSelect } from "./interval-select";
import { DateSelect } from "./date-select";

// MUI Imports
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  styled,
  SelectProps,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { RefreshOutlined } from "@mui/icons-material";

// Utils Imports
import { eventsMap } from "./events-map";

// React Imports
import React from "react";

export function PosthogInsights() {
  const [interval, setInterval] = React.useState("day");
  const [date, setDate] = React.useState(() => {
    return JSON.stringify({
      date_from: "-7d",
    });
  });

  const query = useInsightsTrend(
    {
      ...toJsonParse(date),
      interval,
      insight: "TRENDS",
      entity_type: "events",
      display: "ActionsLineGraph",
      compare: "",
      session_id: "",
      client_query_id: "",
      refresh: true,
      events: JSON.stringify([...eventsMap.values()]),
    },
    { project_id: 1 }
  );

  const handleDateChg: SelectProps["onChange"] = (evt) => {
    const dateJson = String(evt.target.value);
    const dateData = toJsonParse(dateJson);

    switch (dateData.date_from) {
      case "dStart":
      case "-1dStart":
      case "-24h":
        setInterval("hour");
        break;
      case "-7d":
      case "-14d":
        setInterval("day");
        break;
      case "-30d":
      case "mStart":
        setInterval("week");
        break;
      case "-90d":
      case "-180d":
      case "yStart":
      case "all":
        setInterval("month");
        break;
      default:
    }
    setDate(dateJson);
  };

  return (
    <>
      <Grid container spacing={6} p={6}>
        <Grid item xs={12}>
          <StyledCard>
            <CardHeader
              title="Trends"
              subheader={`Last refresh ${new Date(
                query.data?.last_refresh || ""
              ).toLocaleString()}`}
              sx={{
                flexDirection: ["column", "row"],
                alignItems: ["flex-start", "center"],
                "& .MuiCardHeader-action": { mb: 0 },
                "& .MuiCardHeader-content": { mb: [2, 0] },
              }}
              action={
                <LoadingButton
                  loading={query.isRefetching}
                  onClick={() => query.refetch()}
                  color="success"
                  startIcon={<RefreshOutlined />}
                >
                  refresh
                </LoadingButton>
              }
            />
            <CardContent>
              <Box display={"flex"} gap={3} mb={3}>
                <DateSelect value={date} onChange={handleDateChg} />
                <IntervalSelect
                  value={interval}
                  onChange={(evt) => {
                    setInterval(String(evt.target.value));
                  }}
                />
              </Box>
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
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12}>
          <ResultTable rows={query.data?.result || []} />
        </Grid>
      </Grid>
    </>
  );
}

const StyledCard = styled(Card)(({ theme }) => {
  return {
    "& .apexcharts-canvas": {
      "& line[stroke='transparent']": {
        display: "none",
      },
      "& .apexcharts-tooltip": {
        boxShadow: theme.shadows[3],
        borderColor: theme.palette.divider,
        background: theme.palette.background.paper,
        "& .apexcharts-tooltip-title": {
          fontWeight: 600,
          borderColor: theme.palette.divider,
          background: theme.palette.background.paper,
        },
        "&.apexcharts-theme-light": {
          color: theme.palette.text.primary,
        },
        "&.apexcharts-theme-dark": {
          color: theme.palette.common.white,
        },
        "& .apexcharts-tooltip-series-group:first-of-type": {
          paddingBottom: 0,
        },
      },
      "& .apexcharts-xaxistooltip": {
        borderColor: theme.palette.divider,
        background:
          theme.palette.mode === "light"
            ? theme.palette.grey[50]
            : theme.palette.background.default,
        "&:after": {
          borderBottomColor:
            theme.palette.mode === "light"
              ? theme.palette.grey[50]
              : theme.palette.background.default,
        },
        "&:before": {
          borderBottomColor: theme.palette.divider,
        },
      },
      "& .apexcharts-yaxistooltip": {
        borderColor: theme.palette.divider,
        background:
          theme.palette.mode === "light"
            ? theme.palette.grey[50]
            : theme.palette.background.default,
        "&:after": {
          borderLeftColor:
            theme.palette.mode === "light"
              ? theme.palette.grey[50]
              : theme.palette.background.default,
        },
        "&:before": {
          borderLeftColor: theme.palette.divider,
        },
      },
      "& .apexcharts-xaxistooltip-text, & .apexcharts-yaxistooltip-text": {
        color: theme.palette.text.primary,
      },
      "& .apexcharts-yaxis .apexcharts-yaxis-texts-g .apexcharts-yaxis-label": {
        textAnchor: theme.direction === "rtl" ? "start" : void 0,
      },
      "& .apexcharts-text, & .apexcharts-tooltip-text, & .apexcharts-datalabel-label, & .apexcharts-datalabel, & .apexcharts-xaxistooltip-text, & .apexcharts-yaxistooltip-text, & .apexcharts-legend-text":
        {
          fontFamily: `${theme.typography.fontFamily} !important`,
        },
      "& .apexcharts-pie-label": {
        filter: "none",
        fill: theme.palette.common.white,
      },
      "& .apexcharts-marker": {
        boxShadow: "none",
      },
    },
  };
});

function toJsonParse(json: string) {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error(error);

    return {};
  }
}
