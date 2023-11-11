// MUI Imports
import { Card, CardHeader, CardContent, Box, Link } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridValidRowModel,
} from "@mui/x-data-grid";

// Router Imports
import { Link as RouterLink } from "react-router-dom";

export function ResultTable(props: ResultTableProps) {
  // ** Props
  const { rows, ...restProps } = props;

  return (
    <>
      <Card {...restProps}>
        <CardHeader title="Detailed results" />
        <CardContent>
          <DataGrid
            columns={columns()}
            rows={rows}
            getRowId={(item) => item.label}
            autoHeight
            hideFooterPagination
            disableRowSelectionOnClick
            slots={{
              toolbar,
            }}
            slotProps={{
              //   baseButton: { variant: "outlined" },
              baseFormControl: {},
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}

function columns(): GridColDef[] {
  return [
    {
      field: "label",
      type: "string",
      flex: 1,
      headerName: "SERIES",
      headerAlign: "left",
      align: "left",
      sortable: false,
      renderCell(params) {
        const searchParams = new URLSearchParams();
        searchParams.set("event", params.value);
        const search = searchParams.toString();

        return (
          <Link
            component={RouterLink}
            to={{ pathname: "/posthog-events", search }}
            underline="always"
          >
            {params.value}
          </Link>
        );
      },
    },
    {
      field: "count",
      type: "string",
      flex: 1,
      headerName: "TOTAL SUM",
      headerAlign: "left",
      align: "left",
      sortable: false,
    },
  ];
}

function toolbar() {
  return (
    <>
      <Box display={"flex"} p={4}>
        <GridToolbarFilterButton />
        <GridToolbarExport sx={{ ml: 3 }} />
        <GridToolbarQuickFilter sx={{ ml: "auto" }} />
      </Box>
    </>
  );
}

export interface ResultTableProps {
  rows: GridValidRowModel[];
}
