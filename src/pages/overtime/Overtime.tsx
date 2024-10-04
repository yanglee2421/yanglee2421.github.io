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
  Card,
  CardHeader,
  CardContent,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Button,
  Box,
  Divider,
  Grid2,
  TextField,
  alpha,
} from "@mui/material";
import { AddOutlined, RefreshOutlined } from "@mui/icons-material";
import {
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";

export function Overtime() {
  const user = useCurrentUser();
  const query = useQuery(getOptions({ userId: user?.uid || "" }));
  const data = React.useMemo(() => query.data || [], [query.data]);
  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    columns,
    data,
    getRowId(originalRow) {
      return originalRow.id;
    },
  });

  if (!user) {
    return null;
  }

  if (query.isPending) {
    return null;
  }

  if (query.isError) {
    return null;
  }

  return (
    <div>
      <Card>
        <CardHeader
          title="overtime"
          titleTypographyProps={{ sx: { textTransform: "uppercase" } }}
          action={
            <IconButton>
              <RefreshOutlined />
            </IconButton>
          }
        />
        <CardContent>
          <Grid2 container spacing={6}>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField fullWidth />
            </Grid2>
          </Grid2>
        </CardContent>
        <Divider></Divider>
        <Box sx={{ paddingInline: 4, paddingBlock: 3 }}>
          <Button variant="contained" startIcon={<AddOutlined />}>
            add
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((h) => (
                    <TableCell
                      key={h.id}
                      sx={(t) => ({
                        bgcolor: alpha(
                          t.palette.grey[700],
                          t.palette.action.focusOpacity,
                        ),
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
                    <TableCell key={c.id}>
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
          count={1}
          rowsPerPage={20}
          rowsPerPageOptions={[20, 50, 100]}
          onPageChange={Boolean}
          onRowsPerPageChange={Boolean}
        />
      </Card>
    </div>
  );
}

const columnHelper =
  createColumnHelper<QueryDocumentSnapshot<DocumentData, DocumentData>>();

const columns = [
  columnHelper.display({
    id: "date",
    header: "date",
    cell(props) {
      return props.row.original.data().date.toDate().toLocaleDateString();
    },
  }),
  columnHelper.display({
    id: "hours",
    header: "hours",
    cell(props) {
      return props.row.original.data().hours;
    },
  }),
];
