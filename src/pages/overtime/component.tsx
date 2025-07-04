import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
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
  CircularProgress,
  Divider,
  IconButton,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TableContainer,
  LinearProgress,
} from "@mui/material";
import {
  CheckBoxOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  RefreshOutlined,
} from "@mui/icons-material";
import classNames from "classnames";
import { Add } from "./Add";
import {
  fetchOvertime,
  fetchUserByFirebase,
  useDeleteOvertime,
  useOvertime,
} from "@/api/netlify";
import type { Overtime } from "@/api/netlify";
import { Loading } from "@/components/loading";
import { useDialogs } from "@toolpad/core";

const columnHelper = createColumnHelper<Overtime>();

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
  columnHelper.accessor("id", {
    header: "ID",
    cell({ getValue }) {
      return (
        <Link underline="none">
          #{getValue().slice(0, 6).toLocaleUpperCase()}
        </Link>
      );
    },
  }),
  columnHelper.accessor("date", {
    header: "date",
    cell({ getValue }) {
      return new Date(getValue()).toLocaleString();
    },
  }),
  columnHelper.accessor("hours", {
    header: "hours",
    cell({ getValue }) {
      return getValue();
    },
  }),
  columnHelper.accessor("reason", {
    header: "reason",
    cell({ getValue }) {
      return getValue();
    },
  }),
  columnHelper.accessor("redeemed", {
    header: "redeemed",
    cell({ getValue }) {
      return getValue() ? <CheckOutlined color="success" /> : <CloseOutlined />;
    },
  }),
];

export const Component = () => {
  "use no memo";

  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(20);

  const user = useCurrentUser();
  const update = useOvertime();
  const dialogs = useDialogs();
  const deleteOvertime = useDeleteOvertime();
  const auth = useQuery({
    ...fetchUserByFirebase({
      data: {
        firebaseId: user?.uid || "",
        name: user?.displayName || "",
      },
    }),
    enabled: !!user?.uid,
  });

  const overtime = useQuery({
    ...fetchOvertime({
      params: {
        pageIndex,
        pageSize,
      },
    }),
    enabled: !!auth.data?.data.token,
    placeholderData: keepPreviousData,
  });

  const data = React.useMemo(
    () => overtime.data?.data.rows || [],
    [overtime.data],
  );
  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    columns,
    data,
    getRowId: (originalRow) => originalRow.id,
    rowCount: overtime.data?.data.count,
  });

  const handleUse = async () => {
    const confirmed = await dialogs.confirm("Are you sure ?");
    if (!confirmed) return;

    update.mutate({
      data: {
        rows: table
          .getSelectedRowModel()
          .rows.map((r) => ({ id: r.original.id, redeemed: true })),
      },
    });
  };

  const handleDelete = async () => {
    const confirmed = await dialogs.confirm("Confirm delete ?");
    if (!confirmed) return;

    deleteOvertime.mutate({
      data: {
        id: table.getSelectedRowModel().rows.map((r) => r.original.id),
      },
    });
  };

  const renderTableBody = () => {
    if (overtime.isPending) {
      return (
        <TableRow>
          <TableCell colSpan={table.getAllLeafColumns().length}>
            <Loading />
          </TableCell>
        </TableRow>
      );
    }

    if (overtime.isError) {
      return (
        <TableRow>
          <TableCell colSpan={table.getAllLeafColumns().length}>
            <Typography color="error" textAlign={"center"}>
              Error loading data
            </Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (overtime.data.data.rows.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={table.getAllLeafColumns().length}>
            <Typography textAlign={"center"}>No data available</Typography>
          </TableCell>
        </TableRow>
      );
    }

    return table.getRowModel().rows.map((r) => (
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
    ));
  };

  return (
    <Card>
      <CardHeader
        title="overtime"
        subheader="overtime table here"
        action={
          <IconButton
            onClick={() => {
              overtime.refetch();
            }}
            disabled={overtime.isRefetching}
          >
            <RefreshOutlined
              className={classNames(overtime.isRefetching && "animate-spin")}
            />
          </IconButton>
        }
      />
      <Divider />
      <CardContent>
        <Stack direction={"row"} spacing={2}>
          <Add />
          <Button
            variant="outlined"
            disabled={!table.getSelectedRowModel().rows.length}
            startIcon={
              update.isPending ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <CheckBoxOutlined />
              )
            }
            onClick={handleUse}
          >
            use
          </Button>
          <Button
            variant="outlined"
            color="error"
            disabled={!table.getSelectedRowModel().rows.length}
            startIcon={
              deleteOvertime.isPending ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <DeleteOutlined />
              )
            }
            onClick={handleDelete}
          >
            delete
          </Button>
        </Stack>
      </CardContent>
      {overtime.isFetching && <LinearProgress />}
      <TableContainer>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableCell
                    key={h.id}
                    padding={h.column.id === "check" ? "checkbox" : "normal"}
                    sx={{ textTransform: "uppercase" }}
                  >
                    {h.isPlaceholder ||
                      flexRender(h.column.columnDef.header, h.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </TableContainer>
      <Divider />
      <TablePagination
        component={"div"}
        page={pageIndex}
        count={table.getRowCount()}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[20, 50, 100]}
        onPageChange={(e, pageIndex) => {
          void e;
          setPageIndex(pageIndex);
        }}
        onRowsPerPageChange={(e) => {
          setPageSize(Number.parseInt(e.target.value) || 20);
        }}
      />
    </Card>
  );
};
