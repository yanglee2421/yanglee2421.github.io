import {
  AddOutlined,
  CloseOutlined,
  OutputOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import * as mathjs from "mathjs";
import React from "react";
import { Link, useSearchParams } from "react-router";
import { db } from "@/lib/db";
import type { Invoice } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";

const columnHelper = createColumnHelper<Invoice>();

const columns = [
  columnHelper.display({
    id: "selection",
    header(props) {
      return (
        <Checkbox
          indeterminate={props.table.getIsSomeRowsSelected()}
          checked={props.table.getIsAllRowsSelected()}
          onChange={props.table.getToggleAllRowsSelectedHandler()}
        />
      );
    },
    cell(props) {
      return (
        <Checkbox
          checked={props.row.getIsSelected()}
          onChange={props.row.getToggleSelectedHandler()}
        />
      );
    },
  }),
  columnHelper.accessor("id", {}),
  columnHelper.accessor("amount", {}),
  columnHelper.accessor("staff", {
    cell(props) {
      return props.getValue().join(";");
    },
  }),
  columnHelper.accessor("note", {}),
  columnHelper.accessor("date", {
    cell(props) {
      return new Date(props.getValue()).toLocaleDateString();
    },
  }),
];

const cellPaddingMap = new Map<string, "checkbox" | "none" | "normal">([
  ["selection", "checkbox"],
]);

type SearchValue = {
  startDate: string;
  endDate: string;
  pageIndex: number;
  pageSize: number;
};

const useSearch = () =>
  useSearchParams({
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    pageIndex: "0",
    pageSize: "20",
  });

const searchParamsToSearchValue = (searchParams: URLSearchParams) => {
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const pageIndex = parseInt(searchParams.get("pageIndex") || "0", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);

  return { startDate, endDate, pageIndex, pageSize };
};

const renderDayjsValue = (value: string) => (value ? dayjs(value) : null);

type InvoiceTableProps = {
  onView: (rows: Invoice[]) => void;
};

const InvoiceTable = (props: InvoiceTableProps) => {
  // eslint-disable-next-line
  "use no memo";
  const [searchValue, setSearchValue] = React.useState<SearchValue | null>(
    null,
  );

  const [searchParams, setSearchParams] = useSearch();

  const search = searchValue || searchParamsToSearchValue(searchParams);

  const invoices = useLiveQuery(async () => {
    const count = await db.invoices
      .where("date")
      .between(
        dayjs(search.startDate).startOf("day").toISOString(),
        dayjs(search.endDate).endOf("day").toISOString(),
      )
      .count();
    const rows = await db.invoices
      .where("date")
      .between(
        dayjs(search.startDate).startOf("day").toISOString(),
        dayjs(search.endDate).endOf("day").toISOString(),
      )
      .toArray();
    return { rows, count };
  }, [search.startDate, search.endDate]);

  const data = React.useMemo(() => invoices?.rows || [], [invoices]);

  React.useEffect(() => {
    setSearchParams((p) => {
      const n = new URLSearchParams(p);

      n.set("startDate", search.startDate || "");
      n.set("endDate", search.endDate || "");
      n.set("pageIndex", search.pageIndex.toString());
      n.set("pageSize", search.pageSize.toString());

      return n;
    });
  }, [
    setSearchParams,
    search.startDate,
    search.endDate,
    search.pageIndex,
    search.pageSize,
  ]);

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    columns,
    data,
    getRowId: (r) => r.id.toString(),
    rowCount: invoices?.count || 0,

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
          <TableCell key={c.id} padding={cellPaddingMap.get(c.column.id)}>
            {c.getIsPlaceholder() ||
              flexRender(c.column.columnDef.cell, c.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <Card>
      <CardHeader title="Invoice" />
      <CardContent>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <DatePicker
              value={renderDayjsValue(search.startDate)}
              onChange={(e) => {
                setSearchValue((prev) => {
                  if (!prev) {
                    return {
                      startDate: e?.toISOString() || "",
                      endDate: search.endDate,
                      pageIndex: search.pageIndex,
                      pageSize: search.pageSize,
                    };
                  }

                  return {
                    ...prev,
                    startDate: e?.toISOString() || "",
                  };
                });
              }}
              slotProps={{
                textField: { fullWidth: true, label: "Date" },
                // field: { clearable: true },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <DatePicker
              value={renderDayjsValue(search.endDate)}
              onChange={(e) => {
                setSearchValue((prev) => {
                  if (!prev) {
                    return {
                      startDate: search.startDate,
                      endDate: e?.endOf("day").toISOString() || "",
                      pageIndex: search.pageIndex,
                      pageSize: search.pageSize,
                    };
                  }

                  return {
                    ...prev,
                    endDate: e?.endOf("day").toISOString() || "",
                  };
                });
              }}
              slotProps={{
                textField: { fullWidth: true, label: "Date" },
                // field: { clearable: true },
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            onClick={() => {
              const rows = table
                .getSelectedRowModel()
                .flatRows.map((i) => i.original);

              props.onView(rows);
            }}
            variant="contained"
            disabled={!table.getSelectedRowModel().flatRows.length}
          >
            View
          </Button>
          <Button
            disabled={!table.getSelectedRowModel().flatRows.length}
            startIcon={<OutputOutlined />}
            variant="outlined"
            href={encodeURI(
              "data:text/csv;charset=utf-8," +
                [
                  table
                    .getVisibleFlatColumns()
                    .filter((column) => column.accessorFn)
                    .map((column) => column.id)
                    .join(","),
                  ...table.getSelectedRowModel().rows.map((row) =>
                    table
                      .getVisibleFlatColumns()
                      .filter((column) => column.accessorFn)
                      .map((column) => {
                        const val = row.getValue(column.id);

                        if (Array.isArray(val)) {
                          return val.join("@");
                        }

                        if (column.id === "date") {
                          return new Date(Number(val)).toLocaleDateString();
                        }

                        return val;
                      })
                      .join(","),
                  ),
                ].join("\n"),
            )}
            download={new Date().toLocaleString() + ".csv"}
          >
            Output
          </Button>
          <Box sx={{ marginInlineEnd: "auto" }} />
          <Link to="/calculator">
            <Button startIcon={<AddOutlined />} variant="outlined" fullWidth>
              Add
            </Button>
          </Link>
        </Box>
      </CardContent>
      <TableContainer>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableCell
                    key={h.id}
                    padding={cellPaddingMap.get(h.column.id)}
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
        count={table.getRowCount()}
        page={table.getState().pagination.pageIndex}
        rowsPerPage={table.getState().pagination.pageSize}
        onPageChange={(e, idx) => {
          table.setPageIndex(idx);
          void e;
        }}
        onRowsPerPageChange={(e) => {
          table.setPageSize(Number.parseInt(e.target.value));
        }}
        rowsPerPageOptions={[20, 50, 100]}
      />
    </Card>
  );
};

type ResultPanelProps = {
  rows: Invoice[];
  onClose: () => void;
};

const ResultPanel = (props: ResultPanelProps) => {
  const staffs = [...new Set(props.rows.flatMap((i) => i.staff))];

  const map = new Map<string, string>();

  staffs.forEach((staff) => {
    map.set(
      staff,
      props.rows
        .filter((i) => i.staff.includes(staff))
        .reduce((r, i) => {
          return mathjs
            .add(
              mathjs.divide(
                mathjs.bignumber(i.amount),
                mathjs.bignumber(i.staff.length),
              ),
              mathjs.bignumber(r),
            )
            .toString();
        }, "0"),
    );
  });

  return (
    <Card>
      <CardHeader
        title="Result"
        action={
          <IconButton onClick={props.onClose} color="error">
            <CloseOutlined />
          </IconButton>
        }
      />
      <Table>
        <TableHead>
          <TableCell>STAFF</TableCell>
          <TableCell>AMOUNT</TableCell>
        </TableHead>
        <TableBody>
          {[...map.entries()].map((i) => (
            <TableRow key={i[0]}>
              <TableCell>{i[0]}</TableCell>
              <TableCell>{i[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export const Component = () => {
  const [rows, setRows] = React.useState<Invoice[] | null>(null);

  if (!rows) {
    return <InvoiceTable onView={setRows} />;
  }

  return <ResultPanel rows={rows} onClose={() => setRows(null)} />;
};
