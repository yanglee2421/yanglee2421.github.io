// MUI Imports
import { PaletteOptions } from "@mui/material";

export function configToPalette(params: PaletteConfig): PaletteOptions {
  // ** Params
  const { mode } = params;

  return {
    mode,
  };
}

interface PaletteConfig {
  mode: "dark" | "light";
  lightColor: string;
  darkColor: string;
  whiteColor: string;
}
