// MUI Imports
import { Card, CardHeader, CardContent } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export function PosthogEvents() {
  return (
    <>
      <Card>
        <CardHeader />
        <CardContent>
          <DataGrid columns={columns()} rows={[]} />
        </CardContent>
      </Card>
    </>
  );
}

function columns(): GridColDef[] {
  return [
    { field: "", type: "string", headerName: "EVENT", flex: 1 },
    { field: "", type: "string", headerName: "PERSON", flex: 1 },
  ];
}
