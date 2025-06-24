import {
  AddOutlined,
  CloseOutlined,
  DeleteOutlined,
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
import { Link, useParams } from "react-router";
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
  columnHelper.display({
    id: "actions",
    header: () => <span>Actions</span>,
    cell: (info) => (
      <IconButton
        onClick={() => {
          db.invoices.delete(info.row.getValue("id"));
        }}
      >
        <DeleteOutlined color="error" />
      </IconButton>
    ),
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

const renderDayjsValue = (value: string) => (value ? dayjs(value) : null);
const initSearch = (): SearchValue => ({
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  pageIndex: 0,
  pageSize: 20,
});

type InvoiceTableProps = {
  onView: (rows: Invoice[]) => void;
  search: SearchValue;
  onSearchChange: React.Dispatch<React.SetStateAction<SearchValue>>;
};

const InvoiceTable = (props: InvoiceTableProps) => {
  "use no memo";

  const { search, onSearchChange: setSearchValue } = props;

  const params = useParams();

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
      /**
       * NOTE:
       * offset must be called before limit
       * if called limt before offset, it will not work as expected
       * it will limit the number of rows first, then offset the rows
       * this is same as SQL
       * @link https://dexie.org/docs/api-classes/Dexie.Table/offset#note
       */
      .offset(search.pageIndex * search.pageSize)
      .limit(search.pageSize)
      .toArray();
    return { rows, count };
  }, [search.startDate, search.endDate, search.pageIndex, search.pageSize]);

  const data = React.useMemo(() => invoices?.rows || [], [invoices]);

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
        <Grid container spacing={3}>
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
          <Button
            component={Link}
            to={`/${params.lang}/invoices/new`}
            startIcon={<AddOutlined />}
            variant="outlined"
            sx={{ marginInlineEnd: { sm: "auto" } }}
          >
            Add
          </Button>
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
        page={search.pageIndex}
        rowsPerPage={search.pageSize}
        onPageChange={(e, idx) => {
          void e;
          setSearchValue((prev) => {
            if (!prev) {
              return {
                startDate: search.startDate,
                endDate: search.endDate,
                pageIndex: idx,
                pageSize: search.pageSize,
              };
            }

            return {
              ...prev,
              pageIndex: idx,
            };
          });
        }}
        onRowsPerPageChange={(e) => {
          const pageSize = Number.parseInt(e.target.value);
          setSearchValue((prev) => {
            if (!prev) {
              return {
                startDate: search.startDate,
                endDate: search.endDate,
                pageIndex: search.pageIndex,
                pageSize,
              };
            }

            return {
              ...prev,
              pageSize,
            };
          });
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
  const [search, setSearchValue] = React.useState<SearchValue>(initSearch);

  if (!rows) {
    return (
      <InvoiceTable
        onView={setRows}
        search={search}
        onSearchChange={setSearchValue}
      />
    );
  }

  return <ResultPanel rows={rows} onClose={() => setRows(null)} />;
};
