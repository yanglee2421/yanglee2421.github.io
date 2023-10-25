// MUI Imports
import { BreakpointsOptions } from "@mui/material";

// Type Imports
import type { ToThemeParams } from "./to-theme";

export function toBreakpoints(params: ToThemeParams): BreakpointsOptions {
  // ** Params
  void params;

  return {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
    unit: "px",
  };
}
