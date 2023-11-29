// MUI Imports
import {
  BreakpointsOptions,
  createTheme,
  CssBaseline,
  Components,
  GlobalStyles,
  GlobalStylesProps,
  ScopedCssBaseline,
  Theme,
  ThemeProvider as MuiThemeProvider,
  Palette,
} from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

// Theme Imports
import { configToPalette } from "./configToPalette";
import { shadowsMap } from "./shadowsMap";

// React Imports
import React from "react";

// Hooks Imports
import { useIsDark } from "@/hooks/dom";

// Redux Imports
import { useAppSelector } from "@/redux";

void ScopedCssBaseline;

export function ThemeProvider(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  // Redux Hooks
  const mode = useAppSelector((s) => {
    return s.theme.mode;
  });
  const isDarkMedia = useIsDark();

  const themeMode = (() => {
    switch (mode) {
      case "dark":
      case "light":
        return mode;
      case "auto":
        return isDarkMedia ? "dark" : "light";
      default:
        return isDarkMedia ? "dark" : "light";
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
    shadows: shadowsMap.get(themeMode),

    palette: configToPalette({
      mode: themeMode,
      whiteColor: "#FFF",
      lightColor: "rgb(58, 53, 65)",
      darkColor: "rgb(231, 227, 252)",
    }),
    typography,
    components: cmponents(),
  });

  return (
    <MuiThemeProvider theme={theme}>
      <GlobalStyles styles={themeToGlobalStyles(theme)} />
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

function themeToGlobalStyles(theme: Theme): GlobalStylesProps["styles"] {
  const isDark = theme.palette.mode === "dark";

  // Nprogress Bar
  const nprogressBarBg = isDark
    ? theme.palette.primary.dark
    : theme.palette.primary.light;

  return {
    // Ngrogress Bar
    "#nprogress .bar": {
      position: "fixed",
      left: 0,
      top: 0,
      zIndex: theme.zIndex.appBar + 1,

      width: "100%",
      height: 3,

      backgroundColor: nprogressBarBg,
    },

    // React Root Element
    "#root": {
      height: "100%",
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

function typography(palette: Palette): TypographyOptions {
  void palette;

  return {
    fontFamily: [
      "Inter",
      "sans-serif",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontWeight: 500,
      letterSpacing: "-1.5px",
    },
    h2: {
      fontWeight: 500,
      letterSpacing: "-0.5px",
    },
    h3: {
      fontWeight: 500,
      letterSpacing: 0,
    },
    h4: {
      fontWeight: 500,
      letterSpacing: "0.25px",
    },
    h5: {
      fontWeight: 500,
      letterSpacing: 0,
    },
    h6: {
      letterSpacing: "0.15px",
    },
    subtitle1: {
      letterSpacing: "0.15px",
    },
    subtitle2: {
      letterSpacing: "0.1px",
    },
    body1: {
      letterSpacing: "0.15px",
    },
    body2: {
      lineHeight: 1.5,
      letterSpacing: "0.15px",
    },
    button: {
      letterSpacing: "0.3px",
    },
    caption: {
      letterSpacing: "0.4px",
    },
    overline: {
      letterSpacing: "1px",
    },
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
