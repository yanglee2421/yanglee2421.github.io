// MUI Imports
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  ScopedCssBaseline,
  GlobalStyles,
} from "@mui/material";

// Theme Imports
import { toTheme } from "./to-theme";

// Redux Imports
import { useAppDispatch, useAppSelector, sliceTheme } from "@/redux";

// React Imports
import React from "react";

// Components Imports
import { toGlobalStyles } from "./to-global-styles";

// Hooks Imports
import { useIsDark } from "@/hooks/dom";

void ScopedCssBaseline;

export function ThemeProvider(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  // Redux Hooks
  const isDark = useAppSelector((s) => s.theme.isDark);
  const theme = toTheme({ isDark });

  const isDarkMedia = useIsDark();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(sliceTheme.actions.isDark(isDarkMedia));
  }, [dispatch, isDarkMedia]);

  return (
    <MuiThemeProvider theme={theme}>
      <GlobalStyles styles={toGlobalStyles(theme)} />
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
