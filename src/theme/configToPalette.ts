// MUI Imports
import { PaletteOptions, alpha } from "@mui/material";
import {
  deepPurple,
  grey,
  lightGreen,
  red,
  amber,
  blue,
} from "@mui/material/colors";

export function configToPalette(params: PaletteConfig): PaletteOptions {
  // ** Params
  const { mode, lightColor, darkColor, whiteColor } = params;

  const isDark = mode === "dark";
  const mainColor = isDark ? darkColor : lightColor;

  return {
    mode,
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
      main: deepPurple["A400"],
      light: deepPurple["A200"],
      dark: deepPurple["A700"],
      contrastText: whiteColor,
    },
    secondary: {
      main: grey["A400"],
      light: grey["A200"],
      dark: grey["A700"],
      contrastText: whiteColor,
    },
    success: {
      main: lightGreen["A400"],
      light: lightGreen["A200"],
      dark: lightGreen["A700"],
      contrastText: whiteColor,
    },
    error: {
      main: red["A400"],
      light: red["A200"],
      dark: red["A700"],
      contrastText: whiteColor,
    },
    warning: {
      main: amber["A400"],
      light: amber["A200"],
      dark: amber["A700"],
      contrastText: whiteColor,
    },
    info: {
      main: blue["A400"],
      light: blue["A200"],
      dark: blue["A700"],
      contrastText: whiteColor,
    },

    divider: alpha(mainColor, 0.12),
    text: {
      primary: alpha(mainColor, 0.87),
      secondary: alpha(mainColor, 0.6),
      disabled: alpha(mainColor, 0.38),
    },
    background: {
      paper: isDark ? "#312D4B" : whiteColor,
      default: isDark ? "#28243D" : "#F4F5FA",
    },

    action: {
      active: alpha(mainColor, 0.54),
      activatedOpacity: 0.24,

      disabled: alpha(mainColor, 0.26),
      disabledOpacity: 0.38,
      disabledBackground: alpha(mainColor, 0.12),

      focus: alpha(mainColor, 0.12),
      focusOpacity: 0.12,

      hover: alpha(mainColor, 0.04),
      hoverOpacity: 0.08,

      selected: alpha(mainColor, 0.08),
      selectedOpacity: 0.16,
    },
  };
}

interface PaletteConfig {
  mode: "dark" | "light";
  lightColor: string;
  darkColor: string;
  whiteColor: string;
}
