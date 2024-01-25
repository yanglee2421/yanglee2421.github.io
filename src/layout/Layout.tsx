// MUI Imports
import { Theme, useMediaQuery } from "@mui/material";

// Components Imports
import { DesktopLayout } from "./DesktopLayout";
import { MobileLayout } from "./MobileLayout";

// Router Imports
import { useOutlet } from "react-router-dom";

export function Layout() {
  const upSm = useMediaQuery<Theme>((theme) => {
    return theme.breakpoints.up("sm");
  });
  const outlet = useOutlet();

  return upSm ? (
    <DesktopLayout>{outlet}</DesktopLayout>
  ) : (
    <MobileLayout>{outlet}</MobileLayout>
  );
}
