import { SnackbarProvider } from "@/components/ui/snackbar";
import { useColorScheme } from "@/hooks/dom/useColorScheme";
import type { Mode } from "@/hooks/store/useLocalStore";
import { useLocalStore } from "@/hooks/store/useLocalStore";
import { AppRouter } from "@/router";
import type { ThemeOptions } from "@mui/material";
import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import { QueryProvider } from "./components/query";

class MuiThemeBuilder {
  private options?: ThemeOptions;

  constructor(options?: ThemeOptions) {
    this.options = options;
  }

  light() {
    return createTheme({
      ...this.options,
      palette: {
        ...this.options?.palette,
        mode: "light",
      },
    });
  }
  dark() {
    return createTheme({
      ...this.options,
      palette: {
        ...this.options?.palette,
        mode: "dark",
      },
    });
  }
}

const calculateTheme = (isDark: boolean) => {
  const builder = new MuiThemeBuilder({
    components: {
      MuiAlert: {
        defaultProps: { variant: "filled" },
      },
    },
  });

  return isDark ? builder.dark() : builder.light();
};

const calculateIsDark = (mode: Mode, colorSchema: boolean) => {
  switch (mode) {
    case "dark":
      return true;
    case "light":
      return false;
    case "system":
    default:
      return colorSchema;
  }
};

const MuiProvider = (props: React.PropsWithChildren) => {
  const { i18n } = useTranslation();
  const colorSchema = useColorScheme();
  const mode = useLocalStore((s) => s.mode);

  const isDark = calculateIsDark(mode, colorSchema);
  const theme = calculateTheme(isDark);
  const themeColor = isDark
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
        <AppRouter />
      </MuiProvider>
    </QueryProvider>
  );
};
