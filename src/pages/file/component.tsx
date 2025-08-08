import { LinkOutlined } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React from "react";
import { useQueries } from "@tanstack/react-query";
import * as mathjs from "mathjs";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { create } from "zustand";
import { persist, type PersistStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { WritableDraft } from "immer";
import { NumberField } from "@/components/form/number";
import superjson from "superjson";
import { fetchBarcodeTextFromPDF } from "@/api/pdf";

export const Component = () => {
  return (
    <Stack spacing={1.5}>
      <CalculatePDF />
    </Stack>
  );
};

const CalculatePDF = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  const queries = useQueries({
    queries: files.map((file) => fetchBarcodeTextFromPDF(file)),
  });

  const isFetching = queries.some((query) => query.isFetching);
  // const isSuccess = queries.every((query) => query.isSuccess);

  const getBarcodes = () => {
    return queries.flatMap((query) => {
      if (!query.isSuccess) return [];
      return query.data
        .map((text) => stringToInvoiceBarcode(text))
        .filter((i) => typeof i === "object");
    });
  };

  const barcodes = getBarcodes();

  return (
    <Card>
      <CardHeader title={"Calculate"} />
      <CardContent>
        <TextField
          fullWidth
          onDrop={(e) => {
            e.preventDefault();
            const files = [...e.dataTransfer.files];
            setFiles(files);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onPaste={(e) => {
            const files = [...e.clipboardData.files];
            setFiles(files);
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton component="label">
                    <input
                      hidden
                      type="file"
                      value=""
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        setFiles(files);
                      }}
                      multiple
                      accept="application/pdf"
                    />
                    <LinkOutlined />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          placeholder="Drag or Paste your files here to upload"
        />
      </CardContent>
      {isFetching && <LinearProgress />}
      <DataGrid data={barcodes} />
    </Card>
  );
};

const stringToInvoiceBarcode = (text: string) => {
  try {
    const list = text.split(",");
    const id = list.at(3);
    if (!id) return false;
    const amount = list.at(4);
    if (!amount) return false;
    const date = list.at(5);
    if (!date) return false;
    return {
      id,
      amount,
      date,
    };
  } catch {
    return false;
  }
};

type Invoice = {
  id: string;
  amount: string;
  date: string;
};

const columnHelper = createColumnHelper<Invoice>();
const columns = [
  columnHelper.accessor("id", {
    footer(props) {
      return props.table.getRowCount();
    },
  }),
  columnHelper.accessor("amount", {
    footer: (props) => <AmountFooter rows={props.table.options.data} />,
  }),
  columnHelper.accessor("date", {
    footer(props) {
      return props.table.getRowCount();
    },
  }),
  columnHelper.display({
    id: "action",
    header: "action",
    cell(props) {
      return <ActionCell id={props.row.original.id} />;
    },
  }),
];

type DataGridProps = {
  data: Invoice[];
};

const DataGrid = (props: DataGridProps) => {
  "use no memo";

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    columns,
    data: props.data,
    getRowId(originalRow) {
      return originalRow.id || "";
    },
  });

  const renderBody = () => {
    return table.getRowModel().rows.map((row) => (
      <TableRow key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {cell.getIsPlaceholder() ||
              flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      sx={{ textTransform: "uppercase" }}
                    >
                      {header.isPlaceholder ||
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableHead>
          <TableBody>{renderBody()}</TableBody>
          <TableFooter>
            {table.getFooterGroups().map((footerGroup) => {
              return (
                <TableRow key={footerGroup.id}>
                  {footerGroup.headers.map((footer) => (
                    <TableCell key={footer.id}>
                      {footer.isPlaceholder ||
                        flexRender(
                          footer.column.columnDef.footer,
                          footer.getContext(),
                        )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

const storage: PersistStorage<State> = {
  getItem: (name) => {
    const str = sessionStorage.getItem(name);
    if (!str) return null;
    return superjson.parse(str);
  },
  setItem: (name, value) => {
    sessionStorage.setItem(name, superjson.stringify(value));
  },
  removeItem: (name) => sessionStorage.removeItem(name),
};

type State = {
  divide: Map<string, number>;
};

type Actions = {
  set(
    nextStateOrUpdater:
      | State
      | Partial<State>
      | ((state: WritableDraft<State>) => void),
  ): void;
};

type Store = State & Actions;

const useSessionStore = create<Store>()(
  persist(
    immer((set) => ({
      set,
      divide: new Map(),
    })),
    {
      name: "useSessionStore",
      storage,
    },
  ),
);

type ActionCellProps = {
  id: string;
};

const ActionCell = (props: ActionCellProps) => {
  const divide = useSessionStore((s) => s.divide);
  const set = useSessionStore((s) => s.set);

  return (
    <NumberField
      field={{
        value: divide.get(props.id) || 1,
        onChange: (e) => {
          set((draft) => {
            draft.divide.set(props.id, e);
          });
        },
        onBlur() {},
      }}
      autoComplete="off"
      _min={1}
      _spinner
      _step={1}
    />
  );
};

type AmountFooterProps = {
  rows: Invoice[];
};

const AmountFooter = (props: AmountFooterProps) => {
  const divide = useSessionStore((s) => s.divide);

  return props.rows.reduce((result, row) => {
    return mathjs
      .add(
        mathjs.bignumber(result),
        mathjs.divide(
          mathjs.bignumber(row.amount),
          mathjs.bignumber(divide.get(row.id) || 1),
        ),
      )
      .toString();
  }, "0");
};
