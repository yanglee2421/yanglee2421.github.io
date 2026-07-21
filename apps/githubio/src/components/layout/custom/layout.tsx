import { KeyboardArrowLeft, Menu, MenuOpen } from "@mui/icons-material";
import {
  Box,
  Container,
  IconButton,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { normalizePathname } from "@yotulee/run";
import React from "react";
import { useLocation } from "react-router";
import { Footer } from "./footer";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

interface CustomLayoutProps {
  children?: React.ReactNode;
}

export const CustomLayout = (props: CustomLayoutProps) => {
  const [showSidebarUpSmall, setShowSidebar] = React.useState(true);
  const [openDrawerInPath, setOpenDrawerInPath] = React.useState("");

  const theme = useTheme();
  const isDownSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const showSidebarDownSmall = Object.is(
    normalizePathname(location.pathname),
    openDrawerInPath,
  );
  const showAppSidebar = isDownSmall
    ? showSidebarDownSmall
    : showSidebarUpSmall;

  return (
    <Box sx={{ ["--sidebar-width"]: theme.spacing(36) }}>
      <Paper
        aria-hidden={!showAppSidebar}
        sx={{
          position: "fixed",
          insetBlockStart: 0,
          zIndex: theme.zIndex.drawer,

          blockSize: "100dvh",

          borderRadius: 0,

          display: "flex",
          flexDirection: "column",

          [theme.breakpoints.between("xs", "sm")]: {
            inlineSize: "100%",

            ["&:where([aria-hidden=true])"]: {
              insetInlineStart: "-100%",
              transition: theme.transitions.create("inset-inline-start", {
                duration: theme.transitions.duration.leavingScreen,
                easing: theme.transitions.easing.sharp,
              }),
            },
            ["&:where([aria-hidden=false])"]: {
              insetInlineStart: 0,
              transition: theme.transitions.create("inset-inline-start", {
                duration: theme.transitions.duration.enteringScreen,
                easing: theme.transitions.easing.sharp,
              }),
            },
          },
          [theme.breakpoints.up("sm")]: {
            inlineSize: "var(--sidebar-width)",

            ["&:where([aria-hidden=true])"]: {
              insetInlineStart: "calc(-1 * var(--sidebar-width))",
              transition: theme.transitions.create("inset-inline-start", {
                duration: theme.transitions.duration.leavingScreen,
                easing: theme.transitions.easing.sharp,
              }),
            },
            ["&:where([aria-hidden=false])"]: {
              insetInlineStart: 0,
              transition: theme.transitions.create("inset-inline-start", {
                duration: theme.transitions.duration.enteringScreen,
                easing: theme.transitions.easing.sharp,
              }),
            },
          },
        }}
      >
        <Sidebar>
          <IconButton
            onClick={() => {
              if (isDownSmall) {
                setOpenDrawerInPath(
                  showSidebarDownSmall ? "" : location.pathname,
                );
              } else {
                setShowSidebar((p) => !p);
              }
            }}
            sx={{ display: { sm: "none" } }}
          >
            <KeyboardArrowLeft />
          </IconButton>
        </Sidebar>
      </Paper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          minBlockSize: "100dvh",

          [theme.breakpoints.between("xs", "sm")]: {
            ["[aria-hidden=true] + &"]: {
              display: "flex",
            },
            ["[aria-hidden=false] + &"]: {
              display: "none",
            },
          },
          [theme.breakpoints.up("sm")]: {
            ["[aria-hidden=true] + &"]: {
              paddingInlineStart: 0,
              transition: theme.transitions.create("padding-inline-start", {
                duration: theme.transitions.duration.leavingScreen,
                easing: theme.transitions.easing.sharp,
              }),
            },
            ["[aria-hidden=false] + &"]: {
              paddingInlineStart: "var(--sidebar-width)",
              transition: theme.transitions.create("padding-inline-start", {
                duration: theme.transitions.duration.enteringScreen,
                easing: theme.transitions.easing.sharp,
              }),
            },
          },
        }}
      >
        <Header>
          <IconButton
            onClick={() => {
              if (isDownSmall) {
                setOpenDrawerInPath(
                  showSidebarDownSmall ? "" : location.pathname,
                );
              } else {
                setShowSidebar((p) => !p);
              }
            }}
          >
            {showSidebarUpSmall ? <MenuOpen /> : <Menu />}
          </IconButton>
        </Header>
        <Container
          sx={{
            flexGrow: 1,
            flexShrink: 0,
            flexBasis: 0,

            display: "flex",
            flexDirection: "column",
          }}
        >
          {props.children}
          <Footer />
        </Container>
      </Box>
    </Box>
  );
};
