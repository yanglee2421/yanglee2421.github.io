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
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { z } from "zod";
import { db } from "@/lib/db";
import { warn } from "@/lib/utils";
import { useLiveQuery } from "dexie-react-hooks";
import type { Staff } from "@/lib/db";

const schema = z.object({
  name: z.string().min(1),
  alias: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

const columnHelper = createColumnHelper<Staff>();

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

type SearchValue = {
  name: string;
  pageIndex: number;
  pageSize: number;
};

const searchParamsToSearchValue = (searchParams: URLSearchParams) => {
  const name = searchParams.get("name") || "";
  const pageIndex = Number(searchParams.get("pageIndex") || "0");
  const pageSize = Number(searchParams.get("pageSize") || "20");

  return { name, pageIndex, pageSize };
};

const useAddForm = () =>
  useForm<FormValues>({
    defaultValues: {
      name: "",
      alias: "",
    },
    resolver: zodResolver(schema),
  });

const useSearch = () =>
  useSearchParams({
    name: "",
    pageIndex: "0",
    pageSize: "20",
  });

export const Component = () => {
  // eslint-disable-next-line
  "use no memo";
  const [activeTab, setActiveTab] = React.useState("list");
  const [searchValue, setSearchValue] = React.useState<SearchValue | null>(
    null,
  );

  const form = useAddForm();
  const [searchParams, setSearchParams] = useSearch();

  const search = searchValue || searchParamsToSearchValue(searchParams);

  const staff = useLiveQuery(async () => {
    const count = await db.staffs.where("name").startsWith(search.name).count();
    const rows = await db.staffs
      .where("name")
      .startsWith(search.name)
      .offset(search.pageIndex * search.pageSize)
      .limit(search.pageSize)
      .toArray();

    return { rows, count };
  }, [search.name, search.pageIndex, search.pageSize]);

  const data = React.useMemo(() => staff?.rows || [], [staff]);

  React.useEffect(() => {
    setSearchParams((p) => {
      const n = new URLSearchParams(p);

      n.set("name", search.name);
      n.set("pageIndex", search.pageIndex.toString());
      n.set("pageSize", search.pageSize.toString());

      return n;
    });
  }, [setSearchParams, search.name, search.pageIndex, search.pageSize]);

  const formId = React.useId();

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    columns,
    data,
    getRowId: (r) => r.id.toString(),
    rowCount: staff?.count || 0,
    manualPagination: true,
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

  const renderList = () => {
    return (
      <>
        <CardContent>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                value={search.name}
                onChange={(e) =>
                  setSearchValue((prev) => {
                    if (!prev) {
                      return {
                        name: e.target.value,
                        pageIndex: search.pageIndex,
                        pageSize: search.pageSize,
                      };
                    }

                    return { ...prev, name: e.target.value };
                  })
                }
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
          page={search.pageIndex}
          rowsPerPage={search.pageSize}
          rowsPerPageOptions={[20, 50, 100]}
          onPageChange={(e, idx) => {
            void e;

            setSearchValue((prev) => {
              if (!prev) {
                return {
                  name: search.name,
                  pageIndex: idx,
                  pageSize: search.pageSize,
                };
              }

              return { ...prev, pageIndex: idx };
            });
          }}
          onRowsPerPageChange={(e) => {
            setSearchValue((prev) => {
              if (!prev) {
                return {
                  name: search.name,
                  pageIndex: search.pageIndex,
                  pageSize: Number(e.target.value),
                };
              }

              return { ...prev, pageSize: Number(e.target.value) };
            });
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
