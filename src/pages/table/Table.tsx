import { useSuspenseQuery } from "@tanstack/react-query";
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
      <h4>ApexCharts</h4>
      <p>
        <code>react-apexcharts</code> is a third-party library. Please refer to
        its{" "}
        <a href="https://apexcharts.com" target="_blank">
          official documentation
        </a>{" "}
        for more details.
      </p>

      <hr />

      <input
        value={table.getState().globalFilter}
        onChange={(evt) => {
          table.setGlobalFilter(evt.target.value);
        }}
      />
      <a
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
      >
        export
      </a>

      <ScrollView>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const cellNode =
                      header.isPlaceholder ||
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      );

                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        {cellNode}
                        {header.column.getCanFilter() && (
                          <>
                            <input
                              value={header.column.getFilterValue() + ""}
                              onChange={(evt) => {
                                header.column.setFilterValue(evt.target.value);
                              }}
                              placeholder={`Search... (${header.column.getFacetedUniqueValues().size})`}
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
                          </>
                        )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <React.Fragment key={row.id}>
                  <tr>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      );
                    })}
                  </tr>
                  {row.getIsExpanded() && (
                    <tr>
                      <td colSpan={columns.length}>
                        <React.Suspense>
                          <Code code={JSON.stringify(row.original, null, 2)} />
                        </React.Suspense>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => {
              return (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => {
                    return (
                      <td key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ||
                          flexRender(
                            header.column.columnDef.footer,
                            header.getContext(),
                          )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tfoot>
        </table>
      </ScrollView>
    </>
  );
}

function Code(props: { code: string }) {
  const query = useSuspenseQuery({
    queryKey: ["shiki", props.code],
    queryFn() {
      return codeToHtml(props.code, {
        lang: "json",
        theme: "dark-plus",
      });
    },
  });

  return (
    <ScrollView>
      <div dangerouslySetInnerHTML={{ __html: query.data }}></div>
    </ScrollView>
  );
}
