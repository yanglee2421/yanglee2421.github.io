import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { Customer } from "@/components/shared/Customer";
import { ImageBackground } from "@/components/ui/ImageBackground";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";
import { useThemeStore } from "@/hooks/store/useThemeStore";

export function NotFound() {
  useHeadTitle("Not Found");
  const bgAlpha = useThemeStore((store) => store.bgAlpha);
  const bgBlur = useThemeStore((store) => store.bgBlur);
  const deferredAlpha = React.useDeferredValue(bgAlpha);
  const deferredBlur = React.useDeferredValue(bgBlur);

  return (
    <ImageBackground
      position={"fixed"}
      alpha={deferredAlpha}
      blur={deferredBlur}
      sx={{ inset: 0 }}
    >
      <Customer />
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
          404
        </Typography>
        <Typography variant="h4" align="center">
          Page Not Found ⚠️
        </Typography>
        <Typography variant="subtitle1" align="center">
          We couldn't find the page you are looking for.
        </Typography>

        <NavLink to={{ pathname: "/" }}>
          <Button variant="contained">Take me home</Button>
        </NavLink>
      </Box>
    </ImageBackground>
  );
}
