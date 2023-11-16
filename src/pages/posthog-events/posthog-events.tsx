// MUI Imports
import { Card, CardHeader, CardContent, Box, Alert } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";
import { RefreshOutlined } from "@mui/icons-material";

// API Imports
import { usePosthogQuery } from "@/hooks/api-posthog";
import { platformQueryMap } from "@/api/posthog";

// Router Imports
import { useSearchParams } from "react-router-dom";

// Utils Imports
import { toTimeAgo } from "./to-time-ago";

// Components Imports
import { DateSelect } from "./date-select";
import { toolbar } from "./toolbar";

// React Imports
import React from "react";

export function PosthogEvents() {
  const [searchParams] = useSearchParams();
  const event = searchParams.get("event");

  const [date, setDate] = React.useState(() => {
    return JSON.stringify({
      after: "dStart",
    });
  });

  const queryMap = platformQueryMap.get(3);
  const eventQuery = queryMap?.get(String(event));
  const isWithoutFalsy = [queryMap, eventQuery].every(Boolean);

  const query = usePosthogQuery(
    {
      query: {
        ...toJsonParse(date),
        event: eventQuery?.id,
        properties: eventQuery?.properties,
        kind: "EventsQuery",
        select: [
          "*",
          "event",
          "person",
          "coalesce(properties.$current_url, properties.$screen_name) -- Url / Screen",
          "properties.$lib",
          "timestamp",
        ],
      },
      client_query_id: "",
      refresh: true,
    },
    { project_id: 1 }
  );

  const rows = query.data?.pages
    .flatMap((item) => item.results)
    .map((item) => {
      return {
        uuid: item[0].uuid,
        event: item[1],
        url: item[3],
        library: item[4],
        time: item[5],
      };
    });

  if (!isWithoutFalsy) {
    return <Alert severity="error">Invalid platform or event</Alert>;
  }

  return (
    <>
      <Card>
        <CardHeader
          title={event}
          action={
            <LoadingButton
              onClick={() => query.refetch()}
              variant="contained"
              loading={query.isRefetching}
              startIcon={<RefreshOutlined />}
            >
              reload
            </LoadingButton>
          }
        />
        <CardContent>
          <DateSelect
            value={date}
            onChange={(evt) => {
              setDate(String(evt.target.value));
            }}
          />
          <DataGrid
            loading={query.isPending}
            columns={columns()}
            rows={rows || []}
            getRowId={(item) => item.uuid}
            autoHeight
            disableRowSelectionOnClick
            slots={{ toolbar }}
            slotProps={{
              toolbar: {
                onClick() {
                  query.fetchNextPage();
                },
                loading: query.isFetchingNextPage,
                hasNextPage: query.hasNextPage,
              },
            }}
          />
          <Box display={"flex"} justifyContent={"center"} p={3}></Box>
        </CardContent>
      </Card>
    </>
  );
}

function columns(): GridColDef<Row>[] {
  return [
    {
      field: "event",
      type: "string",
      headerName: "EVENT",
      flex: 1,
      sortable: false,
      // renderCell(params) {
      //   return <></>;
      // },
    },
    {
      field: "uuid",
      type: "string",
      headerName: "PERSON",
      flex: 1,
      sortable: false,
    },
    {
      field: "url",
      type: "string",
      headerName: "URL",
      flex: 1,
      sortable: false,
    },
    {
      field: "library",
      type: "string",
      headerName: "LIBRARY",
      // flex: 1,
      width: 120,
      sortable: false,
    },
    {
      field: "time",
      type: "string",
      headerName: "TIME",
      // flex: 1,
      width: 160,
      sortable: false,
      renderCell(params) {
        return toTimeAgo(params.value);
      },
    },
  ];
}

interface Row {
  uuid: string;
  event: string;
  url: string;
}

function toJsonParse(json: string) {
  try {
    return JSON.parse(json);
  } catch (error) {
    return {};
  }
}
