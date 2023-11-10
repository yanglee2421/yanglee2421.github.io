// MUI Imports
import { Card, CardHeader, CardContent, Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbarQuickFilter,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";
import { RefreshOutlined } from "@mui/icons-material";

// API Imports
import { usePosthogQuery } from "@/hooks/api-posthog";

// Router Imports
import { useSearchParams } from "react-router-dom";

// Utils Imports
import { toCompact } from "@/utils";

export function PosthogEvents() {
  const [searchParams] = useSearchParams();
  const event = searchParams.get("event");

  const query = usePosthogQuery(
    {
      query: {
        kind: "EventsQuery",
        select: [
          "*",
          "event",
          "person",
          "coalesce(properties.$current_url, properties.$screen_name) -- Url / Screen",
          "properties.$lib",
          "timestamp",
        ],
        event: event || "",
        properties: toCompact([
          event === "$pageview" && {
            key: "$current_url",
            value: "vsr_click",
            operator: "icontains",
            type: "event",
          },
        ]),
      },
      client_query_id: "",
      refresh: false,
    },
    { project_id: 1 }
  );

  const rows = query.data?.results.map((item) => {
    return {
      uuid: item[0].uuid,
      event: item[1],
      url: item[3],
      library: item[4],
      time: item[5],
    };
  });

  return (
    <>
      <Card>
        <CardHeader
          title={event}
          action={
            <LoadingButton
              onClick={() => query.refetch()}
              variant="contained"
              loading={query.isFetching}
              startIcon={<RefreshOutlined />}
            >
              reload
            </LoadingButton>
          }
        />
        <CardContent>
          <DataGrid
            loading={query.isPending}
            columns={columns()}
            rows={rows || []}
            getRowId={(item) => item.uuid}
            autoHeight
            hideFooterPagination
            disableRowSelectionOnClick
            slots={{ toolbar }}
          />
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
        return toHourAgo(params.value);
      },
    },
  ];
}

interface Row {
  uuid: string;
  event: string;
  url: string;
}

function toHourAgo(...args: ConstructorParameters<typeof Date>) {
  const date = new Date(...args);
  const now = Date.now();
  const time = date.getTime();

  const days = Math.floor((now - time) / (1000 * 60 * 60 * 24));
  if (days) {
    return `${days} days ago`;
  }

  const hours = Math.floor((now - time) / (1000 * 60 * 60));
  if (hours) {
    return `${hours} hours ago`;
  }

  const minutes = Math.floor((now - time) / (1000 * 60));
  if (minutes) {
    return `${minutes} minutes ago`;
  }

  const seconds = Math.floor((now - time) / 1000);
  if (seconds) {
    return `${seconds} seconds ago`;
  }

  return "a few seconds ago";
}

function toolbar() {
  return (
    <Box display={"flex"} p={3}>
      <GridToolbarFilterButton />
      <GridToolbarExport sx={{ ml: 3 }} />
      <GridToolbarQuickFilter sx={{ ml: "auto" }} />
    </Box>
  );
}
