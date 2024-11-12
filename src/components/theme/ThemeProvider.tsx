import { useIsDark } from "@/hooks/dom/useIsDark";
import {
  alpha,
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { type Mode, useLocaleStore } from "@/hooks/store/useLocaleStore";

const LIGHT_COLOR = "#fff";
const DARK_COLOR = "#000";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6366f1",
      contrastText: LIGHT_COLOR,
    },
    secondary: {
      main: "#9ca3af",
      contrastText: LIGHT_COLOR,
    },
    error: {
      main: "#ef4444",
    },
    success: {
      main: "#22c55e",
      contrastText: LIGHT_COLOR,
    },
    warning: {
      main: "#f59e0b",
      contrastText: LIGHT_COLOR,
    },
    text: {
      primary: alpha(DARK_COLOR, 0.875),
      secondary: alpha(DARK_COLOR, .5),
    },
    background: {
      default: LIGHT_COLOR,
      paper: LIGHT_COLOR,
    },
  },

  spacing(abs: number) {
    return `${abs * 0.25}rem`;
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6366f1",
      contrastText: LIGHT_COLOR,
    },
    secondary: {
      main: "#9ca3af",
      contrastText: LIGHT_COLOR,
    },
    error: {
      main: "#ef4444",
    },
    success: {
      main: "#22c55e",
      contrastText: LIGHT_COLOR,
    },
    warning: {
      main: "#f59e0b",
      contrastText: LIGHT_COLOR,
    },
    text: {
      primary: alpha(LIGHT_COLOR, 0.875),
      secondary: alpha(LIGHT_COLOR, .625),
    },
    background: {
      default: DARK_COLOR,
      paper: DARK_COLOR,
    },
  },

  spacing(abs: number) {
    return `${abs * 0.25}rem`;
  },
});

export function ThemeProvider(props: React.PropsWithChildren) {
  const isDark = useIsDark();
  const mode = useLocaleStore((s) => s.mode);
  const theme = modeToHasSelector(mode, isDark) ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {props.children}
      </LocalizationProvider>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "#nprogress": {
            position: "fixed",
            top: 0,
            inlineSize: "100dvw",

            zIndex: theme.zIndex.drawer + 1,
          },
          "#nprogress .bar": {
            backgroundColor: theme.palette.primary.main,
            blockSize: theme.spacing(1),
          },
          ".animate-spin": {
            animation: "spin 1s linear infinite",
          },
          "@keyframes spin": {
            from: {
              transform: "rotate(0deg)",
            },
            to: {
              transform: "rotate(360deg)",
            },
          },
        }}
      />
    </MuiThemeProvider>
  );
}

function modeToHasSelector(mode: Mode, isDark: boolean) {
  switch (mode) {
    case "system":
      return isDark;

    case "dark":
      return true;
    case "light":
      return false;
  }
}
