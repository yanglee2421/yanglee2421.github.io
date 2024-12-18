import { Staff as StaffType, useDbStore } from "@/hooks/store/useDbStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddOutlined, DeleteOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid2,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

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

export const Staff = () => {
  const staff = useDbStore((s) => s.staffs);
  const set = useDbStore((s) => s.set);
  const data = React.useMemo(() => staff, [staff]);

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
    <Card>
      <CardHeader title="Staff" />
      <CardContent>
        <form
          action={() =>
            form.handleSubmit((data) => {
              set((d) => {
                const aliasSet = new Set(d.staffs.map((i) => i.alias));

                if (aliasSet.has(data.alias)) {
                  form.setError("alias", { message: "duplicate alias!" });
                  return;
                }

                d.staffs.push({
                  ...data,
                  id: crypto.randomUUID(),
                  enable: true,
                });
              });
            }, console.error)()}
          noValidate
          onReset={() => form.reset()}
        >
          <Grid2 container spacing={6}>
            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
            <Grid2 size={{ xs: 12 }}>
              <Button
                type="submit"
                startIcon={<AddOutlined />}
                variant="contained"
              >
                Add
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </CardContent>
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
  );
};
