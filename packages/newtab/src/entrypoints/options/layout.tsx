import wxtLogo from "@/assets/wxt.svg";
import {
  FormatQuote,
  Image,
  KeyboardArrowLeft,
  KeyboardCommandKey,
  MenuOpen,
  MoreVert,
  QrCode,
  QrCodeScanner,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import type { Branding, Navigation } from "@toolpad/core";
import { DialogsProvider, NotificationsProvider } from "@toolpad/core";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import React from "react";
import { Outlet, ScrollRestoration, useParams } from "react-router";

const calculateAssetsHref = (path: string) => {
  return new URL(path, import.meta.url).href;
};

const calculateSegment = (...args: unknown[]) => {
  return args.join("/");
};

const createNavition = (lang: string): Navigation => [
  {
    kind: "header",
    title: "设置",
  },
  {
    segment: calculateSegment(lang),
    title: "背景设置",
    icon: <Image />,
  },
  {
    segment: calculateSegment(lang, "quotes"),
    title: "每日一言",
    icon: <FormatQuote />,
  },
];

const createBranding = (): Branding => {
  const logoHref = calculateAssetsHref(wxtLogo);

  return {
    title: "标签页设置",
    logo: <img src={logoHref} alt="logo" width={24} height={24} />,
  };
};

const BRANDING: Branding = createBranding();

const useNavigation = () => {
  const params = useParams();
  const lang = params.lang;
  return React.useMemo<Navigation>(() => createNavition(String(lang)), [lang]);
};

export const MuiLayout = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <ReactRouterAppProvider
      navigation={navigation}
      branding={BRANDING}
      theme={theme}
    >
      <NotificationsProvider
        slotProps={{
          snackbar: {
            anchorOrigin: { horizontal: "center", vertical: "top" },
            autoHideDuration: 1000 * 3,
          },
        }}
      >
        <DialogsProvider>
          <Layout>
            <Outlet />
          </Layout>
        </DialogsProvider>
      </NotificationsProvider>
      <ScrollRestoration />
    </ReactRouterAppProvider>
  );
};

const Layout = (props: React.PropsWithChildren) => {
  const [showSidebarDownSmall, setShowSidebarDownSmall] = React.useState(false);
  const [showSidebarUpSmall, setShowSidebarUpSmall] = React.useState(true);

  const theme = useTheme();

  return (
    <Box
      aria-hidden={showSidebarUpSmall}
      sx={{ display: "flex", "--sidebar-width": theme.spacing(36) }}
    >
      <Box
        sx={{
          overflow: "hidden",
          isolation: "isolate",

          "[aria-hidden=true] &": {
            inlineSize: "var(--sidebar-width)",
            transition: theme.transitions.create("inline-size", {
              duration: theme.transitions.duration.enteringScreen,
              easing: theme.transitions.easing.sharp,
            }),
          },

          "[aria-hidden=false] &": {
            inlineSize: 0,
            transition: theme.transitions.create("inline-size", {
              duration: theme.transitions.duration.leavingScreen,
              easing: theme.transitions.easing.sharp,
            }),
          },
        }}
      >
        <Paper
          sx={{
            position: "fixed",
            insetInlineStart: 0,
            insetBlockStart: 0,
            zIndex: -1,

            inlineSize: "var(--sidebar-width)",
            blockSize: "100dvh",

            borderInlineEndWidth: 1,
            borderInlineEndStyle: "solid",
            borderInlineEndColor: theme.palette.divider,

            display: "flex",
            flexDirection: "column",
          }}
        >
          <Toolbar sx={{ gap: 1 }}>
            <KeyboardCommandKey />
            <Typography variant="h6">4399</Typography>
            <Box sx={{ mx: "auto" }}></Box>
            <IconButton>
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
                <ListSubheader sx={{ backgroundColor: "transparent" }}>
                  Normal
                </ListSubheader>
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <QrCode />
                </ListItemIcon>
                <ListItemText primary={"二维码"} />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <QrCodeScanner />
                </ListItemIcon>
                <ListItemText primary={"二维码"} />
              </ListItemButton>
            </List>
            <List
              subheader={
                <ListSubheader sx={{ backgroundColor: "transparent" }}>
                  Else
                </ListSubheader>
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <QrCodeScanner />
                </ListItemIcon>
                <ListItemText primary={"二维码"} />
              </ListItemButton>
            </List>
          </Box>
          <Divider />
          <Toolbar sx={{ gap: 1 }}>
            <Avatar></Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">4399</Typography>
              <Typography variant="body2" color="textSecondary">
                3182703224@qq.com
              </Typography>
            </Box>
            <IconButton>
              <MoreVert />
            </IconButton>
          </Toolbar>
        </Paper>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          flexShrink: 1,
          minInlineSize: 0,
          position: "relative",
        }}
      >
        <Toolbar>
          <IconButton
            onClick={() => {
              setShowSidebarUpSmall((p) => !p);
            }}
          >
            <MenuOpen />
          </IconButton>
          <Box sx={{ mx: "auto" }}></Box>
          <ModeToggle />
        </Toolbar>
        <Box sx={{ px: 4 }}>
          {props.children}
          <Box sx={{ height: 1000 }}></Box>
        </Box>
      </Box>
    </Box>
  );
};
