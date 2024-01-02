// MUI Imports
import {
  Skeleton,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemProps,
} from "@mui/material";

// React Imports
import React from "react";

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
