// MUI Imports
import { Box, Typography } from "@mui/material";

// React Imports
// import React from "react";

// Components Imports
import { BlankMenu } from "./blank-menu";

export function Blank() {
  return (
    <>
      <Box position={"relative"} height={"100%"} color={"common.white"}>
        <BlankMenu />
        <Typography variant="h1">Hello Blank</Typography>
      </Box>
    </>
  );
}
