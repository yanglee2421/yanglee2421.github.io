// MUI Imports
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Card, CardHeader, Button } from "@mui/material";

// React Imports
import React from "react";

// Store Imports
import { myStore } from "./my-store";

export function DataGridPage() {
  const [pagiModel, setPagiModel] = React.useState({
    page: 0,
    pageSize: 7,
  });

  const store = React.useSyncExternalStore(
    myStore.subscribe.bind(myStore),
    myStore.getSnapshot.bind(myStore)
  );

  const clickHandler = () => {
    myStore.dispatch();
  };

  return (
    <Box p={2}>
      <Card>
        <CardHeader title="Quick Filter" />
        <DataGrid
          autoHeight
          columns={columns()}
          rows={[]}
          pageSizeOptions={[7, 10, 25, 50]}
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
