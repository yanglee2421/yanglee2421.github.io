import {
  FormatQuote,
  Image,
  KeyboardArrowLeft,
  KeyboardCommandKey,
  Menu,
  MenuOpen,
  MoreVert,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  styled,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DialogsProvider } from "@toolpad/core";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import React from "react";
import {
  Link,
  Outlet,
  ScrollRestoration,
  useLocation,
  useParams,
} from "react-router";

const StyledLink = styled(Link)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",

    gap: theme.spacing(1),

    color: theme.palette.primary.main,
  };
});

export const MuiLayout = () => {
  const theme = useTheme();

  return (
    <ReactRouterAppProvider theme={theme}>
      <DialogsProvider>
        <Layout>
          <Outlet />
        </Layout>
      </DialogsProvider>
      <ScrollRestoration />
    </ReactRouterAppProvider>
  );
};

const Layout = (props: React.PropsWithChildren) => {
  const [showSidebarDownSmall, setShowSidebarDownSmall] = React.useState(false);
  const [showSidebarUpSmall, setShowSidebarUpSmall] = React.useState(true);

  const theme = useTheme();
  const isDownSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const showSidebar = isDownSmall ? showSidebarDownSmall : showSidebarUpSmall;

  const params = useParams();
  const location = useLocation();

  return (
    <Box sx={{ "--sidebar-width": theme.spacing(32) }}>
      <Paper
        aria-hidden={showSidebar}
        sx={{
          position: "fixed",
          insetBlockStart: 0,
          zIndex: theme.zIndex.drawer,

          blockSize: "100dvh",

          borderInlineEndWidth: 1,
          borderInlineEndStyle: "solid",
          borderInlineEndColor: theme.palette.divider,
          borderRadius: 0,

          display: "flex",
          flexDirection: "column",

          [theme.breakpoints.between("xs", "sm")]: {
            inlineSize: "100%",

            [`&:where([aria-hidden=true])`]: {
              insetInlineStart: 0,
              transition: theme.transitions.create("inset-inline-start", {
                duration: theme.transitions.duration.enteringScreen,
                easing: theme.transitions.easing.sharp,
              }),
            },
            [`&:where([aria-hidden=false])`]: {
              insetInlineStart: `-100%`,
              transition: theme.transitions.create("inset-inline-start", {
                duration: theme.transitions.duration.leavingScreen,
                easing: theme.transitions.easing.sharp,
              }),
            },
          },

          [theme.breakpoints.up("sm")]: {
            inlineSize: "var(--sidebar-width)",

            [`&:where([aria-hidden=true])`]: {
              insetInlineStart: 0,
              transition: theme.transitions.create("inset-inline-start", {
                duration: theme.transitions.duration.enteringScreen,
                easing: theme.transitions.easing.sharp,
              }),
            },
            [`&:where([aria-hidden=false])`]: {
              insetInlineStart: `calc(-1 * var(--sidebar-width))`,
              transition: theme.transitions.create("inset-inline-start", {
                duration: theme.transitions.duration.leavingScreen,
                easing: theme.transitions.easing.sharp,
              }),
            },
          },
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <StyledLink to={{ pathname: "/" }}>
            <KeyboardCommandKey />
            <Typography variant="h6">Newtab</Typography>
          </StyledLink>
          <Box sx={{ mx: "auto" }}></Box>
          <IconButton
            onClick={() => {
              setShowSidebarDownSmall((p) => !p);
            }}
            sx={{
              display: { sm: "none" },
            }}
          >
            <KeyboardArrowLeft />
          </IconButton>
        </Toolbar>
        <Divider />
        <Box
          sx={{
            flexGrow: 1,
            flexShrink: 1,
            minBlockSize: 0,
            overflow: "auto",
          }}
        >
          <List
            subheader={
              <ListSubheader
                disableSticky
                sx={{ backgroundColor: "transparent" }}
              >
                Normal
              </ListSubheader>
            }
          >
            <ListItemButton
              component={Link}
              to={{ pathname: `/${params.lang}` }}
              selected={Object.is(location.pathname, `/${params.lang}`)}
            >
              <ListItemIcon>
                <Image />
              </ListItemIcon>
              <ListItemText primary={"背景设置"} />
            </ListItemButton>
          </List>
          <List
            subheader={
              <ListSubheader
                disableSticky
                sx={{ backgroundColor: "transparent" }}
              >
                Else
              </ListSubheader>
            }
          >
            <ListItemButton
              component={Link}
              to={{ pathname: `/${params.lang}/quotes` }}
              selected={Object.is(location.pathname, `/${params.lang}/quotes`)}
            >
              <ListItemIcon>
                <FormatQuote />
              </ListItemIcon>
              <ListItemText primary={"每日一言"} />
            </ListItemButton>
          </List>
          <Box sx={{ height: 1000 }}></Box>
        </Box>
        <Divider />
        <Toolbar sx={{ gap: 1 }}>
          <Avatar></Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Newtab</Typography>
            <Typography variant="body2" color="textSecondary">
              3182703224@qq.com
            </Typography>
          </Box>
          <IconButton>
            <MoreVert />
          </IconButton>
        </Toolbar>
      </Paper>
      <Box
        sx={{
          [theme.breakpoints.between("xs", "sm")]: {
            [`[aria-hidden=true] + &`]: {
              display: "none",
            },
            [`[aria-hidden=false] + &`]: {
              display: "block",
            },
          },

          [theme.breakpoints.up("sm")]: {
            display: "block",

            [`[aria-hidden=false] + &`]: {
              paddingInlineStart: 0,
              transition: theme.transitions.create("padding-inline-start", {
                duration: theme.transitions.duration.enteringScreen,
                easing: theme.transitions.easing.sharp,
              }),
            },
            [`[aria-hidden=true] + &`]: {
              paddingInlineStart: `var(--sidebar-width)`,
              transition: theme.transitions.create("padding-inline-start", {
                duration: theme.transitions.duration.leavingScreen,
                easing: theme.transitions.easing.sharp,
              }),
            },
          },
        }}
      >
        <Toolbar
          sx={{
            position: "sticky",
            zIndex: theme.zIndex.appBar,
            insetBlockStart: 0,

            backgroundColor: theme.palette.background.default,
          }}
        >
          <IconButton
            onClick={() => {
              setShowSidebarUpSmall((p) => !p);
            }}
          >
            {showSidebarUpSmall ? <MenuOpen /> : <Menu />}
          </IconButton>
          <Box sx={{ mx: "auto" }}></Box>
          <ModeToggle />
        </Toolbar>
        <Box>
          <Container>
            {props.children}
            <Box sx={{ py: 1 }}>
              <Typography variant="overline" color="textSecondary">
                Copyright © 2026 Material UI SAS, trading as MUI.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};
