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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { LayoutTheme } from "./theme";

export const CustomLayout = () => {
  const [showSidebarUpSmall, setShowSidebar] = React.useState(true);
  const [showSidebarDownSmall, setShowSidebarWhenMini] = React.useState(false);

  const mode = useLocalStore((s) => s.mode);
  const nativeDark = useColorScheme();
  const theme = useTheme();
  const isDownSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const isDark = LayoutTheme.resolveIsDark(mode, nativeDark);
  const showAppSidebar = isDownSmall
    ? showSidebarDownSmall
    : showSidebarUpSmall;

  return (
    <LayoutTheme>
      <GlobalStyles
        styles={{ html: { colorScheme: isDark ? "dark" : "light" } }}
      />
      <CssBaseline />
      <Box data-show-sidebar={showAppSidebar} sx={{ ["--sidebar-width"]: 32 }}>
        <Sidebar>
          <IconButton
            onClick={() => {
              if (isDownSmall) {
                setShowSidebarWhenMini((p) => !p);
              } else {
                setShowSidebar((p) => !p);
              }
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
              display: { xs: "none", sm: "block" },
            },
            ["[data-show-sidebar=false] &"]: {
              transition: theme.transitions.create("padding-inline-start", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              paddingInlineStart: { sm: 0 },
              display: { xs: "block", sm: "block" },
            },
          }}
        >
          <Header>
            <IconButton
              onClick={() => {
                if (isDownSmall) {
                  setShowSidebarWhenMini((p) => !p);
                } else {
                  setShowSidebar((p) => !p);
                }
              }}
            >
              {showSidebarUpSmall ? <MenuOpen /> : <Menu />}
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
