import { useIsDark } from "@/hooks/dom/useIsDark";
import { useThemeStore, type Mode } from "@/hooks/store/useThemeStore";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import React from "react";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function ThemeProvider(props: React.PropsWithChildren) {
  const isDark = useIsDark();
  const mode = useThemeStore((s) => s.mode);

  return (
    <MuiThemeProvider
      theme={modeToHasSelector(mode, isDark) ? darkTheme : lightTheme}
    >
      {props.children}
    </MuiThemeProvider>
  );
}

function modeToHasSelector(mode: Mode, isDark: boolean) {
  switch (mode) {
    case "system":
      return isDark;

    case "dark":
      return true;
    case "light":
      return false;
  }
}
