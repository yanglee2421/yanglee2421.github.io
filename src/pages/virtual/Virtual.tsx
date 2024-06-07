import { Box, alpha, Collapse, styled } from "@mui/material";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { JsonBlock } from "@/components/ui/JsonBlock";
import { ScrollView } from "@/components/ui/ScrollView";
import { columns } from "./columns";
import { data } from "./data";
import type { DataType } from "./data";
import type { Row } from "@tanstack/react-table";

export function Virtual() {
  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    columns,
    data,

    enableColumnResizing: true,
    columnResizeMode: "onChange",
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand() {
      return true;
    },
  });

  const { rows } = table.getRowModel();

  const virtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize() {
      return 54;
    },
    overscan: 5,
  });

  return (
    <Box
      sx={{
        display: "grid",
        width: table.getTotalSize(),
        borderWidth: 0,
        borderTop: 1,
        borderRight: 1,
        borderStyle: "solid",
        borderColor(theme) {
          return theme.palette.divider;
        },
      }}
    >
      {/* Table Head */}
      <Box
        sx={{
          display: "grid",
        }}
      >
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <Box
              key={headerGroup.id}
              sx={{
                display: "flex",
              }}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <Box
                    key={header.id}
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      width: header.getSize(),
                      borderWidth: 0,
                      borderBottom: 1,
                      borderLeft: 1,
                      borderStyle: "solid",
                      borderColor(theme) {
                        return theme.palette.divider;
                      },
                    }}
                  >
                    {header.isPlaceholder ||
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    {header.column.getCanResize() && (
                      <Box
                        component={"div"}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        sx={{
                          position: "absolute",
                          right: 0,
                          top: 0,
                          height: "100%",
                          width: 3,
                          background: header.column.getIsResizing()
                            ? "blue"
                            : alpha("#000", 0.5),
                          cursor: "col-resize",
                          userSelect: "none",
                          touchAction: "none",
                          opacity: header.column.getIsResizing() ? 1 : 0,
                          transition(theme) {
                            return theme.transitions.create("opacity");
                          },
                        }}
                      ></Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>

      {/* Table Body */}
      <Box
        sx={{
          position: "relative",
          display: "grid",
          height: virtualizer.getTotalSize(),
        }}
      >
        {virtualizer.getVirtualItems().map((item) => {
          const row = rows[item.index] as Row<DataType>;

          return (
            <Box
              key={row.id}
              ref={virtualizer.measureElement}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                height: item.size,
                transform: `translateY(${item.start}px)`,
              }}
            >
              <Box sx={{ display: "flex", height: "100%" }}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Box
                      key={cell.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: cell.column.getSize(),
                        paddingInline: 3,
                        borderWidth: 0,
                        borderBottom: 1,
                        borderLeft: 1,
                        borderStyle: "solid",
                        borderColor(theme) {
                          return theme.palette.divider;
                        },
                      }}
                    >
                      <Box
                        component={"span"}
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              {row.getCanExpand() && (
                <Collapse
                  in={row.getIsExpanded()}
                  onTransitionEnd={() => {
                    virtualizer.measure();
                    virtualizer._willUpdate();
                  }}
                >
                  <ScrollView
                    options={{
                      suppressScrollY: true,
                    }}
                  >
                    <StyledJsonBlock jsonData={row.original} />
                  </ScrollView>
                </Collapse>
              )}
            </Box>
          );
        })}
        {/* <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: `translateY(${virtualizer.getVirtualItems()[0]?.start || 0}px)`,
          }}
        >
          {virtualizer.getVirtualItems().map((item) => {
            const row = rows[item.index] as Row<DataType>;

            return (
              <Box key={row.id} ref={virtualizer.measureElement}>
                <Box sx={{ display: "flex" }}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Box
                        key={cell.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: cell.column.getSize(),
                          paddingInline: 3,
                          borderWidth: 0,
                          borderBottom: 1,
                          borderLeft: 1,
                          borderStyle: "solid",
                          borderColor(theme) {
                            return theme.palette.divider;
                          },
                        }}
                      >
                        <Box
                          component={"span"}
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>

                {row.getCanExpand() && (
                  <Collapse
                    in={row.getIsExpanded()}
                    onTransitionEnd={() => {
                      virtualizer.measure();
                    }}
                  >
                    <ScrollView
                      options={{
                        suppressScrollY: true,
                      }}
                    >
                      <JsonBlock jsonData={row.original} />
                    </ScrollView>
                  </Collapse>
                )}
              </Box>
            );
          })}
        </Box> */}
      </Box>
    </Box>
  );
}

const StyledJsonBlock = styled(JsonBlock)({ margin: 0 });
