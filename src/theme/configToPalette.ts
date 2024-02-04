// MUI Imports
import { PaletteOptions } from "@mui/material";

export function configToPalette(params: PaletteConfig): PaletteOptions {
  // ** Params
  const { mode } = params;

  return {
    mode,
    primary: {
      main: "#6777ef",
      dark: "#4853a7",
      light: "#8592f2",
    },
    secondary: {
      main: "#909399",
      dark: "#64666b",
      light: "#a6a8ad",
    },
    success: {
      main: "#52c41a",
      dark: "#398912",
      light: "#74cf47",
    },
    error: {
      main: "#ff4d4f",
      dark: "#b23537",
      light: "#ff7072",
    },
    warning: {
      main: "#ffc107",
      dark: "#ffa426",
      light: "#ffc473",
    },
    info: {
      main: "#1677ff",
      dark: "#0f53b2",
      light: "#4492ff",
    },
  };
}

interface PaletteConfig {
  mode: "dark" | "light";
}
