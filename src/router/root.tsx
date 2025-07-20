import { auth } from "@/api/firebase/app";
import { NprogressBar } from "@/components/layout/nprogress";
import { ParticlesUI } from "@/components/layout/particles";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { signOut } from "firebase/auth";
import React from "react";
import { useParams, Outlet, ScrollRestoration } from "react-router";
import type { Navigation } from "@toolpad/core";
import {
  DashboardOutlined,
  CalendarTodayOutlined,
  CalendarMonthOutlined,
  SportsEsportsOutlined,
  QrCodeOutlined,
  TokenOutlined,
  HandshakeOutlined,
  MessageOutlined,
  ScienceOutlined,
  AppsOutlined,
  ChatOutlined,
  ViewDayRounded,
  AddOutlined,
  ListOutlined,
  InsertDriveFileOutlined,
} from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import { NotificationsProvider, DialogsProvider } from "@toolpad/core";

const BRANDING = {
  title: "GitHub IO",
};

const path = (...args: unknown[]) => args.join("/");

const langToNavition = (lang: string): Navigation => [
  {
    kind: "header",
    title: "Fontend",
  },
  {
    segment: path(lang, "dashboard"),
    title: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    segment: path(lang, "handbook"),
    title: "Handbook",
    icon: <HandshakeOutlined />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Table",
  },
  // {
  //   segment: path(lang, "invoices"),
  //   title: "Invoices",
  //   icon: <WalletOutlined />,
  //   children: [
  //     {
  //       title: "List",
  //       icon: <ListOutlined />,
  //     },
  //     {
  //       segment: "new",
  //       title: "Add",
  //       icon: <AddOutlined />,
  //     },
  //   ],
  // },
  // {
  //   segment: path(lang, "staff"),
  //   title: "Staff",
  //   icon: <GroupOutlined />,
  //   children: [
  //     {
  //       title: "List",
  //       icon: <ListOutlined />,
  //     },
  //     {
  //       segment: "new",
  //       title: "Add",
  //       icon: <AddOutlined />,
  //     },
  //   ],
  // },
  {
    segment: path(lang, "overtime"),
    title: "Overtime",
    icon: <CalendarMonthOutlined />,
    children: [
      {
        title: "List",
        icon: <ListOutlined />,
      },
      {
        segment: "new",
        title: "Add",
        icon: <AddOutlined />,
      },
    ],
  },
  {
    kind: "divider",
  },
  { kind: "header", title: "App" },
  {
    segment: path(lang, "calendar"),
    title: "Calendar",
    icon: <CalendarTodayOutlined />,
  },
  {
    segment: path(lang, "minesweeper"),
    title: "Minesweeper",
    icon: <SportsEsportsOutlined />,
  },
  {
    segment: path(lang, "file"),
    title: "File",
    icon: <InsertDriveFileOutlined />,
  },
  { segment: path(lang, "qrcode"), title: "QRCode", icon: <QrCodeOutlined /> },
  {
    segment: path(lang, "snackbar"),
    title: "Snackbar",
    icon: <MessageOutlined />,
  },
  { segment: path(lang, "lab"), title: "Lab", icon: <ScienceOutlined /> },
  { kind: "divider" },
  { kind: "header", title: "Custom layout" },
  { segment: path(lang, "app"), title: "App", icon: <AppsOutlined /> },
  { segment: path(lang, "chat"), title: "Chat", icon: <ChatOutlined /> },
  {
    segment: path(lang, "scrollbar"),
    title: "Scrollbar",
    icon: <TokenOutlined />,
  },
  {
    segment: path(lang, "virtual"),
    title: "Virtual",
    icon: <ViewDayRounded />,
  },
];

const useNavigtion = () => {
  const params = useParams();
  const lang = params.lang;
  return React.useMemo<Navigation>(() => langToNavition(String(lang)), [lang]);
};

export const RootRoute = () => {
  const theme = useTheme();
  const navigation = useNavigtion();
  const user = useCurrentUser();

  const session = user
    ? {
        user: {
          id: user.uid,
          image: user.photoURL,
          name: user.displayName,
          email: user.email,
        },
      }
    : null;

  return (
    <ReactRouterAppProvider
      navigation={navigation}
      branding={BRANDING}
      theme={theme}
      session={session}
      authentication={{
        signIn() {},
        async signOut() {
          await signOut(auth);
        },
      }}
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
          <Outlet />
        </DialogsProvider>
      </NotificationsProvider>
      <ParticlesUI preset="bubbles" />
      <Box sx={{ pointerEvents: "none" }}>
        <NprogressBar />
      </Box>
      <ScrollRestoration />
    </ReactRouterAppProvider>
  );
};
