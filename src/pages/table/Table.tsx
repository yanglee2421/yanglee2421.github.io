import {
  TableContainer,
  Table as MuiTable,
  TableBody,
  TableHead,
  TableFooter,
  TableCell,
  TableRow,
  Paper,
  Box,
  TablePagination,
  Checkbox,
  Divider,
  TableSortLabel,
  Toolbar,
  TextField,
} from "@mui/material";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";
import React from "react";
import { useImmer } from "use-immer";
import { data } from "./data";
import type { DataType } from "./data";
import type {
  RowSelectionState,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";

export function Table() {
  const [pagination, onPaginationChange] = React.useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const [rowSelection, onRowSelectionChange] =
    React.useState<RowSelectionState>({});

  const [sorting, onSortingChange] = React.useState<SortingState>([]);

  const [globalFilter, onGlobalFilterChange] = React.useState("");
  const [columnFilters, onColumnFiltersChange] =
    React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),

    // ** Pagination
    getPaginationRowModel: getPaginationRowModel(),
    rowCount: data.length,
    onPaginationChange,

    // ** Section
    enableRowSelection: true,
    onRowSelectionChange,

    // ** Sorting
    getSortedRowModel: getSortedRowModel(),
    onSortingChange,

    // ** Filter
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onGlobalFilterChange,
    onColumnFiltersChange,

    state: {
      pagination,
      rowSelection,
      sorting,
      globalFilter,
      columnFilters,
    },
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
    <Paper sx={{ m: 6 }}>
      <Toolbar>
        <TextField
          label="Golbal Filter"
          value={globalFilter}
          onChange={(evt) => {
            onGlobalFilterChange(evt.target.value);
          }}
          size="small"
          variant="filled"
        />
      </Toolbar>
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
                    if (header.column.getCanSort()) {
                      return (
                        <TableCell
                          key={header.id}
                          colSpan={header.colSpan}
                          padding={
                            header.id === "selection" ? "checkbox" : "normal"
                          }
                        >
                          <TableSortLabel
                            active={!!header.column.getIsSorted()}
                            onClick={header.column.getToggleSortingHandler()}
                            disabled={!header.column.getCanSort()}
                            direction={header.column.getIsSorted() || void 0}
                          >
                            {header.isPlaceholder ||
                              flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                          </TableSortLabel>
                          <TextField
                            value={header.column.getFilterValue()}
                            onChange={(evt) => {
                              header.column.setFilterValue(evt.target.value);
                            }}
                            placeholder={`Search... (${header.column.getFacetedUniqueValues().size})`}
                            variant="standard"
                            size="small"
                            inputProps={{
                              list: header.column.id,
                            }}
                          />
                          <datalist id={header.column.id}>
                            {Array.from(
                              header.column.getFacetedUniqueValues().keys(),
                            )
                              .sort()
                              .map((item) => {
                                return (
                                  <option key={item} value={item}></option>
                                );
                              })}
                          </datalist>
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell
                        key={header.id}
                        colSpan={header.colSpan}
                        padding={
                          header.id === "selection" ? "checkbox" : "normal"
                        }
                      >
                        {header.isPlaceholder ||
                          flexRender(
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
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        padding={
                          cell.column.id === "selection" ? "checkbox" : "normal"
                        }
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
          <TableFooter>
            {table.getFooterGroups().map((footerGroup) => {
              return (
                <TableRow key={footerGroup.id}>
                  {footerGroup.headers.map((header) => {
                    return (
                      <TableCell
                        key={header.id}
                        colSpan={header.colSpan}
                        padding={
                          header.column.id === "selection"
                            ? "checkbox"
                            : "normal"
                        }
                        sx={{ border: 0 }}
                      >
                        {header.isPlaceholder ||
                          flexRender(
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
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            bgcolor(theme) {
              return theme.palette.background.paper;
            },
            borderRadius(theme) {
              return theme.shape.borderRadius;
            },
          }}
        >
          <Divider sx={{ p: 0 }}></Divider>
          <TablePagination
            component={"div"}
            count={table.getPrePaginationRowModel().rows.length}
            rowsPerPageOptions={[20, 50, 100]}
            page={table.getState().pagination.pageIndex}
            rowsPerPage={table.getState().pagination.pageSize}
            onPageChange={(evt, page) => {
              void evt;
              table.setPageIndex(page);
            }}
            onRowsPerPageChange={(evt) => {
              table.setPageSize(Number.parseInt(evt.target.value) || 20);
            }}
          />
        </Box>
      </TableContainer>
    </Paper>
  );
}

const columnHelper = createColumnHelper<DataType>();

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
          indeterminate={props.row.getIsSomeSelected()}
          checked={props.row.getIsSelected()}
          onChange={props.row.getToggleSelectedHandler()}
          disabled={!props.row.getCanSelect()}
        />
      );
    },
    footer(props) {
      return (
        <Checkbox
          indeterminate={props.table.getIsSomeRowsSelected()}
          checked={props.table.getIsAllRowsSelected()}
          onChange={props.table.getToggleAllRowsSelectedHandler()}
        />
      );
    },
  }),
  columnHelper.display({
    id: "index",
    header() {
      return "Index";
    },
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
      return info.getValue();
    },
    footer() {
      return "#ID";
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
