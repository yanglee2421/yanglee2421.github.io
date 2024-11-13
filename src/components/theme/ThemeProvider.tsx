import { useIsDark } from "@/hooks/dom/useIsDark";
import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { type Mode, useLocaleStore } from "@/hooks/store/useLocaleStore";

const WHITE = "#fff";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6366f1",
      contrastText: WHITE,
    },
    secondary: {
      main: "#9ca3af",
      contrastText: WHITE,
    },
    error: {
      main: "#ef4444",
      contrastText: WHITE,
    },
    warning: {
      main: "#f59e0b",
      contrastText: WHITE,
    },
    info: {
      main: "#3b82f6",
      contrastText: WHITE,
    },
    success: {
      main: "#22c55e",
      contrastText: WHITE,
    },
    text: {
      primary: "#09090b",
      secondary: "#71717a",
    },
    background: {
      default: WHITE,
      paper: WHITE,
    },
    divider: "#e4e4e7",
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
      contrastText: WHITE,
    },
    secondary: {
      main: "#9ca3af",
      contrastText: WHITE,
    },
    error: {
      main: "#ef4444",
      contrastText: WHITE,
    },
    warning: {
      main: "#f59e0b",
      contrastText: WHITE,
    },
    info: {
      main: "#3b82f6",
      contrastText: WHITE,
    },
    success: {
      main: "#22c55e",
      contrastText: WHITE,
    },
    text: {
      primary: "#fafafa",
      secondary: "#a1a1aa",
    },
    background: {
      default: "#09090b",
      paper: "#09090b",
    },
    divider: "#27272a",
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
