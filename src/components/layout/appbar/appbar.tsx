// MUI Imports
import { AppBar, Toolbar, IconButton } from "@mui/material";
import { GitHub } from "@mui/icons-material";

// Components Imports
import { MenuDrawer } from "@/components/layout/menu-drawer";
import { Trans } from "@/components/layout/trans";
import { UserDropdown } from "@/components/layout/user-dropdown";

// Theme Imports
import { ThemeToggle } from "@/theme";

export function Appbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "transparent" }}>
      <Toolbar>
        <MenuDrawer sx={{ mr: "auto" }} />
        <Trans />
        <ThemeToggle />
        <IconButton
          href="https://github.com/yanglee2421/react-mui"
          target="_blank"
        >
          <GitHub />
        </IconButton>
        <UserDropdown />
      </Toolbar>
    </AppBar>
  );
}
