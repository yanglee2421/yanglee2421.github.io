// MUI Imports

import { List } from "@mui/material";
import React from "react";

// Components Imports
import { SkeletonListItem } from "./SkeletonListItem";

import type { ListProps } from "@mui/material";

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
  },
);
