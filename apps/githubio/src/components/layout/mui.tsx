import { useColorScheme } from "@/hooks/dom/useColorScheme";
import type { Mode } from "@/hooks/store/useLocalStore";
import { useLocalStore } from "@/hooks/store/useLocalStore";
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
import { ToastContainer } from "react-toastify";

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

const calcTheme = (isDark: boolean) => {
  const builder = new MuiThemeBuilder({
    components: {
      MuiAlert: {
        defaultProps: { variant: "filled" },
      },
    },
  });

  return isDark ? builder.dark() : builder.light();
};

const calcDarkEnabled = (mode: Mode, colorSchema: boolean) => {
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

export const MuiProvider = (props: React.PropsWithChildren) => {
  const { i18n } = useTranslation();
  const colorSchema = useColorScheme();
  const mode = useLocalStore((s) => s.mode);

  const darkEnabled = calcDarkEnabled(mode, colorSchema);
  const theme = calcTheme(darkEnabled);
  const themeColor = darkEnabled
    ? theme.palette.background.default
    : theme.palette.primary.main;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <meta name="theme-color" content={themeColor} />
      <ToastContainer theme={darkEnabled ? "dark" : "light"} />
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
          html: { colorScheme: darkEnabled ? "dark" : "light" },
        }}
      />
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={i18n.language}
      >
        {props.children}
      </LocalizationProvider>
    </ThemeProvider>
  );
};
