import { List } from "@mui/material";
import { SkeletonListItem } from "./SkeletonListItem";
import type { ListProps } from "@mui/material";

export function SkeletonList(props: ListProps) {
  return (
    <List {...props}>
      <SkeletonListItem></SkeletonListItem>
      <SkeletonListItem></SkeletonListItem>
      <SkeletonListItem></SkeletonListItem>
    </List>
  );
}
