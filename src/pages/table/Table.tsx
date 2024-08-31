import {
  useSuspenseQuery,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { firestore } from "@/api/firebase/app";
import { columns } from "./columns";
import { useFormStatus } from "react-dom";
import { NavLink } from "react-router-dom";

export function Table() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => {
        return (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ error, resetErrorBoundary }) => {
              return (
                <div>
                  <p>{error.message}</p>
                  <button onClick={resetErrorBoundary}>reset</button>
                </div>
              );
            }}
          >
            <React.Suspense
              fallback={
                <div>
                  <p>fetching data</p>
                </div>
              }
            >
              <TableContent />
            </React.Suspense>
          </ErrorBoundary>
        );
      }}
    </QueryErrorResetBoundary>
  );
}

function TableContent() {
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
    <>
      <div>
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
        <button
          onClick={() => {
            setShowDialog(true);
          }}
        >
          add
        </button>
        <dialog ref={dialogRef}>
          <form
            action={async (formData) => {
              const title = (() => {
                const titleField = formData.get("title");

                // Not a string or the string is empty
                if (!titleField) {
                  return "";
                }

                if (typeof titleField !== "string") {
                  return "";
                }

                // Validation passed
                return titleField;
              })();

              const context = (() => {
                const contextField = formData.get("context");

                // Not a string or the string is empty
                if (!contextField) {
                  return "";
                }

                if (typeof contextField !== "string") {
                  return "";
                }

                // Validation passed
                return contextField;
              })();

              await addDoc(collectionRef, { title, context });
              await query.refetch();
              setShowDialog(false);
            }}
          >
            <label>title</label>
            <fieldset>
              <input autoFocus type="text" name="title" />
            </fieldset>
            <label>context</label>
            <fieldset>
              <textarea name="context"></textarea>
            </fieldset>
            <SubmitButton />
            <button
              onClick={() => {
                setShowDialog(false);
              }}
              type="button"
            >
              close
            </button>
          </form>
        </dialog>
        <NavLink to="/">home</NavLink>
      </div>

      <table>
        <caption>joke</caption>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
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
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
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
    </>
  );
}

function SubmitButton() {
  const formStatus = useFormStatus();

  return (
    <button type="submit" disabled={formStatus.pending}>
      submit
    </button>
  );
}
