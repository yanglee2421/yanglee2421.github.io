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
  Divider,
  TableSortLabel,
  Toolbar,
  TextField,
  Collapse,
} from "@mui/material";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getExpandedRowModel,
} from "@tanstack/react-table";
import React from "react";
import { useImmer } from "use-immer";
import { columns } from "./columns";
import { data } from "./data";
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
    manualPagination: false,

    // ** Section
    enableRowSelection: true,
    onRowSelectionChange,

    // ** Sorting
    getSortedRowModel: getSortedRowModel(),
    onSortingChange,
    manualSorting: false,

    // ** Filter
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onGlobalFilterChange,
    onColumnFiltersChange,
    manualFiltering: false,

    // ** Expland
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand() {
      return true;
    },

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
          draft.width = Math.floor(size.inlineSize / columns.length);
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
            {(() => {
              const list = [];

              for (let i = 0; i < columns.length; i++) {
                list.push(<col key={i} width={state.width} />);
              }

              return list;
            })()}
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
                <React.Fragment key={row.id}>
                  <TableRow>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          padding={
                            cell.column.id === "selection"
                              ? "checkbox"
                              : "normal"
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
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      padding="none"
                      sx={{
                        borderWidth: 0,
                      }}
                    >
                      <Collapse in={row.getIsExpanded()} enter unmountOnExit>
                        <Box sx={{ p: 4 }}>{JSON.stringify(row.original)}</Box>
                        <Divider sx={{ p: 0 }} />
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
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
          <Divider sx={{ p: 0 }} />
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
