import {
  LightModeOutlined,
  DarkModeOutlined,
  DesktopWindowsOutlined,
} from "@mui/icons-material";
import {
  Typography,
  styled,
  Grid,
  RadioGroup,
  Radio,
  alpha,
} from "@mui/material";
import React from "react";
import { useThemeStore } from "@/hooks/store/useThemeStore";
import { CollapsibleCard } from "./CollapsibleCard";

export function ModeCard() {
  const mode = useThemeStore((store) => store.mode);
  const setMode = useThemeStore((store) => store.setMode);

  return (
    <CollapsibleCard title="Mode" subheader="Light? Dark? System?">
      <RadioGroup
        value={mode}
        onChange={(evt, value) => {
          void evt;
          switch (value) {
            case "system":
            case "light":
            case "dark":
              React.startTransition(() => {
                setMode(value);
              });
              break;
            default:
          }
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <StyledLabel>
              <LightModeOutlined fontSize="inherit" />
              <Radio value="light" hidden sx={{ display: "none" }} />
            </StyledLabel>
            <Typography variant="body2">Light</Typography>
          </Grid>
          <Grid item xs={4}>
            <StyledLabel>
              <DarkModeOutlined fontSize="inherit" />
              <Radio value="dark" hidden sx={{ display: "none" }} />
            </StyledLabel>
            <Typography variant="body2">Dark</Typography>
          </Grid>
          <Grid item xs={4}>
            <StyledLabel>
              <DesktopWindowsOutlined fontSize="inherit" />
              <Radio value="system" hidden sx={{ display: "none" }} />
            </StyledLabel>
            <Typography variant="body2">System</Typography>
          </Grid>
        </Grid>
      </RadioGroup>
    </CollapsibleCard>
  );
}

const StyledLabel = styled("label")(({ theme }) => {
  const primaryColor = theme.palette.primary.main;
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: theme.shape.borderRadius + "px",
    borderColor: theme.palette.divider,
    fontSize: 32,
    paddingBlock: theme.spacing(3),
    cursor: "pointer",
    transition: theme.transitions.create([
      "color",
      "border-color",
      "background-color",
    ]),
    "&:has( input:checked)": {
      color: primaryColor,
      borderColor: primaryColor,
      backgroundColor: alpha(primaryColor, 0.08),
    },
  };
});
