import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { ImageBackground } from "@/components/ui/ImageBackground";
import { useThemeStore } from "@/hooks/store/useThemeStore";
import { Customer } from "@/components/shared/Customer";
import React from "react";

export function NotFound() {
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
      <Customer></Customer>
      <NavLink to={{ pathname: "/" }}>
        <Button variant="contained">Take me home</Button>
      </NavLink>
    </ImageBackground>
  );
}
