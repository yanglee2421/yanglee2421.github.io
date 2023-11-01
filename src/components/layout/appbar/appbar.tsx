// MUI Imports
import { AppBar, Toolbar, Avatar } from "@mui/material";

// Components Imports
import { MenuDrawer } from "@/components/layout/menu-drawer";
import { Trans } from "@/components/layout/trans";

// Theme Imports
import { ThemeToggle } from "@/theme";

export function Appbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "transparent" }}>
      <Toolbar>
        <MenuDrawer sx={{ mr: "auto" }} />
        <Trans />
        <ThemeToggle />
        <Avatar sx={{ ml: 2 }} />
      </Toolbar>
    </AppBar>
  );
}
