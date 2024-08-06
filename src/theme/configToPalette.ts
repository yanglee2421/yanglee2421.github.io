import { alpha } from "@mui/material";
import type { PaletteOptions } from "@mui/material";

export function configToPalette(params: PaletteConfig): PaletteOptions {
  const { mode } = params;

  const mainColor = mode === "light" ? "#3b3541" : "#e7e3fc";

  return {
    mode,
    common: {
      white: whiteColor,
      black: blackColor,
    },
    primary: {
      light: "#979df3",
      main: "#6777ef",
      dark: "#3c58eb",
      contrastText: whiteColor,
    },
    secondary: {
      main: "#909399",
      light: "#b0b3b9",
      dark: "#686b71",
      contrastText: whiteColor,
    },

    success: {
      main: "#52c41a",
      light: "#74cf47",
      dark: "#398912",
      contrastText: whiteColor,
    },
    error: {
      main: "#ff4d4f",
      light: "#ff7072",
      dark: "#b23537",
      contrastText: whiteColor,
    },
    warning: {
      main: "#ffc107",
      light: "#ffc473",
      dark: "#ffa426",
      contrastText: whiteColor,
    },
    info: {
      main: "#1677ff",
      light: "#4492ff",
      dark: "#0f53b2",
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

    divider: alpha(mainColor, 0.12),
    text: {
      primary: alpha(mainColor, 0.87),
      secondary: alpha(mainColor, 0.6),
      disabled: alpha(mainColor, 0.38),
    },

    action: {
      hover: alpha(mainColor, 0.04),
      hoverOpacity: 0.04,
      selected: alpha(mainColor, 0.08),
      selectedOpacity: 0.08,
      focus: alpha(mainColor, 0.12),
      focusOpacity: 0.12,
      active: alpha(mainColor, 0.54),
      activatedOpacity: 0.54,
      disabled: alpha(mainColor, 0.26),
      disabledOpacity: 0.26,
      disabledBackground: alpha(mainColor, 0.12),
    },

    background: {
      // default: "#F4F5FA",
      // paper: whiteColor,
    },
  };
}

const blackColor = "#000";
const whiteColor = "#fff";

interface PaletteConfig {
  mode: "dark" | "light";
}
