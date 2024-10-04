import { useIsDark } from "@/hooks/dom/useIsDark";
import { useThemeStore, type Mode } from "@/hooks/store/useThemeStore";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import React from "react";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6366f1",
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
  },

  spacing(abs: number) {
    return `${abs * 0.25}rem`;
  },
});

export function ThemeProvider(props: React.PropsWithChildren) {
  const isDark = useIsDark();
  const mode = useThemeStore((s) => s.mode);
  const theme = modeToHasSelector(mode, isDark) ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={theme}>
      {props.children}
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
