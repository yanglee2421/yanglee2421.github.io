// MUI Imports
import { AppBar, Toolbar, IconButton } from "@mui/material";
import { GitHub } from "@mui/icons-material";

// Components Imports
import { MenuDrawer } from "@/components/layout/menu-drawer";
import { Trans } from "@/components/layout/trans";
import { UserDropdown } from "@/components/layout/user-dropdown";
import { Searcher } from "@/components/layout/searcher";
import { SkinSettings } from "@/components/layout/skin-settings";

// Theme Imports
import { ThemeToggle } from "@/theme";

export function Appbar() {
  return (
    <AppBar
      position="static"
      sx={{
        boxShadow(theme) {
          return theme.shadows[1];
        },
      }}
    >
      <Toolbar>
        <MenuDrawer color="inherit" />
        <Searcher color="inherit" sx={{ mr: "auto" }} />
        <SkinSettings color="inherit" />
        <Trans color="inherit" />
        <ThemeToggle color="inherit" />
        <IconButton
          href="https://github.com/yanglee2421/react-mui"
          target="_blank"
          color="inherit"
        >
          <GitHub />
        </IconButton>
        <UserDropdown />
      </Toolbar>
    </AppBar>
  );
}
