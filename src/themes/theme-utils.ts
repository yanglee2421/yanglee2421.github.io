// MUI Imports
import { createTheme } from "@mui/material";

export function toThemeValue(params: ToThemeValueParams) {
  // ** Params
  const { isDark } = params;

  const lightColor = "58, 53, 65";
  const darkColor = "231, 227, 252";
  const mainColor = isDark ? darkColor : lightColor;

  return createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
      common: {
        black: "#000",
        white: "#fff",
      },
      primary: {
        main: "#9155FD",
        light: "#9E69FD",
        dark: "#804BDF",
        contrastText: "#fff",
      },
      secondary: {
        main: "#8A8D93",
        light: "#9C9FA4",
        dark: "#777B82",
        contrastText: "#fff",
      },
      success: {
        light: "#6AD01F",
        main: "#56CA00",
        dark: "#4CB200",
        contrastText: "#fff",
      },
      error: {
        main: "#FF4C51",
        light: "#FF6166",
        dark: "#E04347",
        contrastText: "#fff",
      },
      warning: {
        light: "#FFCA64",
        main: "#FFB400",
        dark: "#E09E00",
        contrastText: "#fff",
      },
      info: {
        light: "#32BAFF",
        main: "#16B1FF",
        dark: "#139CE0",
        contrastText: "#fff",
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
        paper: isDark ? lightColor : "#fff",
        default: "#F4F5FA",
      },
      action: {
        active: `rgba(${mainColor}, 0.54)`,
        hover: `rgba(${mainColor}, 0.04)`,
        selected: `rgba(${mainColor}, 0.08)`,
        disabled: `rgba(${mainColor}, 0.26)`,
        disabledBackground: `rgba(${mainColor}, 0.12)`,
        focus: `rgba(${mainColor}, 0.12)`,
      },
    },
    typography(palette) {
      void palette;
      return {};
    },
  });
}

export interface ToThemeValueParams {
  isDark: boolean;
}
