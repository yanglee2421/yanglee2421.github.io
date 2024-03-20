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
          <Avatar />
        </Skeleton>
      </ListItemAvatar>
      <ListItemText
        primary={<Skeleton />}
        secondary={<Skeleton width={"80%"} />}
      />
    </ListItem>
  );
}
