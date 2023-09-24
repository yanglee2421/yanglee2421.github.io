// MUI Imports
import { createTheme } from "@mui/material";
import { red, blue } from "@mui/material/colors";

export function toThemeValue(params: ToThemeValueParams) {
  const { isDark } = params;

  return createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
      primary: {
        main: blue[500],
      },
      error: {
        main: red[500],
      },
    },
  });
}

export interface ToThemeValueParams {
  isDark: boolean;
}
