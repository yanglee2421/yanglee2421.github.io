import { RefreshOutlined } from "@mui/icons-material";
import {
  Table as MuiTable,
  TableBody,
  TableHead,
  TableFooter,
  TableCell,
  TableRow,
  Box,
  TablePagination,
  TableSortLabel,
  Typography,
  Link,
  TextField,
  alpha,
  TableContainer,
  Button,
  Card,
  CardHeader,
  IconButton,
  Divider,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
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
import { codeToHtml } from "shiki";
import { ScrollView } from "@/components/ui/ScrollView";
import { columns } from "./columns";
import { data } from "./data";

export function Table() {
  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    getRowId(originalRow) {
      return originalRow.id.toString();
    },
    columns,
    data,

    // ** Pagination
    manualPagination: false,
    getPaginationRowModel: getPaginationRowModel(),
    rowCount: data.length,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
    },

    // ** Section
    enableRowSelection: true,
    enableMultiRowSelection: true,

    // ** Sorting
    manualSorting: false,
    enableSorting: true,
    enableMultiSort: true,
    getSortedRowModel: getSortedRowModel(),

    // ** Filter
    manualFiltering: false,
    enableGlobalFilter: true,
    enableFilters: true,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),

    // ** Expland
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand() {
      return true;
    },

    // ** Resize
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  });

  return (
    <>
      <Typography variant="h4">ApexCharts</Typography>
      <Typography>
        <code>react-apexcharts</code> is a third-party library. Please refer to
        its{" "}
        <Link href="https://apexcharts.com" target="_blank">
          official documentation
        </Link>{" "}
        for more details.
      </Typography>
      <Card sx={{ mt: 6 }}>
        <CardHeader
          title="Table"
          action={
            <IconButton>
              <RefreshOutlined />
            </IconButton>
          }
        />
        <Divider />
        <Box
          sx={{
            padding: 5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            label="Golbal Filter"
            value={table.getState().globalFilter}
            onChange={(evt) => {
              table.setGlobalFilter(evt.target.value);
            }}
            size="small"
          />
          <Button
            disabled={
              !(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected())
            }
            LinkComponent={"a"}
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
                      .map((column) => row.getValue(column.id))
                      .join(","),
                  ),
                ].join("\n"),
            )}
            download={Date.now() + ".csv"}
            sx={{
              marginLeft: "auto",
            }}
            variant="contained"
          >
            export
          </Button>
        </Box>
        <TableContainer>
          <ScrollView>
            <MuiTable
              sx={{
                minWidth(theme) {
                  return theme.breakpoints.values.lg;
                },
              }}
            >
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => {
                  return (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        const canSort = header.column.getCanSort();
                        const isSorted = header.column.getIsSorted();
                        const isResizing = header.column.getIsResizing();
                        const resizeHandler = header.getResizeHandler();
                        const cellNode =
                          header.isPlaceholder ||
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          );

                        return (
                          <TableCell
                            key={header.id}
                            colSpan={header.colSpan}
                            padding={
                              header.id === "selection" ? "checkbox" : "normal"
                            }
                            width={header.getSize()}
                            sx={{
                              position: "relative",
                              bgcolor: "#f6f7fb",
                            }}
                          >
                            {canSort ? (
                              <TableSortLabel
                                active={!!isSorted}
                                onClick={header.column.getToggleSortingHandler()}
                                disabled={!canSort}
                                direction={isSorted || void 0}
                              >
                                {cellNode}
                              </TableSortLabel>
                            ) : (
                              cellNode
                            )}
                            {header.column.getCanFilter() && (
                              <>
                                <TextField
                                  value={header.column.getFilterValue()}
                                  onChange={(evt) => {
                                    header.column.setFilterValue(
                                      evt.target.value,
                                    );
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
                                    header.column
                                      .getFacetedUniqueValues()
                                      .keys(),
                                  )
                                    .sort()
                                    .map((item) => {
                                      return (
                                        <option
                                          key={item}
                                          value={item}
                                        ></option>
                                      );
                                    })}
                                </datalist>
                              </>
                            )}

                            {header.column.getCanResize() && (
                              <Box
                                component={"div"}
                                onMouseDown={resizeHandler}
                                onTouchStart={resizeHandler}
                                sx={{
                                  position: "absolute",
                                  right: 0,
                                  top: 0,
                                  height: "100%",
                                  width: 3,
                                  background: isResizing
                                    ? "blue"
                                    : alpha("#000", 0.5),
                                  cursor: "col-resize",
                                  userSelect: "none",
                                  touchAction: "none",
                                  opacity: isResizing ? 1 : 0,
                                  transition(theme) {
                                    return theme.transitions.create("opacity");
                                  },
                                }}
                              ></Box>
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
                      <TableRow selected={row.getIsSelected()} hover>
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
                      {row.getIsExpanded() && (
                        <TableRow>
                          <TableCell colSpan={columns.length}>
                            <Code
                              code={JSON.stringify(row.original, null, 2)}
                            />
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
              <TableFooter>
                {table.getFooterGroups().map((footerGroup) => {
                  return (
                    <TableRow
                      key={footerGroup.id}
                      sx={{
                        "&:last-of-type > td": {
                          border: 0,
                        },
                      }}
                    >
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
          </ScrollView>
        </TableContainer>

        <TablePagination
          component={"div"}
          count={table.getRowCount()}
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
      </Card>
    </>
  );
}

function Code(props: { code: string }) {
  const query = useQuery({
    queryKey: ["shiki", props.code],
    queryFn() {
      return codeToHtml(props.code, {
        lang: "json",
        theme: "dark-plus",
      });
    },
  });

  if (query.isPending) {
    return <Typography>pending...</Typography>;
  }

  if (query.isError) {
    return (
      <Typography sx={{ color: "error" }}>{query.error.message}</Typography>
    );
  }

  return (
    <ScrollView>
      <div dangerouslySetInnerHTML={{ __html: query.data }}></div>
    </ScrollView>
  );
}
