import { alpha, styled } from "@mui/material";
import {
  ScrollArea,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@radix-ui/react-scroll-area";
import React from "react";

const StyledScrollArea = styled(ScrollArea)(() => ({
  inlineSize: "100%",
  blockSize: "100%",
}));

const StyledScrollViewport = styled(ScrollAreaViewport)(() => ({
  inlineSize: "100%",
  blockSize: "100%",
}));

const StyledScrollbar = styled(ScrollAreaScrollbar)(() => ({
  backgroundColor: "transparent",
  "&:where([data-orientation=horizontal])": {
    blockSize: 12,
  },
  "&:where([data-orientation=vertical])": {
    inlineSize: 12,
  },
}));

const StyledThumb = styled(ScrollAreaThumb)(({ theme }) => ({
  backgroundColor: alpha(
    theme.palette.mode === "light"
      ? theme.palette.common.black
      : theme.palette.common.white,
    theme.palette.action.activatedOpacity,
  ),
  "[data-orientation=horizontal] > &": {
    height: "100% !important",
  },
  "[data-orientation=vertical] > &": {
    inlineSize: "100% !important",
  },
}));

const StyledCorner = styled(ScrollAreaCorner)(() => ({
  backgroundColor: "transparent",
}));

type ScrollViewProps = React.PropsWithChildren<{
  ref?: React.Ref<HTMLDivElement>;
}>;

export const ScrollView = (props: ScrollViewProps) => {
  const { ref } = props;

  return (
    <StyledScrollArea ref={ref}>
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
};
