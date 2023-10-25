// MUI Imports
import { Components, Theme } from "@mui/material";

// Type Imports
import { ToThemeParams } from "./to-theme";

export function toComponents(
  params: ToThemeParams
): Components<Omit<Theme, "components">> {
  void params;

  return {
    MuiTypography: {
      variants: [
        {
          props: { variant: "body2" },
          style({ theme }) {
            return { color: theme.palette.text.secondary };
          },
        },
      ],
    },
  };
}
