// MUI Imports
import { Box, Backdrop, CircularProgress } from "@mui/material";

// React Imports
import ReactDOM from "react-dom";

export function GlobalBg(props: GlobalBgProps) {
  // ** Props
  const { loading, bgImg, bgAlpha, bgBlur } = props;

  return ReactDOM.createPortal(
    <>
      <Box
        position={"fixed"}
        zIndex={-1}
        sx={{
          inset: 0,
          backgroundImage: `url(${bgImg})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: `blur(${20 * (bgBlur / 100)}px)`,
          transition(theme) {
            return theme.transitions.create("filter");
          },
        }}
      >
        <Box
          position={"absolute"}
          bgcolor={`rgba(0,0,0,${bgAlpha / 100})`}
          sx={{
            inset: 0,
            transition(theme) {
              return theme.transitions.create("background-color");
            },
          }}
        ></Box>
      </Box>
      <Backdrop open={loading} unmountOnExit sx={{ color: "common.white" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>,
    document.body
  );
}

export interface GlobalBgProps {
  bgImg: string;
  bgAlpha: number;
  bgBlur: number;
  loading: boolean;
}
