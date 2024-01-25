// MUI Imports
import { Theme, useMediaQuery } from "@mui/material";

// Components Imports
import { DesktopLayout } from "./DesktopLayout";
import { MobileLayout } from "./MobileLayout";

export function Layout() {
  const upSm = useMediaQuery<Theme>((theme) => {
    return theme.breakpoints.up("sm");
  });

  return upSm ? <DesktopLayout></DesktopLayout> : <MobileLayout></MobileLayout>;
}
