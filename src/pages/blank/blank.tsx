// MUI Imports
import { Backdrop, Box, CircularProgress } from "@mui/material";

// React Imports
import React from "react";
import ReactDOM from "react-dom";

// Components Imports
import { BlankMenu } from "./blank-menu";
import { useThemeQuery } from "@/hooks/api-theme";

export function Blank() {
  return (
    <>
      {ReactDOM.createPortal(<GlobalBg />, document.body)}
      <Box position={"relative"} height={"100%"} color={"common.white"}>
        <BlankMenu />
      </Box>
    </>
  );
}

function GlobalBg() {
  const themeQuery = useThemeQuery();
  const { bgImg, bgAlpha, bgBlur } = themeQuery.data;

  return (
    <>
      <Box
        position={"fixed"}
        zIndex={-1}
        sx={{
          inset: 0,
          backgroundImage: `url(${bgImg})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          // backgroundPosition: "center",
          filter: `blur(${20 * (bgBlur / 100)}px)`,
          transition(theme) {
            return theme.transitions.create("filter");
          },
        }}
      >
        <Box
          position={"absolute"}
          sx={{
            inset: 0,
            bgcolor: `rgba(0,0,0,${bgAlpha / 100})`,
            transition(theme) {
              return theme.transitions.create("background-color");
            },
          }}
        ></Box>
      </Box>
      <Backdrop open={themeQuery.isLoading} sx={{ color: "common.white" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
