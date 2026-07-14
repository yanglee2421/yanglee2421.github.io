import { useColorScheme } from "@/hooks/dom/useColorScheme";
import { useLocalStore } from "@/hooks/store/useLocalStore";
import { createTheme, ThemeProvider } from "@mui/material";
import type React from "react";

const resolveIsDark = (mode: "system" | "dark" | "light", isDark?: boolean) => {
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

export const LayoutTheme = (props: React.PropsWithChildren) => {
  const mode = useLocalStore((s) => s.mode);
  const nativeDark = useColorScheme();
  const isDark = resolveIsDark(mode, nativeDark);
  const theme = createTheme({ palette: { mode: isDark ? "dark" : "light" } });

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

LayoutTheme.resolveIsDark = resolveIsDark;
