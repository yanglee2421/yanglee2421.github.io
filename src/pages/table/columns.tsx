import { createColumnHelper } from "@tanstack/react-table";
import {
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { DeleteButton } from "./DeleteCell";

const columnHelper =
  createColumnHelper<QueryDocumentSnapshot<DocumentData, DocumentData>>();

export const columns = [
  columnHelper.display({
    id: "title",
    header(props) {
      return props.column.id;
    },
    cell(props) {
      return props.row.original.data().title;
    },
  }),
  columnHelper.display({
    id: "content",
    header(props) {
      return props.column.id;
    },
    cell(props) {
      return props.row.original.data().context;
    },
  }),
  columnHelper.display({
    id: "delete",
    header(props) {
      return props.column.id;
    },
    cell(props) {
      return <DeleteButton id={props.row.original.id} />;
    },
  }),
];
