import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import {
  addDoc,
  getDocs,
  type DocumentReference,
  query,
  limit,
  startAt,
} from "firebase/firestore";
import React from "react";
import { jokeCollection as collectionRef } from "@/api/firebase/app";
import { columns } from "./columns";
import { useFormStatus } from "react-dom";
import {
  Table as TableRoot,
  TableBody,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import classNames from "classnames";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const queryKey = ["firebase", "joke"];

export function Table() {
  const jokes = useQuery({
    queryKey,
    async queryFn() {
      const docs = await getDocs(query(collectionRef, limit(3)));

      return docs.docs;
    },
  });

  const data = React.useMemo(() => jokes.data || [], [jokes.data]);

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    getRowId(originalRow) {
      return originalRow.id;
    },
    columns,
    data,
  });

  const formId = React.useId();
  const [show, setShow] = React.useState(false);
  const queryClient = useQueryClient();

  const add = useMutation<DocumentReference, Error, FormData>({
    async mutationFn(formData) {
      const title = getFormValue(formData, "title");
      const context = getFormValue(formData, "context");
      const data = await addDoc(collectionRef, { title, context });
      return data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>joke</CardTitle>
            <Button
              onClick={() => {
                jokes.refetch();
              }}
              disabled={jokes.isRefetching}
              size="icon"
              variant={"ghost"}
            >
              <RefreshCcw
                className={classNames(jokes.isRefetching && "animate-spin")}
              />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex">
            <Dialog open={show} onOpenChange={setShow}>
              <DialogTrigger asChild>
                <Button className="uppercase">add</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="uppercase">add</DialogTitle>
                  <DialogDescription>Add a joke</DialogDescription>
                </DialogHeader>
                <form
                  id={formId}
                  action={async (formData) => {
                    await add.mutateAsync(formData, {
                      onSuccess() {
                        setShow(false);
                      },
                    });
                  }}
                  className="space-y-3"
                >
                  <Label>title</Label>
                  <fieldset>
                    <Input autoFocus type="text" name="title" />
                  </fieldset>
                  <label>context</label>
                  <fieldset>
                    <Textarea name="context" rows={6}></Textarea>
                  </fieldset>
                </form>
                <DialogFooter>
                  <SubmitButton form={formId} />
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button asChild variant={"link"}>
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
                className="ms-auto uppercase"
              >
                export
              </a>
            </Button>
          </div>
        </CardContent>
        <TableRoot>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ||
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <div className="whitespace-normal break-normal">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
            {table.getFooterGroups().map((footerGroup) => (
              <TableRow key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <TableCell key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ||
                      flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter> */}
        </TableRoot>
        <div className="border-t py-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    console.log("next");
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>
    </>
  );
}

function SubmitButton(props: { form: string }) {
  const formStatus = useFormStatus();

  return (
    <Button
      form={props.form}
      type="submit"
      disabled={formStatus.pending}
      className="btn-blue uppercase"
    >
      submit
    </Button>
  );
}

function getFormValue(formData: FormData, field: string) {
  const fieldValue = formData.get(field);

  // Not a string or the string is empty
  if (!fieldValue) {
    return "";
  }

  if (typeof fieldValue !== "string") {
    return "";
  }

  // Validation passed
  return fieldValue;
}
