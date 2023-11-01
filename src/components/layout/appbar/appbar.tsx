// MUI Imports
import { AppBar, Box, Toolbar, Avatar } from "@mui/material";

// Components Imports
import { MenuDrawer } from "@/components/layout/menu-drawer";

// Theme Imports
import { ThemeToggle } from "@/theme";

export function Appbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "transparent" }}>
      <Toolbar>
        <MenuDrawer sx={{ mr: "auto" }} />
        <ThemeToggle />
        <Avatar />
      </Toolbar>
    </AppBar>
  );
}
