// MUI Imports
import React from "react";

import type { ListProps } from "@mui/material";
import { List } from "@mui/material";

// Components Imports
import { SkeletonListItem } from "./SkeletonListItem";

// React Imports

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
