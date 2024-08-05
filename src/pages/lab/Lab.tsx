import { CloseOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  alpha,
  Backdrop,
  Box,
  IconButton,
  styled,
  Typography,
  Link,
} from "@mui/material";
import React from "react";
import justHer from "@/assets/images/justHer.jpg";
import { PageLayout } from "@/components/layout/PageLayout";

export function Lab() {
  const [showBackdrop, setShowBackdrop] = React.useState(false);

  const handleClose = () => {
    setShowBackdrop(false);
  };

  return (
    <PageLayout>
      <div>
        <Typography variant="h4">ApexCharts</Typography>
        <Typography>
          <code>react-apexcharts</code> is a third-party library. Please refer
          to its{" "}
          <Link href="https://apexcharts.com" target="_blank">
            official documentation
          </Link>{" "}
          for more details.
        </Typography>
      </div>
      <Box
        sx={{
          position: "relative",
          width: 300,
        }}
      >
        <img
          src={justHerHref}
          alt=""
          style={{ display: "block", inlineSize: "100%" }}
        />
        <Box
          onClick={() => {
            setShowBackdrop(true);
          }}
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor(theme) {
              return alpha("#000", theme.palette.action.hoverOpacity);
            },

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            color(theme) {
              return theme.palette.common.white;
            },

            opacity: 0,
            "&:hover": {
              opacity: 1,
            },
            transition(theme) {
              return theme.transitions.create("transition");
            },

            cursor: "pointer",
          }}
        >
          <VisibilityOutlined color="inherit" />
        </Box>
      </Box>
      <Backdrop
        open={showBackdrop}
        onClick={handleClose}
        sx={{
          zIndex(theme) {
            return theme.zIndex.modal;
          },
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            insetInlineEnd: 16,
            insetBlockStart: 16,
            color: "white",
          }}
        >
          <CloseOutlined color="inherit" />
        </IconButton>
        <StyledImg src={justHerHref} alt="" />
      </Backdrop>
    </PageLayout>
  );
}

const StyledImg = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
});
const justHerHref = new URL(justHer, import.meta.url).href;
