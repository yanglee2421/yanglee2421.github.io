// MUI Imports
import { createTheme } from "@mui/material";

//
import { toPalette } from "./to-palette";
import { toBreakpoints } from "./to-breakpoints";
import { toShadows } from "./to-shadows";
import { toTypography } from "./to-typography";
import { toComponents } from "./to-components";

export function toTheme(params: ToThemeParams) {
  return createTheme({
    breakpoints: toBreakpoints(params),
    palette: toPalette(params),
    shadows: toShadows(params),
    spacing(factor: number) {
      return `${0.25 * factor}rem`;
    },
    shape: {
      borderRadius: 3,
    },
    typography(palette) {
      return toTypography(params, palette);
    },
    components: toComponents(params),
  });
}

export interface ToThemeParams {
  isDark: boolean;
}
