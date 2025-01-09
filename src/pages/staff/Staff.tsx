import {
  AddOutlined,
  DeleteOutlined,
  RestoreOutlined,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid2,
  IconButton,
  MenuItem,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { z } from "zod";
import { Staff as StaffType, useDbStore } from "@/hooks/store/useDbStore";

const schema = z.object({
  name: z.string().min(1),
  alias: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

const columnHelper = createColumnHelper<StaffType>();

const columns = [
  columnHelper.accessor("id", { cell: (r) => `#${r.getValue()}` }),
  columnHelper.accessor("name", {}),
  columnHelper.accessor("alias", {}),
  columnHelper.accessor("enable", {
    cell: (r) => (
      <Switch
        checked={r.getValue()}
        onChange={(e, checked) => {
          void e;
          useDbStore.setState((d) => {
            const val = d.staffs.find((i) => i.id === r.row.original.id);
            if (val) {
              val.enable = checked;
            }
          });
        }}
      />
    ),
  }),
  columnHelper.display({
    id: "operate",
    cell({ row }) {
      return (
        <IconButton
          color="error"
          onClick={() => {
            useDbStore.setState((d) => {
              d.staffs.splice(
                d.staffs.findIndex((i) => i.id === row.original.id),
                1,
              );
            });
          }}
        >
          <DeleteOutlined />
        </IconButton>
      );
    },
  }),
];

const checkText = (text: string, search: string) => {
  if (!search) return true;

  return text.toLowerCase().includes(search.toLowerCase());
};

const checkBool = (bool: boolean, search: string) => {
  if (!search) return true;

  return bool.toString().toLowerCase() === search.toLowerCase();
};

export const Staff = () => {
  const [search, setSearch] = useSearchParams({
    name: "",
    alias: "",
    enable: "",
  });

  const nameSearch = search.get("name") || "";
  const aliasSearch = search.get("alias") || "";
  const enableSearch = search.get("enable") || "";

  const staff = useDbStore((s) => s.staffs);
  const set = useDbStore((s) => s.set);

  const data = React.useMemo(
    () =>
      staff.filter((i) =>
        checkText(i.name, nameSearch) && checkText(i.alias, aliasSearch) &&
        checkBool(i.enable, enableSearch)
      ),
    [staff, nameSearch, aliasSearch, enableSearch],
  );

  const [name, setName] = React.useState(nameSearch);
  const [alias, setAlias] = React.useState(aliasSearch);
  const [enable, setEnable] = React.useState(enableSearch);

  React.useEffect(() => {
    setSearch((p) => {
      const n = new URLSearchParams(p);

      if (name) {
        n.set("name", name.trim());
      } else {
        n.delete("name");
      }

      if (alias) {
        n.set("alias", alias.trim());
      } else {
        n.delete("alias");
      }

      if (enable) {
        n.set("enable", enable);
      } else {
        n.delete("enable");
      }

      return n;
    });
  }, [name, alias, enable, setSearch]);

  const formId = React.useId();

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    columns,
    data,
    getRowId: (r) => r.id.toString(),

    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 20 },
    },
  });

  const renderBody = () => {
    if (!table.getRowCount()) {
      return (
        <TableRow>
          <TableCell colSpan={table.getAllLeafColumns().length}>
            <Typography sx={{ textAlign: "center" }}>No Data</Typography>
          </TableCell>
        </TableRow>
      );
    }

    return table.getRowModel().rows.map((r) => (
      <TableRow key={r.id}>
        {r.getVisibleCells().map((c) => (
          <TableCell
            key={c.id}
          >
            {c.getIsPlaceholder() ||
              flexRender(c.column.columnDef.cell, c.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      alias: "",
    },
    resolver: zodResolver(schema),
  });

  return (
    <Stack spacing={6}>
      <Card>
        <CardHeader title="Staff" />
        <CardContent>
          <Grid2 container spacing={6}>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name"
                fullWidth
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                fullWidth
                label="Alias"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                value={enable}
                onChange={(e) => setEnable(e.target.value)}
                fullWidth
                label="Enable"
                select
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="true">Enabled</MenuItem>
                <MenuItem value="false">Disabled</MenuItem>
              </TextField>
            </Grid2>
          </Grid2>
        </CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((h) => (
                    <TableCell
                      key={h.id}
                      sx={{ textTransform: "uppercase" }}
                    >
                      {h.isPlaceholder ||
                        flexRender(h.column.columnDef.header, h.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>{renderBody()}</TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component={"div"}
          page={table.getState().pagination.pageIndex}
          rowsPerPage={table.getState().pagination.pageSize}
          onPageChange={(e, idx) => {
            table.setPageIndex(idx);
            void e;
          }}
          onRowsPerPageChange={(e) => {
            table.setPageSize(Number.parseInt(e.target.value));
          }}
          count={table.getRowCount()}
        />
      </Card>
      <Card>
        <CardHeader title="Add Staff" />
        <CardContent>
          <form
            id={formId}
            action={() =>
              form.handleSubmit((data) => {
                set((d) => {
                  const aliasSet = new Set(d.staffs.map((i) => i.alias));

                  if (aliasSet.has(data.alias)) {
                    form.setError("alias", { message: "duplicate alias!" });
                    return;
                  }

                  d.staffs.push({
                    id: crypto.randomUUID(),
                    enable: true,
                    name: data.name.trim(),
                    alias: data.alias.trim(),
                  });
                });
              }, console.error)()}
            noValidate
            onReset={() => form.reset()}
          >
            <Grid2 container spacing={6}>
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                <Controller
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      fullWidth
                      label="Name"
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                <Controller
                  control={form.control}
                  name="alias"
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      fullWidth
                      label="Alias"
                    />
                  )}
                />
              </Grid2>
            </Grid2>
          </form>
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            form={formId}
            startIcon={<AddOutlined />}
            variant="contained"
          >
            Add
          </Button>
          <Button
            type="reset"
            form={formId}
            startIcon={<RestoreOutlined />}
            variant="outlined"
          >
            Reset
          </Button>
        </CardActions>
      </Card>
    </Stack>
  );
};
