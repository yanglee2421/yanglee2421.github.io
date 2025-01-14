import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import { getOptions } from "./queryOvertime";
import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import {
  CheckBoxOutlined,
  CheckOutlined,
  CloseOutlined,
  RefreshOutlined,
} from "@mui/icons-material";
import {
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import classNames from "classnames";
import { Add } from "./Add";

export function Overtime() {
  const user = useCurrentUser();
  const query = useQuery(getOptions({ userId: user?.uid || "" }));
  const data = React.useMemo(() => query.data?.docs || [], [query.data]);
  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    columns,
    data,
    getRowId(originalRow) {
      return originalRow.id;
    },
  });

  return query.isSuccess && (
    <div>
      <Card>
        <CardHeader
          title="overtime"
          titleTypographyProps={{ sx: { textTransform: "uppercase" } }}
          subheader="overtime table here"
          action={
            <IconButton
              onClick={() => {
                query.refetch();
              }}
              disabled={query.isRefetching}
            >
              <RefreshOutlined
                className={classNames(query.isRefetching && "animate-spin")}
              />
            </IconButton>
          }
        />
        <CardContent>
          <Stack direction={"row"} spacing={4}>
            <Add />
            <Button
              variant="outlined"
              disabled={!table.getSelectedRowModel().rows.length}
              startIcon={<CheckBoxOutlined />}
            >
              use
            </Button>
          </Stack>
        </CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((h) => (
                    <TableCell
                      key={h.id}
                      padding={h.column.id === "check" ? "checkbox" : "normal"}
                      sx={() => ({
                        textTransform: "uppercase",
                      })}
                    >
                      {h.isPlaceholder ||
                        flexRender(h.column.columnDef.header, h.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((r) => (
                <TableRow key={r.id}>
                  {r.getVisibleCells().map((c) => (
                    <TableCell
                      key={c.id}
                      padding={c.column.id === "check" ? "checkbox" : "normal"}
                    >
                      {c.getIsPlaceholder() ||
                        flexRender(c.column.columnDef.cell, c.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component={"div"}
          page={0}
          count={query.data.size}
          rowsPerPage={20}
          rowsPerPageOptions={[20, 50, 100]}
          onPageChange={Boolean}
          onRowsPerPageChange={Boolean}
        />
      </Card>
    </div>
  );
}

const columnHelper = createColumnHelper<
  QueryDocumentSnapshot<DocumentData, DocumentData>
>();

const columns = [
  columnHelper.display({
    id: "check",
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
  columnHelper.display({
    id: "date",
    header: "date",
    cell(props) {
      return props.row.original.data().date?.toDate().toLocaleDateString();
    },
  }),
  columnHelper.display({
    id: "hours",
    header: "hours",
    cell(props) {
      return props.row.original.data().hours;
    },
  }),
  columnHelper.display({
    id: "enable",
    header: "enable",
    cell(props) {
      return props.row.original.data().enable
        ? <CheckOutlined color="success" />
        : <CloseOutlined />;
    },
  }),
];
