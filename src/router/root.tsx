import {
  useParams,
  Outlet,
  ScrollRestoration,
  Link,
  useRouteError,
  isRouteErrorResponse,
} from "react-router";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import {
  DashboardOutlined,
  CalendarMonthOutlined,
  TokenOutlined,
  MessageOutlined,
  ScienceOutlined,
  ViewDayRounded,
  AddOutlined,
  ListOutlined,
  AlignHorizontalLeftOutlined,
  HomeOutlined,
} from "@mui/icons-material";
import React from "react";
import { signOut } from "firebase/auth";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { NotificationsProvider, DialogsProvider } from "@toolpad/core";
import { auth } from "@/api/firebase/app";
import { ParticlesUI } from "@/components/layout/particles";
import { NprogressBar } from "@/components/layout/nprogress";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import type { Navigation } from "@toolpad/core";

const renderError = (error: unknown) => {
  if (isRouteErrorResponse(error)) {
    return (
      <Alert severity="error" variant="outlined">
        <AlertTitle>{error.status}</AlertTitle>
        <Typography>{error.statusText}</Typography>
        <Link to="/">
          <Button startIcon={<HomeOutlined />}>Take me to home</Button>
        </Link>
      </Alert>
    );
  }

  if (error instanceof Error) {
    return (
      <Alert severity="error" variant="outlined">
        <AlertTitle>Error</AlertTitle>
        <Typography>{error.message}</Typography>
        <Typography variant="body2">{error.stack}</Typography>
        <Link to="/">
          <Button startIcon={<HomeOutlined />} color="error">
            Take me to home
          </Button>
        </Link>
      </Alert>
    );
  }

  return (
    <Alert severity="error" variant="outlined">
      <AlertTitle>Error</AlertTitle>
      <Typography>Unknown error please contact support</Typography>
      <Link to="/">
        <Button startIcon={<HomeOutlined />} color="error">
          Take me to home
        </Button>
      </Link>
    </Alert>
  );
};

export const RootErrorBoundary = () => {
  const error = useRouteError();

  return <Box sx={{ padding: 6 }}>{renderError(error)}</Box>;
};

export const RootHydrateFallback = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={64} />
    </Box>
  );
};

const BRANDING = {
  title: "GitHub IO",
};

const path = (...args: unknown[]) => {
  const [lang, ...restPath] = args;

  if (!lang) {
    return restPath.join("/");
  }

  return args.join("/");
};

const createNavition = (lang?: string): Navigation => [
  { kind: "header", title: "Fontend" },
  {
    segment: path(lang, "dashboard"),
    title: "Dashboard",
    icon: <DashboardOutlined />,
  },
  { kind: "divider" },
  { kind: "header", title: "Table" },
  {
    title: "Overtime",
    icon: <CalendarMonthOutlined />,
    children: [
      {
        segment: path(lang, "overtime"),
        title: "List",
        icon: <ListOutlined />,
      },
      {
        segment: path(lang, "overtime", "new"),
        title: "Add",
        icon: <AddOutlined />,
      },
    ],
  },
  { kind: "divider" },
  { kind: "header", title: "App" },
  {
    segment: path(lang, "snackbar"),
    title: "Snackbar",
    icon: <MessageOutlined />,
  },
  {
    segment: path(lang, "lab"),
    title: "Lab",
    icon: <ScienceOutlined />,
  },
  {
    segment: path(lang, "rank"),
    title: "Rank",
    icon: <AlignHorizontalLeftOutlined />,
  },
  { kind: "divider" },
  { kind: "header", title: "Custom layout" },
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

const useNavigation = () => {
  const params = useParams();
  const lang = params.lang;
  return React.useMemo<Navigation>(() => createNavition(lang), [lang]);
};

export const RootRoute = () => {
  const theme = useTheme();
  const navigation = useNavigation();
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
        signIn: () => {},
        signOut: async () => {
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
