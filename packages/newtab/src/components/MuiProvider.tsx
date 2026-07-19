import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import React from "react";

const calculateIsDark = (mode: Mode, colorScheme: boolean) => {
  switch (mode) {
    case "light":
      return false;
    case "dark":
      return true;
    case "system":
    default:
      return colorScheme;
  }
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#67D55E",
      light: "#85dd7e",
      dark: "#489541",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#67D55E",
      light: "#85dd7e",
      dark: "#489541",
    },
  },
});

const mediaQuery = matchMedia("(prefers-color-scheme: dark)");

const useColorScheme = () => {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      mediaQuery.addEventListener("change", onStoreChange);

      return () => {
        mediaQuery.removeEventListener("change", onStoreChange);
      };
    },
    () => mediaQuery.matches,
  );
};

export const MuiProvider = (props: React.PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const mode = useSyncStore((store) => store.mode);

  const isDark = calculateIsDark(mode, colorScheme);

  return (
    <ThemeProvider theme={isDark ? darkTheme : theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};
