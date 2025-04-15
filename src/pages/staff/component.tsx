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
  Grid,
  IconButton,
  Link,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
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
import { db, Staff as StaffType } from "@/lib/db";
import { warn } from "@/lib/utils";
import { useLiveQuery } from "dexie-react-hooks";

const schema = z.object({
  name: z.string().min(1),
  alias: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

const columnHelper = createColumnHelper<StaffType>();

const columns = [
  columnHelper.accessor("id", {
    cell: (r) => <Link underline="none">#{r.getValue()}</Link>,
  }),
  columnHelper.accessor("name", {}),
  columnHelper.accessor("alias", {}),
  columnHelper.accessor("enable", {
    cell: (r) => (
      <Switch
        checked={r.getValue()}
        onChange={(e, checked) => {
          void e;
          db.staffs.update(r.row.original.id, { enable: checked });
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
            db.staffs.delete(row.original.id);
          }}
        >
          <DeleteOutlined />
        </IconButton>
      );
    },
  }),
];

export const Component = () => {
  "use no memo";
  const [activeTab, setActiveTab] = React.useState("list");

  const [search, setSearch] = useSearchParams({ name: "" });

  const nameSearch = search.get("name") || "";

  const staff = useLiveQuery(
    () => db.staffs.where("name").startsWith(nameSearch).toArray(),
    [nameSearch],
  );

  const data = React.useMemo(() => staff || [], [staff]);

  const [name, setName] = React.useState(nameSearch);

  React.useEffect(() => {
    setSearch((p) => {
      const n = new URLSearchParams(p);

      if (name) {
        n.set("name", name.trim());
      } else {
        n.delete("name");
      }

      return n;
    });
  }, [name, setSearch]);

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
          <TableCell key={c.id}>
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

  const renderList = () => {
    return (
      <>
        <CardContent>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name"
                fullWidth
              />
            </Grid>
          </Grid>
        </CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((h) => (
                    <TableCell key={h.id} sx={{ textTransform: "uppercase" }}>
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
      </>
    );
  };

  const renderAdd = () => {
    return (
      <>
        <CardContent>
          <form
            id={formId}
            action={() =>
              form.handleSubmit(async (data) => {
                await db.staffs.add({
                  enable: true,
                  name: data.name.trim(),
                  alias: data.alias.trim(),
                });
                form.reset();
              }, warn)()
            }
            noValidate
            onReset={() => form.reset()}
          >
            <Grid container spacing={6}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
              </Grid>
            </Grid>
          </form>
        </CardContent>
        <CardActions>
          <Button type="submit" form={formId} startIcon={<AddOutlined />}>
            Add
          </Button>
          <Button type="reset" form={formId} startIcon={<RestoreOutlined />}>
            Reset
          </Button>
        </CardActions>
      </>
    );
  };

  const renderTabContent = () => {
    if (activeTab === "list") {
      return renderList();
    }

    if (activeTab === "add") {
      return renderAdd();
    }
    return null;
  };

  return (
    <Card>
      <CardHeader title="Staff" />
      <Tabs
        value={activeTab}
        onChange={(_, v) => setActiveTab(v)}
        sx={{ borderBottom: (t) => `1px solid ${t.palette.divider}` }}
      >
        <Tab label="List" value={"list"} />
        <Tab label="Add" value="add" />
      </Tabs>
      {renderTabContent()}
    </Card>
  );
};
