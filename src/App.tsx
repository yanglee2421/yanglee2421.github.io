import { RouterUI } from "@/router/RouterUI";
import { useLocalStoreHasHydrated } from "@/hooks/store/useLocalStore";
import { useDbStoreHasHydrated } from "./hooks/store/useDbStore";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/constants";
import { Loading } from "./components/loading";
import { useIsDark } from "@/hooks/dom/useIsDark";
import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { type Mode, useLocalStore } from "@/hooks/store/useLocalStore";
import "dayjs/locale/zh";
import "dayjs/locale/en";
import { useTranslation } from "react-i18next";
import { SnackbarProvider } from "notistack";

const WHITE = "#fff";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6366f1",
      contrastText: WHITE,
    },
    secondary: {
      main: "#9ca3af",
      contrastText: WHITE,
    },
    error: {
      main: "#ef4444",
      contrastText: WHITE,
    },
    warning: {
      main: "#f59e0b",
      contrastText: WHITE,
    },
    info: {
      main: "#3b82f6",
      contrastText: WHITE,
    },
    success: {
      main: "#22c55e",
      contrastText: WHITE,
    },
    text: {
      primary: "#09090b",
      secondary: "#71717a",
    },
    background: {
      default: WHITE,
      paper: WHITE,
    },
    divider: "#e4e4e7",
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
      contrastText: WHITE,
    },
    secondary: {
      main: "#9ca3af",
      contrastText: WHITE,
    },
    error: {
      main: "#ef4444",
      contrastText: WHITE,
    },
    warning: {
      main: "#f59e0b",
      contrastText: WHITE,
    },
    info: {
      main: "#3b82f6",
      contrastText: WHITE,
    },
    success: {
      main: "#22c55e",
      contrastText: WHITE,
    },
    text: {
      primary: "#fafafa",
      secondary: "#a1a1aa",
    },
    background: {
      default: "#09090b",
      paper: "#09090b",
    },
    divider: "#27272a",
  },

  spacing(abs: number) {
    return `${abs * 0.25}rem`;
  },
});

const modeToHasSelector = (mode: Mode, isDark: boolean) => {
  switch (mode) {
    case "system":
      return isDark;

    case "dark":
      return true;
    case "light":
      return false;
  }
};

const MuiProvider = (props: React.PropsWithChildren) => {
  const isDark = useIsDark();
  const mode = useLocalStore((s) => s.mode);
  const hasDarkSelector = modeToHasSelector(mode, isDark);
  const theme = hasDarkSelector ? darkTheme : lightTheme;
  const [, i18n] = useTranslation();
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

const QueryProvider = (props: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
      <ReactQueryDevtools buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
};

export const App = () => {
  const hasHydrated = useLocalStoreHasHydrated();
  const hasDbHydrated = useDbStoreHasHydrated();

  const renderRouter = () => {
    if (!hasHydrated) {
      return <Loading />;
    }

    if (!hasDbHydrated) {
      return <Loading />;
    }

    return <RouterUI />;
  };

  return (
    <QueryProvider>
      <MuiProvider>{renderRouter()}</MuiProvider>
    </QueryProvider>
  );
};
