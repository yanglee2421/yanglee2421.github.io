import {
  Skeleton,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import type { ListItemProps } from "@mui/material";

export function SkeletonListItem(props: ListItemProps) {
  return (
    <ListItem {...props}>
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
