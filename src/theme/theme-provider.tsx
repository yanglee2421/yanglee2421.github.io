// MUI Imports
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  ScopedCssBaseline,
  GlobalStyles,
} from "@mui/material";

// Theme Imports
import { toTheme } from "./to-theme";

// React Imports
import React from "react";

// Components Imports
import { toGlobalStyles } from "./to-global-styles";

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

  const toIsDark = () => {
    switch (mode) {
      case "auto":
        return isDarkMedia;
      case "dark":
        return true;
      case "light":
        return false;
      default:
        return false;
    }
  };

  const theme = toTheme({ isDark: toIsDark() });

  return (
    <MuiThemeProvider theme={theme}>
      <GlobalStyles styles={toGlobalStyles(theme)} />
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
