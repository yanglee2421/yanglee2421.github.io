// MUI Imports
import React from "react";

import type {
  ListItemProps} from "@mui/material";
import {
  Skeleton,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@mui/material";

// React Imports

export const SkeletonListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  (props, ref) => {
    return (
      <ListItem ref={ref} {...props}>
        <ListItemAvatar>
          <Skeleton variant="circular">
            <Avatar></Avatar>
          </Skeleton>
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton></Skeleton>}
          secondary={<Skeleton width={"80%"}></Skeleton>}
        ></ListItemText>
      </ListItem>
    );
  }
);
