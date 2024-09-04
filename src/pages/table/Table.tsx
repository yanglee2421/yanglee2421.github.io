"use no memo";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React from "react";
import { firestore } from "@/api/firebase/app";
import { columns } from "./columns";
import { useFormStatus } from "react-dom";
import { NavMenus } from "@/components/shared/NavMenus";

export function Table() {
  const collectionRef = collection(firestore, "joke");

  const query = useSuspenseQuery({
    queryKey: ["firebase", "joke"],
    queryFn() {
      return getDocs(collectionRef);
    },
  });

  const data = React.useMemo(() => {
    return query.data.docs;
  }, [query.data]);

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    getRowId(originalRow) {
      return originalRow.id;
    },
    columns,
    data,
  });

  const [showDialog, setShowDialog] = React.useState(false);
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  React.useEffect(() => {
    if (showDialog) {
      dialogRef.current?.showModal();
      return;
    }

    dialogRef.current?.close();
  }, [showDialog]);

  return (
    <div className="flex min-h-dvh flex-col">
      <header></header>
      <main className="flex-auto px-5 py-2">
        <aside>
          <NavMenus />
        </aside>
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
                const title = getFormValue(formData, "title");
                const context = getFormValue(formData, "context");
                await addDoc(collectionRef, { title, context });
                await query.refetch();
                setShowDialog(false);
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
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id} className="divide-x">
                  {headerGroup.headers.map((header) => {
                    return (
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
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody className="divide-y">
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className="divide-x odd:bg-white even:bg-slate-50"
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="max-w-72 px-6 py-4 text-sm font-medium text-slate-900"
                      >
                        <div className="whitespace-normal break-normal">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
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
      </main>
      <footer className="px-5 py-2">
        &copy;2024 by{" "}
        <a href="#" className="text-blue-500 hover:underline">
          yanglee2421
        </a>
      </footer>
    </div>
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
