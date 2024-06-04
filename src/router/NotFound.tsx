import { Box, Button, Typography, alpha, styled } from "@mui/material";
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
  }, []);

  return (
    <Box
      color="common.white"
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100dvh",
        "&::before,&::after": {
          content: '""',
          display: "table",
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 2 }}>
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

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          mt: 6,
        }}
      >
        <NavLink to={{ pathname: "/" }}>
          <Button variant="contained" size="large">
            Take me home
          </Button>
        </NavLink>
      </Box>

      <Box
        ref={containerRef}
        sx={{
          position: "absolute",
          zIndex: 1,
          inset: `calc(${20 * (15 / 100)}px * -2)`,
          transition(theme) {
            return theme.transitions.create(["filter", "inset"]);
          },
          filter: `blur(${20 * (15 / 100)}px)`,
        }}
      >
        <StyledImg
          src={new URL(bgImg, import.meta.url).href}
          alt="just her"
          width={bgSize.width}
          height={bgSize.height}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            bgcolor: alpha("#000", 15 / 100),
            transition(theme) {
              return theme.transitions.create("background-color");
            },
          }}
        ></Box>
      </Box>
    </Box>
  );
}

const StyledImg = styled("img")({
  position: "absolute",
  inset: 0,
  zIndex: 2,
  objectFit: "cover",
});
