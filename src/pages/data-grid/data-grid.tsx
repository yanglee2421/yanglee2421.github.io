// MUI Imports
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Card,
  CardHeader,
  TextField,
  TextFieldProps,
} from "@mui/material";

// React Imports
import React from "react";

// API Imports
import { useTableGet } from "@/hooks/table";

export function DataGridPage() {
  const [pagiModel, setPagiModel] = React.useState({
    page: 0,
    pageSize: 20,
  });

  const [search, setSearch] = React.useState("");
  const inputChgHandler: TextFieldProps["onChange"] = (evt) => {
    setSearch(evt.target.value);
  };

  const { data, isPending } = useTableGet({
    params: {
      page: pagiModel.page + 1,
      pageSize: pagiModel.pageSize,
      name: search,
    },
  });
  console.log(data);

  return (
    <Box p={2}>
      <Card>
        <CardHeader title="Quick Filter" />
        <Box height={500}>
          <DataGrid
            loading={isPending}
            columns={columns()}
            rows={data?.rows || []}
            getRowId={(row) => row.id}
            rowCount={data?.total || 0}
            paginationMode="server"
            pageSizeOptions={[20, 50, 100]}
            paginationModel={pagiModel}
            onPaginationModelChange={setPagiModel}
            slots={{
              toolbar: () => {
                return (
                  <>
                    <TextField value={search} onChange={inputChgHandler} />
                  </>
                );
              },
            }}
            slotProps={{
              toolbar: {},
            }}
          />
        </Box>
      </Card>
    </Box>
  );
}

function columns(): GridColDef[] {
  return [
    { headerName: "ID", type: "string", field: "id" },
    { headerName: "Name", type: "string", field: "name" },
    { headerName: "Age", type: "string", field: "age" },
  ];
}
