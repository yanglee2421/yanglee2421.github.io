// MUI Imports
import {
  Skeleton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
} from "@mui/material";

export function SkeletonList() {
  return (
    <List>
      <SkeletonListItem></SkeletonListItem>
      <SkeletonListItem></SkeletonListItem>
      <SkeletonListItem></SkeletonListItem>
    </List>
  );
}

function SkeletonListItem() {
  return (
    <ListItem>
      <ListItemAvatar>
        <Skeleton variant="circular" width={40} height={40} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="body1">
            <Skeleton></Skeleton>
          </Typography>
        }
        secondary={
          <Typography variant="caption">
            <Skeleton width={"80%"}></Skeleton>
          </Typography>
        }
      ></ListItemText>
    </ListItem>
  );
}
