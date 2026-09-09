import { styled } from "@mui/material";

export const StyledBackgroundImage = styled("div")({
  position: "fixed",
  zIndex: 1,

  backgroundSize: "cover",
  backgroundPosition: "50%",
});

export const StyledBackgroundImageWrapper = styled("div")({
  position: "relative",
  zIndex: 0,
  isolation: "isolate",
  inset: 0,
});

export const StyledMask = styled("div")({
  position: "fixed",
  inset: 0,
  zIndex: 0,
});

export const ContentContainer = styled("div")({
  position: "relative",
  zIndex: 1,
  inlineSize: "100dvw",
  blockSize: "100dvh",

  display: "flex",
  flexDirection: "column",
});

export const ColckWrapper = styled("div")({
  marginBlockStart: "calc(100dvh/55*21)",
  transform: "translate3d(0,-50%,0)",
});
