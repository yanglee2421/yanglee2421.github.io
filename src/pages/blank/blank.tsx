// MUI Imports
import { Box, Paper, TextField } from "@mui/material";

// React Imports
import React from "react";

// Components Imports
import { BlankMenu } from "./blank-menu";
import { GlobalBg } from "@/components/ui";

export function Blank() {
  const [count, setCount] = React.useState("");

  React.useEffect(() => {
    console.log("effect", count);

    return () => {
      console.log("clear effect");
    };
  }, [count]);

  React.useInsertionEffect(() => {
    console.log("intertion effect", count);

    return () => {
      console.log("clear intertion effect");
    };
  }, [count]);

  React.useLayoutEffect(() => {
    console.log("layout effect", count);

    return () => {
      console.log("clear layout effect");
    };
  }, [count]);

  return (
    <Box
      position={"relative"}
      height={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      color="common.white"
    >
      <GlobalBg></GlobalBg>
      <BlankMenu></BlankMenu>
      <Paper component={"form"} sx={{ padding: 3 }}>
        <ul>
          <li>
            <label>
              网页
              <input type="radio" name="subject"></input>
            </label>
          </li>
          <li>
            <label>
              图片
              <input type="radio" name="subject"></input>
            </label>
          </li>
        </ul>
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
