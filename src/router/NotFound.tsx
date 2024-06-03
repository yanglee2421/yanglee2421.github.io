import { Box, Button, Typography, styled } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import bgImg from "@/assets/images/justHer.jpg";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";

export function NotFound() {
  useHeadTitle("Not Found");

  const [bgSize, setBgSize] = React.useState({
    width: 0,
    height: 0,
  });

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!(containerRef.current instanceof HTMLElement)) {
      return;
    }

    const observer = new ResizeObserver(([{ contentBoxSize }]) => {
      const [{ blockSize, inlineSize }] = contentBoxSize;

      React.startTransition(() => {
        setBgSize({
          width: inlineSize,
          height: blockSize,
        });
      });
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [setBgSize]);

  return (
    <Box
      ref={containerRef}
      color="common.white"
      sx={{
        position: "relative",
        minHeight: "100dvh",
        "&::before,&::after": {
          content: '""',
          display: "table",
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="h1" align="center" sx={{ mt: 36 }}>
          404
        </Typography>
        <Typography variant="h4" align="center">
          Page Not Found ⚠️
        </Typography>
        <Typography variant="subtitle1" align="center">
          We couldn't find the page you are looking for.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <NavLink to={{ pathname: "/" }}>
          <Button variant="contained">Take me home</Button>
        </NavLink>
      </Box>

      <StyledImg
        src={new URL(bgImg, import.meta.url).href}
        alt="just her"
        width={bgSize.width}
        height={bgSize.height}
      />
    </Box>
  );
}

const StyledImg = styled("img")({
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 0,
  objectFit: "cover",
});
