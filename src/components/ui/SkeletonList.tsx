// MUI Imports
import { List, ListProps } from "@mui/material";

// Components Imports
import { SkeletonListItem } from "./SkeletonListItem";

// React Imports
import React from "react";

export const SkeletonList = React.forwardRef<HTMLUListElement, ListProps>(
  (props, ref) => {
    return (
      <List ref={ref} {...props}>
        <SkeletonListItem></SkeletonListItem>
        <SkeletonListItem></SkeletonListItem>
        <SkeletonListItem></SkeletonListItem>
      </List>
    );
  }
);
