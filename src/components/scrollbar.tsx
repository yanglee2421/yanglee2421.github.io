import { alpha, styled, GlobalStyles, useTheme } from "@mui/material";
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

const StyledScrollbar = styled(ScrollAreaScrollbar)(({ theme }) => ({
  zIndex: 1 + theme.zIndex.appBar,
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

/**
 * NativeScrollbar component for injecting global styles to make native scrollbars consistent with ScrollView component styles
 * Use this component in the root of your application, such as App.tsx
 */
export const NativeScrollbar = () => {
  const theme = useTheme();

  return (
    <GlobalStyles
      styles={{
        "*::-webkit-scrollbar": {
          width: "16px",
          height: "16px",
          backgroundColor: "transparent",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor:
            theme.palette.mode === "light"
              ? `rgba(0, 0, 0, ${theme.palette.action.activatedOpacity})`
              : `rgba(255, 255, 255, ${theme.palette.action.activatedOpacity})`,
          borderRadius: theme.shape.borderRadius,
          backgroundClip: "padding-box",
          border: "4px solid transparent",
        },
        "*::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "*::-webkit-scrollbar-corner": {
          backgroundColor: "transparent",
        },
        // Firefox scrollbar styles
        // "*": {
        //   scrollbarWidth: "thin"
        //   scrollbarColor: `${
        //     theme.palette.mode === "light"
        //       ? `rgba(0, 0, 0, ${theme.palette.action.activatedOpacity})`
        //       : `rgba(255, 255, 255, ${theme.palette.action.activatedOpacity})`
        //   } transparent`,
        // },
      }}
    />
  );
};
