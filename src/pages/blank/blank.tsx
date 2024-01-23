// MUI Imports
import { Box, Paper, TextField } from "@mui/material";

// React Imports
import React from "react";

// Components Imports
import { Customer } from "@/components";
import { BackgroundImage } from "@/components/ui";

export function Blank() {
  const [count, setCount] = React.useState("");

  return (
    <Box
      position={"relative"}
      height={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      color="common.white"
    >
      <BackgroundImage></BackgroundImage>
      <Customer></Customer>
      <Paper component={"form"} sx={{ padding: 3 }}>
        <TextField
          value={count}
          onChange={(evt) => {
            setCount(evt.target.value);
          }}
          placeholder="Search..."
        ></TextField>
      </Paper>
    </Box>
  );
}
