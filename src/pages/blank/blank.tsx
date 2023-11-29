// MUI Imports
import { Box, styled } from "@mui/material";

// React Imports
// import React from "react";

// Components Imports
import { BlankMenu } from "./blank-menu";

export function Blank() {
  return (
    <>
      <Box
        position={"relative"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
        color={"common.white"}
      >
        <BlankMenu />
        <StyledForm>
          <StyledUl>
            <li>
              <label>
                网页
                <input type="radio" name="subject" />
              </label>
            </li>
            <li>
              <label>
                图片
                <input type="radio" name="subject" />
              </label>
            </li>
          </StyledUl>
          <StyledInput placeholder="Search..." />
        </StyledForm>
      </Box>
    </>
  );
}

const StyledInput = styled("input")({
  width: 300,
  height: 46,
  opacity: 0.85,
  outline: "none",
  "&:active,&:focus": {
    opacity: 1,
  },
  textIndent: ".5rem",
});

const StyledForm = styled("form")({});

const StyledUl = styled("ul")({
  display: "flex",
  gap: "1rem",
  listStyle: "none",

  '& input[type="radio"]': {
    display: "none",
  },

  "& label": {
    cursor: "pointer",
    userSelect: "none",

    "&:has(input:checked)": {
      color: "red",
    },
  },
});
