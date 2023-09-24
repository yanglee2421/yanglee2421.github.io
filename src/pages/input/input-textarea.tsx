// MUI Imports
import { TextareaAutosize, styled } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

export function InputTextarea() {
  return <StyledTextarea />;
}

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => {
  return {
    width: 320,
    fontFamily: "IBM Plex Sans, sans-serif",
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.5",
    padding: 12,
    borderRadius: "12px 12px 0 12px",
    color: `${theme.palette.mode === "dark" ? grey[300] : grey[900]}`,
    background: `${theme.palette.mode === "dark" ? grey[900] : "#fff"}`,
    border: `1px solid ${
      theme.palette.mode === "dark" ? grey[700] : grey[200]
    }`,
    boxShadow: `0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    }`,

    "&:hover": {
      borderColor: blue[400],
    },

    "&:focus": {
      borderColor: blue[400],
      boxShadow: `0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[500] : blue[200]
      }`,
    },

    // firefox
    "&:focus-visible": {
      outline: 0,
    },
  };
});
