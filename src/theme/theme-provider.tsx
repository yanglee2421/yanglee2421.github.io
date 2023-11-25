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
import { useThemeQuery } from "@/hooks/api-theme";

void ScopedCssBaseline;

export function ThemeProvider(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  // Redux Hooks
  const themeQuery = useThemeQuery();
  const isDarkMedia = useIsDark();

  const toIsDark = () => {
    switch (themeQuery.data.mode) {
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
