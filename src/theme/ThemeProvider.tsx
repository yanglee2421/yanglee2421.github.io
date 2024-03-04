
import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import React from "react";

import { useIsDark } from "@/hooks/dom/useIsDark";
import { useThemeStore } from "@/hooks/store/useThemeStore";

import { configToPalette } from "./configToPalette";
import { shadowsMap } from "./shadowsMap";

import type {
  BreakpointsOptions,
  Components,
  GlobalStylesProps,
  Theme} from "@mui/material";

export function ThemeProvider(props: React.PropsWithChildren) {
  const themeMode = useThemeStore((store) => store.mode);
  const isDark = useIsDark();

  const mode = (() => {
    switch (themeMode) {
      case "dark":
      case "light":
        return themeMode;
      case "system":
      default:
        return isDark ? "dark" : "light";
    }
  })();

  const theme = createTheme({
    breakpoints: breakpoints(),
    spacing(factor: number) {
      return `${0.25 * factor}rem`;
    },

    shape: {
      borderRadius: 6,
    },
    shadows: shadowsMap.get(mode),

    palette: configToPalette({
      mode,
    }),
    typography: {},
    components: cmponents(),
  });

  return (
    <MuiThemeProvider theme={theme}>
      <GlobalStyles styles={themeToGlobalStyles(theme)}></GlobalStyles>
      <CssBaseline></CssBaseline>
      {props.children}
    </MuiThemeProvider>
  );
}

function themeToGlobalStyles(theme: Theme): GlobalStylesProps["styles"] {
  return {
    // Ngrogress Bar
    "#nprogress .bar": {
      position: "fixed",
      left: 0,
      top: 0,
      zIndex: theme.zIndex.appBar + 1,

      width: "100%",
      height: 3,

      backgroundColor:
        theme.palette.mode === "dark"
          ? theme.palette.primary.dark
          : theme.palette.primary.light,
    },

    // Body
    "html, body": {
      height: "100%",
    },
  };
}

function breakpoints(): BreakpointsOptions {
  return {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
    unit: "px",
  };
}

function cmponents(): Components<Omit<Theme, "components">> {
  return {
    MuiTypography: {
      variants: [
        {
          props: { variant: "body2" },
          style({ theme }) {
            return { color: theme.palette.text.secondary };
          },
        },
      ],
    },
  };
}
