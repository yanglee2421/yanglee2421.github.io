import { ModeToggle } from "@/components/shared/ModeToggle";
import { useColorScheme } from "@/hooks/dom/useColorScheme";
import { useLocalStore } from "@/hooks/store/useLocalStore";
import { KeyboardArrowLeft, Menu, MenuOpen } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  CssBaseline,
  GlobalStyles,
  IconButton,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { LayoutTheme } from "./theme";

export const CustomLayout = () => {
  const [showSidebar, setShowSidebar] = React.useState(false);

  const mode = useLocalStore((s) => s.mode);
  const nativeDark = useColorScheme();
  const theme = useTheme();

  const isDark = LayoutTheme.resolveIsDark(mode, nativeDark);

  return (
    <LayoutTheme>
      <GlobalStyles
        styles={{ html: { colorScheme: isDark ? "dark" : "light" } }}
      />
      <CssBaseline />
      <Box data-show-sidebar={showSidebar} sx={{ ["--sidebar-width"]: 32 }}>
        <Sidebar>
          <IconButton
            onClick={() => {
              setShowSidebar((p) => !p);
            }}
            sx={{ display: { sm: "none" } }}
          >
            <KeyboardArrowLeft />
          </IconButton>
        </Sidebar>
        <Box
          sx={{
            isolation: "isolate",

            ["[data-show-sidebar=true] &"]: {
              transition: theme.transitions.create("padding-inline-start", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              paddingInlineStart: { sm: "calc(var(--sidebar-width) * 8px)" },
            },
            ["[data-show-sidebar=false] &"]: {
              transition: theme.transitions.create("padding-inline-start", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              paddingInlineStart: { sm: 0 },
              display: { xs: "none", sm: "block" },
            },
          }}
        >
          <Header>
            <IconButton
              onClick={() => {
                setShowSidebar((p) => !p);
              }}
            >
              {showSidebar ? <MenuOpen /> : <Menu />}
            </IconButton>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                MUI
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
              >
                Core
              </Link>
              <Typography sx={{ color: "text.primary" }}>
                Breadcrumbs
              </Typography>
            </Breadcrumbs>
            <Box sx={{ mx: "auto" }} />
            <ModeToggle />
          </Header>
          <Box sx={{ px: 2 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </LayoutTheme>
  );
};
