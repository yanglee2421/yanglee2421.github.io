// MUI Imports
import { PaletteOptions } from "@mui/material";

// Type Imports
import type { ToThemeParams } from "./to-theme";

export function toPalette(params: ToThemeParams): PaletteOptions {
  // ** Params
  const { isDark } = params;

  const whiteColor = "#FFF";
  const lightColor = "58, 53, 65";
  const darkColor = "231, 227, 252";
  const mainColor = isDark ? darkColor : lightColor;

  return {
    mode: isDark ? "dark" : "light",
    common: {
      black: "#000",
      white: whiteColor,
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
    primary: {
      main: "#9155FD",
      light: "#9E69FD",
      dark: "#804BDF",
      contrastText: whiteColor,
    },
    secondary: {
      main: "#8A8D93",
      light: "#9C9FA4",
      dark: "#777B82",
      contrastText: whiteColor,
    },
    success: {
      main: "#56CA00",
      light: "#6AD01F",
      dark: "#4CB200",
      contrastText: whiteColor,
    },
    error: {
      main: "#FF4C51",
      light: "#FF6166",
      dark: "#E04347",
      contrastText: whiteColor,
    },
    warning: {
      main: "#FFB400",
      light: "#FFCA64",
      dark: "#E09E00",
      contrastText: whiteColor,
    },
    info: {
      main: "#16B1FF",
      light: "#32BAFF",
      dark: "#139CE0",
      contrastText: whiteColor,
    },
    divider: `rgba(${mainColor}, 0.12)`,
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.6)`,
      disabled: `rgba(${mainColor}, 0.38)`,
    },
    background: {
      paper: isDark ? "#312D4B" : whiteColor,
      default: isDark ? "#28243D" : "#F4F5FA",
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      hoverOpacity: 0.08,
      selected: `rgba(${mainColor}, 0.08)`,
      selectedOpacity: 0.16,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledOpacity: 0.38,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`,
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
  };
}
