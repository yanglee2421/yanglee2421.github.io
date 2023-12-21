// MUI Imports
import {
  DataGrid,
  GridColDef,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Box, Card, CardHeader, IconButton, TextField } from "@mui/material";
import { Close, Search } from "@mui/icons-material";

// React Imports
import React from "react";

// Components Imports
import { Counter } from "@/components";

export function DataGridPage() {
  const [pagiModel, setPagiModel] = React.useState({
    page: 0,
    pageSize: 20,
  });

  const [search, setSearch] = React.useState("");

  const [selection, setSelection] = React.useState<Array<number | string>>([]);

  return (
    <Box p={2}>
      <Counter />
      <Card>
        <CardHeader title="Quick Filter" />
        <Box height={500}>
          <DataGrid
            loading={false}
            columns={columns()}
            rows={[]}
            getRowId={(row) => row.id}
            paginationMode="server"
            rowCount={0}
            pageSizeOptions={[20, 50, 100]}
            paginationModel={pagiModel}
            onPaginationModelChange={setPagiModel}
            checkboxSelection
            rowSelectionModel={selection}
            onRowSelectionModelChange={setSelection}
            slots={{
              toolbar: QuickSearchToolbar,
            }}
            slotProps={{
              baseButton: { variant: "outlined" },
              toolbar: {
                value: search,
                onChange(evt: React.ChangeEvent<HTMLInputElement>) {
                  setSearch(evt.target.value);
                },
                onClear() {
                  setSearch("");
                },
              },
            }}
          />
        </Box>
      </Card>
    </Box>
  );
}

function columns(): GridColDef[] {
  return [
    {
      headerName: "ID",
      type: "number",
      field: "id",
      width: 80,
      // flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Name",
      type: "string",
      field: "name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Age",
      type: "string",
      field: "age",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Role",
      type: "string",
      field: "role",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Avator",
      type: "string",
      field: "avator",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Email",
      type: "string",
      field: "email",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ];
}

function QuickSearchToolbar(props: QuickSearchToolbarProps) {
  // ** Props
  const { value, onChange, onClear } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 2,
        p(theme) {
          return theme.spacing(2, 5, 4, 5);
        },
      }}
    >
      <GridToolbarFilterButton />
      <GridToolbarExport />
      <TextField
        value={value}
        onChange={onChange}
        placeholder="Search..."
        size="small"
        sx={{
          ml: "auto",
          width: {
            xs: 1,
            sm: "auto",
          },
          "& .MuiInputBase-root > svg": {
            mr: 2,
          },
        }}
        InputProps={{
          startAdornment: <Search fontSize="small" />,
          endAdornment: (
            <IconButton onClick={onClear} size="small">
              <Close fontSize="small" />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
}

interface QuickSearchToolbarProps {
  value: string;
  onChange(evt: React.ChangeEvent<HTMLInputElement>): void;
  onClear(): void;
}
