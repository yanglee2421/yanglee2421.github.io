// MUI Imports
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Card, CardHeader, Button } from "@mui/material";

// React Imports
import React from "react";

// Store Imports
import { myStore } from "./my-store";

// API Imports
import { useTableGet } from "@/hooks/table";

export function DataGridPage() {
  const [pagiModel, setPagiModel] = React.useState({
    page: 0,
    pageSize: 20,
  });

  const store = React.useSyncExternalStore(
    myStore.subscribe.bind(myStore),
    myStore.getSnapshot.bind(myStore)
  );

  const clickHandler = () => {
    myStore.dispatch();
  };

  const { data, isLoading } = useTableGet({
    params: {
      page: pagiModel.page + 1,
      pageSize: pagiModel.pageSize,
    },
  });
  console.log(data);

  return (
    <Box p={2}>
      <Card>
        <CardHeader title="Quick Filter" />
        <Box height={500}>
          <DataGrid
            loading={isLoading}
            columns={columns()}
            rows={data?.rows || []}
            rowCount={data?.total || 0}
            paginationMode="server"
            pageSizeOptions={[20, 50, 100]}
            paginationModel={pagiModel}
            onPaginationModelChange={setPagiModel}
            slots={{
              toolbar: () => {
                return (
                  <Button onClick={clickHandler} variant="outlined">
                    {store.count}
                  </Button>
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
    { headerName: "Name", type: "string", field: "name" },
    { headerName: "Age", type: "string", field: "age" },
  ];
}
