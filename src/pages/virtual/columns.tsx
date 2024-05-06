import {
  CircleOutlined,
  UnfoldLessOutlined,
  UnfoldMoreOutlined,
} from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import type { DataType } from "./data";

const columnHelper = createColumnHelper<DataType>();

export const columns = [
  columnHelper.display({
    id: "selection",
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
          indeterminate={props.row.getIsSomeSelected()}
          checked={props.row.getIsSelected()}
          onChange={props.row.getToggleSelectedHandler()}
          disabled={!props.row.getCanSelect()}
        />
      );
    },
    footer(props) {
      return (
        <Checkbox
          indeterminate={props.table.getIsSomeRowsSelected()}
          checked={props.table.getIsAllRowsSelected()}
          onChange={props.table.getToggleAllRowsSelectedHandler()}
        />
      );
    },
    enableResizing: false,
    size: 80,
    minSize: 80,
    maxSize: 80,
  }),

  columnHelper.display({
    id: "index",
    header() {
      return "Index";
    },
    cell(props) {
      return props.row.index;
    },
    footer(props) {
      return props.header.id;
    },
    enableResizing: false,
    size: 80,
    minSize: 80,
    maxSize: 80,
  }),

  columnHelper.display({
    id: "expander",
    header() {
      return null;
    },
    cell(props) {
      if (props.row.getCanExpand()) {
        return (
          <IconButton onClick={props.row.getToggleExpandedHandler()}>
            {props.row.getIsExpanded() ? (
              <UnfoldLessOutlined />
            ) : (
              <UnfoldMoreOutlined />
            )}
          </IconButton>
        );
      }

      return <CircleOutlined />;
    },
    enableResizing: false,
    size: 80,
    minSize: 80,
    maxSize: 80,
  }),

  columnHelper.accessor("id", {
    header: "ID",
    cell(info) {
      return info.getValue();
    },
    footer() {
      return "#ID";
    },
  }),
  columnHelper.accessor("fullName", {
    header: "Name",
    cell(info) {
      return info.getValue();
    },
    footer() {
      return "Name footer";
    },

    size: 240,
  }),
  columnHelper.accessor("email", {
    cell: (info) => info.getValue(),
    header: "Email",
    footer() {
      return "email footer";
    },

    size: 240,
  }),
  columnHelper.accessor("start_date", {
    cell: (info) => info.getValue(),
    header: "Date",
  }),
  columnHelper.accessor("experience", {
    cell: (info) => info.getValue(),
    header: "Experience",
  }),
  columnHelper.accessor("age", {
    cell: (info) => info.getValue(),
    header: "Age",
  }),
];
