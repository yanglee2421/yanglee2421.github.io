// MUI Imports
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  ScopedCssBaseline,
} from "@mui/material";

// Theme Imports
import { toThemeValue } from "./theme-utils";

// Redux Imports
import { useAppSelector } from "@/redux";

// React Imports
import React from "react";

// Components Imports
import { ThemeGlobalStyles } from "./theme-global-styles";

void ScopedCssBaseline;

export function ThemeProvider(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  // Redux Hooks
  const isDark = useAppSelector((s) => s.theme.isDark);
  const theme = toThemeValue({ isDark });

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeGlobalStyles />
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
