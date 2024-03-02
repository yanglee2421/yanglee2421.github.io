import { NavLink } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { ImageBackground } from "@/components/ui/ImageBackground";
import { Customer } from "@/components/shared/Customer";
import { useThemeStore } from "@/hooks/store/useThemeStore";
import React from "react";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";

export function InternalServerError() {
  useHeadTitle("Internal Server Error");
  const bgAlpha = useThemeStore((store) => store.bgAlpha);
  const bgBlur = useThemeStore((store) => store.bgBlur);
  const deferredAlpha = React.useDeferredValue(bgAlpha);
  const deferredBlur = React.useDeferredValue(bgBlur);

  return (
    <ImageBackground alpha={deferredAlpha} blur={deferredBlur}>
      <Customer></Customer>
      <Box
        color="common.white"
        textAlign={"center"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
      >
        <Typography variant="h1" align="center">
          500
        </Typography>
        <Typography variant="h4" align="center">
          Internal Server Error ⚠️
        </Typography>
        <Typography variant="subtitle1" align="center">
          We couldn't find the page you are looking for.
        </Typography>
        <Button
          component={NavLink}
          to="/"
          variant="contained"
          size="large"
          sx={{ mt: 6, borderRadius: 50 }}
        >
          Take me home
        </Button>
      </Box>
    </ImageBackground>
  );
}
