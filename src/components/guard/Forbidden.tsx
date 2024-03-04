import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { ImageBackground } from "@/components/ui/ImageBackground";
import { useThemeStore } from "@/hooks/store/useThemeStore";

export function Forbidden() {
  const bgAlpha = useThemeStore((store) => store.bgAlpha);
  const bgBlur = useThemeStore((store) => store.bgBlur);
  const deferredAlpha = React.useDeferredValue(bgAlpha);
  const deferredBlur = React.useDeferredValue(bgBlur);

  return (
    <ImageBackground alpha={deferredAlpha} blur={deferredBlur}>
      <Box>
        <Button component={Link} to={"/"} variant="contained">
          Take me home
        </Button>
      </Box>
    </ImageBackground>
  );
}
