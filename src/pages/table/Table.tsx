import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import {
  addDoc,
  getDocsFromServer,
  type DocumentReference,
} from "firebase/firestore";
import React from "react";
import { jokeCollection as collectionRef } from "@/api/firebase/app";
import { columns } from "./columns";
import { useFormStatus } from "react-dom";

const queryKey = ["firebase", "joke"];

export function Table() {
  "use no memo";
  const query = useSuspenseQuery({
    queryKey,
    async queryFn() {
      const docs = await getDocsFromServer(collectionRef);

      return docs.docs;
    },
  });

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    getRowId(originalRow) {
      return originalRow.id;
    },
    columns,
    data: query.data,
  });

  console.log(query.data);

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

  const [showDialog, setShowDialog] = React.useState(false);
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  React.useEffect(() => {
    const el = dialogRef.current;

    if (!el) {
      return;
    }

    if (showDialog) {
      el.showModal();
      return;
    }

    el.close();
  }, [showDialog]);

  return (
    <>
      <div className="flex py-2">
        <button
          onClick={() => {
            setShowDialog(true);
          }}
          className="btn-indigo uppercase"
        >
          add
        </button>

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
          className="ms-auto uppercase text-indigo-500 hover:underline"
        >
          export
        </a>
        <dialog
          ref={dialogRef}
          className="w-full rounded px-5 py-2 backdrop:bg-black/50 md:max-w-md"
        >
          <form
            action={async (formData) => {
              await add.mutateAsync(formData, {
                onSuccess() {
                  setShowDialog(false);
                },
              });
            }}
            className="space-y-3"
          >
            <label>title</label>
            <fieldset>
              <input
                autoFocus
                type="text"
                name="title"
                className="block w-full focus:border-blue-500 focus:ring-blue-500"
              />
            </fieldset>
            <label>context</label>
            <fieldset>
              <textarea
                name="context"
                rows={6}
                className="block w-full focus:border-blue-500 focus:ring-blue-500"
              ></textarea>
            </fieldset>
            <div className="flex gap-3">
              <SubmitButton />
              <button
                onClick={() => {
                  setShowDialog(false);
                }}
                type="button"
                className="btn-border uppercase"
              >
                close
              </button>
            </div>
          </form>
        </dialog>
      </div>

      <table className="w-full rounded border">
        <thead className="border-b border-slate-200 bg-slate-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="divide-x">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="px-6 py-3 text-left text-sm font-medium uppercase text-slate-900"
                >
                  {header.isPlaceholder ||
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="divide-x odd:bg-white even:bg-slate-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="max-w-72 px-6 py-4 text-sm font-medium text-slate-900"
                >
                  <div className="whitespace-normal break-normal">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <td key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ||
                    flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
}

function SubmitButton() {
  const formStatus = useFormStatus();

  return (
    <button
      type="submit"
      disabled={formStatus.pending}
      className="btn-blue uppercase"
    >
      submit
    </button>
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
