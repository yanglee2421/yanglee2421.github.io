import { alpha } from "@mui/material";

import type { PaletteOptions } from "@mui/material";

export function configToPalette(params: PaletteConfig): PaletteOptions {
  const { mode } = params;

  const blackColor = "#000";
  const whiteColor = "#fff";
  const mainColor = mode === "light" ? blackColor : whiteColor;

  return {
    mode,
    common: {
      white: "#fff",
      black: "#000",
    },
    primary: {
      light: "#8592f2",
      main: "#6777ef",
      dark: "#4853a7",
      contrastText: whiteColor,
    },
    secondary: {
      light: "#a6a8ad",
      main: "#909399",
      dark: "#64666b",
      contrastText: whiteColor,
    },
    error: {
      light: "#ff7072",
      main: "#ff4d4f",
      dark: "#b23537",
      contrastText: whiteColor,
    },
    warning: {
      light: "#ffc473",
      main: "#ffc107",
      dark: "#ffa426",
      contrastText: whiteColor,
    },
    info: {
      light: "#4492ff",
      main: "#1677ff",
      dark: "#0f53b2",
      contrastText: whiteColor,
    },
    success: {
      light: "#74cf47",
      main: "#52c41a",
      dark: "#398912",
      contrastText: whiteColor,
    },
    grey: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#F5F5F5",
      A200: "#EEEEEE",
      A400: "#BDBDBD",
      A700: "#616161",
    },
    text: {
      primary: alpha(mainColor, 0.87),
      secondary: alpha(mainColor, 0.6),
      disabled: alpha(mainColor, 0.38),
    },
    divider: alpha(mainColor, 0.12),
    background: {
      paper: mode === "dark" ? "black" : "white",
      default: mode === "dark" ? "black" : "white",
    },
    action: {
      active: alpha(mainColor, 0.54),
      disabled: alpha(mainColor, 0.26),
      disabledBackground: alpha(mainColor, 0.12),
      focus: alpha(mainColor, 0.12),
      hover: alpha(mainColor, 0.04),
      selected: alpha(mainColor, 0.08),
      activatedOpacity: 0.54,
      disabledOpacity: 0.26,
      focusOpacity: 0.12,
      hoverOpacity: 0.04,
      selectedOpacity: 0.08,
    },
  };
}

interface PaletteConfig {
  mode: "dark" | "light";
}
