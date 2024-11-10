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

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6366f1",
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },
    background: {
      default: "#f4f4f5",
      paper: "#fafafa",
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
    },
    text: {
      primary: "#ffffff",
      secondary: "#94a3b8",
    },
    background: {
      default: "#09090b",
      paper: "#18181b",
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
