import { List } from "@mui/material";
import React from "react";
import { SkeletonListItem } from "./SkeletonListItem";
import type { ListProps } from "@mui/material";

export const SkeletonList = React.forwardRef<HTMLUListElement, ListProps>(
  (props, ref) => {
    return (
      <List ref={ref} {...props}>
        <SkeletonListItem></SkeletonListItem>
        <SkeletonListItem></SkeletonListItem>
        <SkeletonListItem></SkeletonListItem>
      </List>
    );
  },
);
