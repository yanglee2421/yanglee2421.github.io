import { MenuRounded } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  createTheme,
  CssBaseline,
  Drawer,
  IconButton,
  ThemeProvider,
  Toolbar,
  useTheme,
} from "@mui/material";
import React from "react";

export const Component = () => {
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();

  const EXPANDED_WIDTH = theme.spacing(32);

  return (
    <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
      <CssBaseline />
      <AppBar
        sx={{
          zIndex: (t) => t.zIndex.appBar,
          position: "absolute",
        }}
      >
        <Toolbar>
          <IconButton
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            <MenuRounded />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          isolation: "isolate",
        }}
      >
        <Drawer
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          variant="permanent"
          anchor="left"
          sx={{
            flexShrink: 0,
            overflowX: "hidden",
            width: open ? EXPANDED_WIDTH : 0,
            transition: (t) =>
              t.transitions.create("width", {
                easing: t.transitions.easing.sharp,
                duration: open
                  ? t.transitions.duration.enteringScreen
                  : t.transitions.duration.leavingScreen,
              }),
            [`& .MuiDrawer-paper`]: {
              width: open ? EXPANDED_WIDTH : 0,
              overflowX: "hidden",
              transition: (t) =>
                t.transitions.create("width", {
                  easing: t.transitions.easing.sharp,
                  duration: open
                    ? t.transitions.duration.enteringScreen
                    : t.transitions.duration.leavingScreen,
                }),
              position: "absolute",
            },
          }}
        >
          <Toolbar></Toolbar>
          <span>1685416</span>
          <Button
            onClick={() => {
              setOpen((p) => !p);
            }}
          >
            toggle
          </Button>
        </Drawer>
        <Box>
          <Toolbar></Toolbar>
          <Button
            onClick={() => {
              setOpen((p) => !p);
            }}
          >
            toggle
          </Button>
          <h1>68431313</h1>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
