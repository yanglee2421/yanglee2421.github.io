import bg from "@/assets/images/justHer.jpg";
import {
  alpha,
  Box,
  ButtonBase,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  Slider as MuiSlider,
  Stack,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Slider } from "./Slider";
import "./border.css";

const calculateAssetsHref = (path: string) => {
  return new URL(path, import.meta.url).href;
};

const AnimateBorderButton = () => {
  const theme = useTheme();

  return (
    <ButtonBase
      sx={{
        paddingInline: 2,
        paddingBlock: 1,

        borderColor: "transparent",
        borderWidth: 3,
        borderStyle: "solid",
        borderRadius: (theme) => theme.shape.borderRadius + "px",

        position: "relative",
        isolation: "isolate",

        animation: "glow 4s infinite linear",

        background: `linear-gradient(${alpha(theme.palette.background.default, 1)} 0 0) padding-box,
        conic-gradient(from var(--glow-deg),#399953 0deg 90deg, #fbb300 90deg 180deg,#d53e33 180deg 270deg,#377af5 270deg 360deg) border-box`,
      }}
    >
      Google
    </ButtonBase>
  );
};

const AnimateBorderButton2 = () => {
  const theme = useTheme();

  return (
    <ButtonBase
      sx={{
        paddingInline: 2,
        paddingBlock: 1,

        borderColor: "transparent",
        borderWidth: 3,
        borderStyle: "solid",
        borderRadius: (theme) => theme.shape.borderRadius + "px",

        position: "relative",
        isolation: "isolate",

        animation: "glow 4s infinite linear",

        background: `linear-gradient(${alpha(theme.palette.background.default, 1)} 0 0) padding-box,
        conic-gradient(from var(--glow-deg),${theme.palette.divider},rgb(245, 118, 60),${theme.palette.divider} 30%) border-box`,
      }}
    >
      Search
    </ButtonBase>
  );
};

const GoogleButton = (props: React.PropsWithChildren) => {
  const theme = useTheme();

  return (
    <ButtonBase
      sx={{
        // Padding box background must forward to the border box background
        background: `linear-gradient(${alpha(theme.palette.background.default, 1)} 0 0) padding-box,
        conic-gradient(from var(--glow-deg),#13f41c,#33acf1) border-box`,

        paddingInline: 2,
        paddingBlock: 1,

        borderColor: "transparent",
        borderWidth: 3,
        borderStyle: "solid",
        borderRadius: theme.shape.borderRadius + "px",

        position: "relative",
        isolation: "isolate",

        animation: "glow 8s infinite linear",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: "0.125rem",
          zIndex: -1,

          borderRadius: "inherit",

          background: `linear-gradient(${theme.palette.background.default} 0 0)`,
          filter: "blur(1rem)",
          transformOrigin: "center",
          scale: "1 1",
        }}
      ></Box>
      {props.children}
      <Box
        sx={{
          position: "absolute",
          inset: "-0.125rem",
          zIndex: -2,
          borderRadius: "inherit",
          background: `conic-gradient(from var(--glow-deg),#13f41c,#33acf1) border-box`,
          filter: "blur(1rem)",
          opacity: 0.25,
        }}
      ></Box>
    </ButtonBase>
  );
};

export const Component = () => {
  const bgImgHref = calculateAssetsHref(bg);

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius(theme) {
            return theme.shape.borderRadius + "px";
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1,

            backgroundImage: `url(${bgImgHref})`,
            backgroundPosition: "50%",
            backgroundSize: "150%",

            filter: "blur(15px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 2,

            backgroundColor: alpha(grey[700], 0.4),
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 3,

            display: "flex",
            alignItems: "center",

            height: 320,

            padding: 4,
          }}
        >
          <img src={bgImgHref} width={192} height={108} />
        </Box>
      </Box>
      <Card>
        <CardHeader title={"Styling button"} />
        <CardContent>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            <AnimateBorderButton />
            <AnimateBorderButton2 />
            <GoogleButton>Try me</GoogleButton>
          </Box>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Slider" subheader=" slider input" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <FormLabel>Slider</FormLabel>
                <FormGroup>
                  <Box sx={{ paddingBlock: 2 }}>
                    <Slider />
                  </Box>
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl>
                <FormLabel>Native</FormLabel>
                <FormGroup>
                  <input type="range" />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <FormLabel>MUI</FormLabel>
                <FormGroup>
                  <MuiSlider />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};
