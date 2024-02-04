// MUI Imports
import { PaletteOptions } from "@mui/material";

export function configToPalette(params: PaletteConfig): PaletteOptions {
  // ** Params
  const { mode } = params;

  const blackColor = "#000";
  const whiteColor = "#f00";
  const mainColor = mode === "dark" ? blackColor : whiteColor;

  const defaultBgColor = () => {
    if (mode === "light") {
      return whiteColor;
    }

    // return "#312D4B";
    return "#28243D";
  };

  return {
    mode,
    primary: {
      light: "#8592f2",
      main: "#6777ef",
      dark: "#4853a7",
    },
    secondary: {
      light: "#a6a8ad",
      main: "#909399",
      dark: "#64666b",
    },
    error: {
      main: "#ff4d4f",
      dark: "#b23537",
      light: "#ff7072",
    },
    warning: {
      main: "#ffc107",
      dark: "#ffa426",
      light: "#ffc473",
    },
    info: {
      main: "#1677ff",
      dark: "#0f53b2",
      light: "#4492ff",
    },
    success: {
      light: "#74cf47",
      main: "#52c41a",
      dark: "#398912",
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
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.6)`,
      disabled: `rgba(${mainColor}, 0.38)`,
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === "light" ? whiteColor : "#312D4B",
      default: defaultBgColor(),
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`,
    },
  };
}

interface PaletteConfig {
  mode: "dark" | "light";
}
