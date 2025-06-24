import { AddOutlined, DeleteOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Link,
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
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { useParams, Link as RouterLink } from "react-router";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import type { Staff } from "@/lib/db";

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

const initSearch = () => ({
  name: "",
  pageIndex: 0,
  pageSize: 20,
});

export const Component = () => {
  "use no memo";
  const [search, setSearchValue] = React.useState<SearchValue>(initSearch);

  const params = useParams();

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

  return (
    <Card>
      <CardHeader title="Staff" />
      <CardContent>
        <Grid container spacing={3}>
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
      <Divider />
      <CardContent>
        <Button
          startIcon={<AddOutlined />}
          variant="contained"
          component={RouterLink}
          to={`/${params.lang}/staff/new`}
        >
          Add
        </Button>
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
    </Card>
  );
};
