import { styled } from "@mui/material";
import {
  ScrollArea,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@radix-ui/react-scroll-area";
import React from "react";

export function ScrollView(props: React.PropsWithChildren) {
  return (
    <StyledScrollArea>
      <StyledScrollViewport>{props.children}</StyledScrollViewport>
      <StyledScrollbar orientation="horizontal">
        <StyledThumb />
      </StyledScrollbar>
      <StyledScrollbar orientation="vertical">
        <StyledThumb />
      </StyledScrollbar>
      <StyledCorner />
    </StyledScrollArea>
  );
}

const StyledScrollArea = styled(ScrollArea)(({ theme: t }) => ({
  inlineSize: "100%",
  blockSize: "100%",
}));

const StyledScrollViewport = styled(ScrollAreaViewport)(({ theme: t }) => ({
  inlineSize: "100%",
  blockSize: "100%",
}));

const StyledScrollbar = styled(ScrollAreaScrollbar)(({ theme: t }) => ({
  display: "flex",
  userSelect: "none",
  touchAction: "none",
  backgroundColor: t.palette.grey[200],
  "&:hover": {
    backgroundColor: t.palette.grey[300],
  },
  "&[data-orientation=vertical]": {
    width: 4,
  },
  "&[data-orientation=horizontal]": {
    flexDirection: "column",
    height: 4,
  },
}));

const StyledThumb = styled(ScrollAreaThumb)(({ theme: t }) => ({
  flex: 1,
  borderRadius: t.shape.borderRadius,
  position: "relative",

  "&::before": {
    content: "''",
    position: "absolute",
    insetInlineStart: "50%",
    insetBlockStart: "50%",
    translate: "-50% -50%",

    inlineSize: "100%",
    blockSize: "100%",
    minInlineSize: 8,
    minBlockSize: 8,
    backgroundColor: t.palette.grey.A700,
  },
}));

const StyledCorner = styled(ScrollAreaCorner)(({ theme: t }) => ({
  backgroundColor: t.palette.primary.main,
}));
