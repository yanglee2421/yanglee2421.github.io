// MUI Imports
import { Backdrop, Box, CircularProgress } from "@mui/material";

// Redux Imports
import { useAppSelector, loadBgImg, useAppDispatch } from "@/redux";

// React Imports
import React from "react";
import ReactDOM from "react-dom";

// Components Imports
import { BlankMenu } from "./blank-menu";

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
  const isLoading = useAppSelector((s) => {
    return s.theme.isLoading;
  });
  const bgImg = useAppSelector((s) => {
    return s.theme.bgImg;
  });
  const bgBlur = useAppSelector((s) => {
    return s.theme.bgBlur;
  });
  const bgAlpha = useAppSelector((s) => {
    return s.theme.bgAlpha;
  });
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (bgImg) return;
    dispatch(loadBgImg());
  }, [dispatch]);

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
          backgroundPosition: "center",
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
      <Backdrop open={isLoading} sx={{ color: "common.white" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
