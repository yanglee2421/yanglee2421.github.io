import {
  TableContainer,
  Table as MuiTable,
  TableBody,
  TableHead,
  TableFooter,
  TableCell,
  TableRow,
  Paper,
  Link,
  Typography,
  Box,
  TablePagination,
} from "@mui/material";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import React from "react";
import { useImmer } from "use-immer";
import { data } from "./data";
import type { DataType } from "./data";

export function Table() {
  const [pagination, onPaginationChange] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),

    // ** Pagination
    getPaginationRowModel: getPaginationRowModel(),
    rowCount: data.length,
    state: {
      pagination,
    },
    onPaginationChange,
  });

  const [state, updateState] = useImmer({
    width: 0,
  });

  const colgroupRef = React.useRef<HTMLTableColElement>(null);

  React.useEffect(() => {
    const colgroupEl = colgroupRef.current;

    if (!(colgroupEl instanceof HTMLTableColElement)) {
      return;
    }

    const observer = new ResizeObserver(([{ contentBoxSize }]) => {
      React.startTransition(() => {
        updateState((draft) => {
          const [size] = contentBoxSize;
          draft.width = Math.floor(size.inlineSize / 6);
        });
      });
    });

    observer.observe(colgroupEl);

    return () => {
      observer.disconnect();
    };
  }, [updateState]);

  return (
    <Paper>
      <TableContainer sx={{ overflow: "visible" }}>
        <MuiTable stickyHeader>
          <colgroup ref={colgroupRef}>
            <col width={state.width} />
            <col width={state.width} />
            <col width={state.width} />
            <col width={state.width} />
            <col width={state.width} />
            <col width={state.width} />
          </colgroup>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableCell key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row, idx) => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        sx={{
                          borderBottom() {
                            if (idx + 1 === table.getRowCount()) {
                              return 0;
                            }
                          },
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter
            sx={{
              position: "sticky",
              bottom: 0,
              bgcolor(theme) {
                return theme.palette.background.paper;
              },
            }}
          >
            {table.getFooterGroups().map((footerGroup) => {
              return (
                <TableRow key={footerGroup.id}>
                  {footerGroup.headers.map((header) => {
                    return (
                      <TableCell
                        key={header.id}
                        sx={{
                          borderTop(theme) {
                            return `1px solid ${theme.palette.divider}`;
                          },
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.footer,
                              header.getContext(),
                            )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableFooter>
        </MuiTable>
      </TableContainer>
      <TablePagination
        component={"div"}
        count={table.getRowCount()}
        page={table.getState().pagination.pageIndex}
        rowsPerPage={table.getState().pagination.pageSize}
        onPageChange={(evt, page) => {
          void evt;
          table.setPageIndex(page);
        }}
        onRowsPerPageChange={(evt) => {
          table.setPageSize(Number.parseInt(evt.target.value) || 10);
        }}
      />
    </Paper>
  );
}

const columnHelper = createColumnHelper<DataType>();

const columns = [
  columnHelper.display({
    header: "index",
    cell(props) {
      return props.row.index;
    },
    footer(props) {
      return props.header.id;
    },
  }),
  columnHelper.accessor("id", {
    header: "ID",
    cell(info) {
      return (
        <Box height={100}>
          <Typography>{info.row.original.age}</Typography>
          <Link>{info.getValue()}</Link>
        </Box>
      );
    },
  }),
  columnHelper.accessor("fullName", {
    header: "Name",
    cell(info) {
      return info.getValue();
    },
    footer() {
      return "Name footer";
    },
  }),
  columnHelper.accessor("email", {
    cell: (info) => info.getValue(),
    header: "Email",
    footer() {
      return "email footer";
    },
  }),
  columnHelper.accessor("start_date", {
    cell: (info) => info.getValue(),
    header: "Date",
  }),
  columnHelper.accessor("experience", {
    cell: (info) => info.getValue(),
    header: "Experience",
  }),
  columnHelper.accessor("age", {
    cell: (info) => info.getValue(),
    header: "Age",
  }),
];
