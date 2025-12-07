import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Router } from "@/router";
import { useIsDark } from "@/hooks/dom/useIsDark";
import { useLocalStore } from "@/hooks/store/useLocalStore";
import { SnackbarProvider } from "@/components/ui/snackbar";
import { QueryProvider } from "./components/query";
import type { Mode } from "@/hooks/store/useLocalStore";

const lightTheme = createTheme({
  palette: { mode: "light" },
  components: {
    MuiAlert: {
      defaultProps: {
        variant: "filled",
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiAlert: {
      defaultProps: {
        variant: "filled",
      },
    },
  },
});

const enableDark = (mode: Mode, isDark: boolean) => {
  switch (mode) {
    case "dark":
      return true;
    case "light":
      return false;
    case "system":
    default:
      return isDark;
  }
};

const MuiProvider = (props: React.PropsWithChildren) => {
  const isDark = useIsDark();
  const [, i18n] = useTranslation();
  const mode = useLocalStore((s) => s.mode);

  const hasDarkSelector = enableDark(mode, isDark);
  const theme = hasDarkSelector ? darkTheme : lightTheme;
  const themeColor = hasDarkSelector
    ? theme.palette.background.default
    : theme.palette.primary.main;

  return (
    <ThemeProvider theme={theme}>
      <meta name="theme-color" content={themeColor} />
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={i18n.language}
      >
        <SnackbarProvider
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          autoHideDuration={1000 * 6}
          maxSnack={3}
        >
          {props.children}
        </SnackbarProvider>
      </LocalizationProvider>
      <CssBaseline />
      <GlobalStyles
        styles={{
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
          "code,kbd,pre,samp": {
            fontFamily:
              "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
            fontSize: "1.25rem",
          },
        }}
      />
    </ThemeProvider>
  );
};

export const App = () => {
  return (
    <QueryProvider>
      <MuiProvider>
        <Router />
      </MuiProvider>
    </QueryProvider>
  );
};
