import { type Invoice, useDbStore } from "@/hooks/store/useDbStore";
import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Grid2,
  IconButton,
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
import { DatePicker } from "@mui/x-date-pickers";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import * as mathjs from "mathjs";
import React from "react";
import { useSearchParams } from "react-router";

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

const cellPaddingMap = new Map<string, "checkbox" | "none" | "normal">([[
  "selection",
  "checkbox",
]]);

const checkDate = (day: string | null, time: number) => {
  if (!day) return true;
  return new Date(+day).toDateString() === new Date(time).toDateString();
};

const checkStaff = (staff: string | null, staffs: string[]) => {
  if (!staff) return true;
  return staffs.join("").toLowerCase().includes(staff.toLowerCase());
};

const checkText = (search: string | null, target: string) => {
  if (!search) return true;
  return target.toLowerCase().includes(search.toLowerCase());
};

export const Invoices = () => {
  const [searchParams] = useSearchParams();

  const ids = searchParams.get("ids");

  if (!ids) {
    return <InvoiceTable />;
  }

  return <ResultPanel />;
};

const ResultPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const ids = searchParams.get("ids")?.split("@") || [];
  const invoices = useDbStore((s) => s.invoices);
  const rows = invoices.filter((i) => ids.includes(i.id + ""));
  const allStaffs = [...new Set(rows.flatMap((i) => i.staff))];

  const map = new Map<string, string>();

  allStaffs.forEach((s) => {
    map.set(
      s,
      rows.filter((i) => i.staff.includes(s)).reduce((r, i) => {
        return mathjs.add(
          mathjs.divide(
            mathjs.bignumber(i.amount),
            mathjs.bignumber(i.staff.length),
          ),
          mathjs.bignumber(r),
        ).toString();
      }, "0"),
    );
  });

  return (
    <Card>
      <CardHeader
        title="Result"
        action={
          <IconButton
            onClick={() => {
              setSearchParams((p) => {
                const n = new URLSearchParams(p);
                n.delete("ids");
                return n;
              });
            }}
            color="error"
          >
            <CloseOutlined />
          </IconButton>
        }
      />
      <Table>
        <TableHead>
          <TableCell>Staff</TableCell>
          <TableCell>Amount</TableCell>
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

const InvoiceTable = () => {
  const invoices = useDbStore((s) => s.invoices);
  const [search, setSearch] = useSearchParams({
    date: "",
    staff: "",
    note: "",
  });

  const date = search.get("date");
  const staff = search.get("staff");
  const note = search.get("note");

  const data = React.useMemo(() => {
    return invoices.filter((i) =>
      checkDate(date, i.date) && checkStaff(staff, i.staff) &&
      checkText(note, i.note)
    );
  }, [date, staff, invoices, note]);

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    columns,
    data,
    getRowId: (r) => r.id + "",

    getPaginationRowModel: getPaginationRowModel(),
    rowCount: data.length,

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
            padding={cellPaddingMap.get(c.column.id)}
          >
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
        <Grid2 container spacing={6}>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              value={staff}
              onChange={(e) =>
                setSearch((p) => {
                  const n = new URLSearchParams(p);
                  n.set("staff", e.target.value);
                  return n;
                })}
              fullWidth
              label="Staff"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              value={note}
              onChange={(e) =>
                setSearch((p) => {
                  const n = new URLSearchParams(p);
                  n.set("note", e.target.value);
                  return n;
                })}
              fullWidth
              label="Note"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <DatePicker
              value={date ? dayjs(Number.parseInt(date)) : null}
              onChange={(e) => {
                setSearch((p) => {
                  const n = new URLSearchParams(p);
                  const val = e?.toDate().getTime();
                  void [val ? n.set("date", val + "") : n.delete("date")];
                  return n;
                });
              }}
              slotProps={{
                textField: { fullWidth: true, label: "Date" },
                field: { clearable: true },
              }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Box>
              <Button
                onClick={() => {
                  const rows = table.getSelectedRowModel().flatRows.map((i) =>
                    i.original
                  );

                  setSearch((s) => {
                    const n = new URLSearchParams(s);
                    n.set("ids", rows.map((i) => i.id).join("@"));
                    return n;
                  });
                }}
                variant="contained"
              >
                View
              </Button>
            </Box>
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
          <TableBody>
            {renderBody()}
          </TableBody>
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
