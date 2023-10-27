// MUI Imports
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Card, CardHeader } from "@mui/material";

// React Imports
import React from "react";

export function DataGridPage() {
  const [pagiModel, setPagiModel] = React.useState({
    page: 0,
    pageSize: 7,
  });

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
            toolbar: () => <>hell</>,
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
