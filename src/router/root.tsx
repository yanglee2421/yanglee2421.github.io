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
  DragIndicator,
  Animation,
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
import { useTranslation } from "react-i18next";
import { useLocalStore } from "@/hooks/store/useLocalStore";

const calculatePath = (...args: unknown[]) => {
  const [lang, ...restPath] = args;

  if (!lang) {
    return restPath.join("/");
  }

  return args.join("/");
};

const createNavition = (lang?: string): Navigation => [
  { kind: "header", title: "Fontend" },
  {
    segment: calculatePath(lang, "dashboard"),
    title: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    segment: calculatePath(lang, "dnd"),
    title: "Drag & Drop",
    icon: <DragIndicator />,
  },
  { kind: "divider" },
  { kind: "header", title: "Table" },
  {
    title: "Overtime",
    icon: <CalendarMonthOutlined />,
    children: [
      {
        segment: calculatePath(lang, "overtime"),
        title: "List",
        icon: <ListOutlined />,
      },
      {
        segment: calculatePath(lang, "overtime", "new"),
        title: "Add",
        icon: <AddOutlined />,
      },
    ],
  },
  { kind: "divider" },
  { kind: "header", title: "App" },
  {
    segment: calculatePath(lang, "snackbar"),
    title: "Snackbar",
    icon: <MessageOutlined />,
  },
  {
    segment: calculatePath(lang, "lab"),
    title: "Lab",
    icon: <ScienceOutlined />,
  },
  {
    segment: calculatePath(lang, "Animate"),
    title: "Animate",
    icon: <Animation />,
  },
  {
    segment: calculatePath(lang, "rank"),
    title: "Rank",
    icon: <AlignHorizontalLeftOutlined />,
  },
  { kind: "divider" },
  { kind: "header", title: "Custom layout" },
  {
    segment: calculatePath(lang, "scrollbar"),
    title: "Scrollbar",
    icon: <TokenOutlined />,
  },
  {
    segment: calculatePath(lang, "virtual"),
    title: "Virtual",
    icon: <ViewDayRounded />,
  },
];

const BRANDING = {
  title: "GitHub IO",
};

const useNavigation = () => {
  const params = useParams();
  const lang = params.lang;

  return React.useMemo<Navigation>(() => createNavition(lang), [lang]);
};

type ErrorContentProps = {
  error: unknown;
  children?: React.ReactNode;
};

const ErrorContent = ({ error, children }: ErrorContentProps) => {
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <AlertTitle>{error.status}</AlertTitle>
        <Typography>{error.statusText}</Typography>
        {children}
      </>
    );
  }

  if (error instanceof Error) {
    return (
      <>
        <AlertTitle>Error</AlertTitle>
        <Typography>{error.message}</Typography>
        <Typography variant="body2">{error.stack}</Typography>
        {children}
      </>
    );
  }

  return (
    <>
      <AlertTitle>Error</AlertTitle>
      <Typography>Unknown error please contact support</Typography>
      {children}
    </>
  );
};

export const RootErrorBoundary = () => {
  const error = useRouteError();

  return (
    <Box sx={{ padding: 6 }}>
      <Alert severity="error" variant="outlined">
        <ErrorContent error={error}>
          <Link to="/">
            <Button startIcon={<HomeOutlined />} color="error">
              Take me to home
            </Button>
          </Link>
        </ErrorContent>
      </Alert>
    </Box>
  );
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

export const RootRoute = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const user = useCurrentUser();
  const params = useParams();
  const { i18n } = useTranslation();
  const fallbackLang = useLocalStore((store) => store.fallbackLang);

  const changeLanguage = React.useEffectEvent((paramLang?: string) => {
    i18n.changeLanguage(paramLang || fallbackLang);

    if (!paramLang) return;

    useLocalStore.setState((draft) => {
      draft.fallbackLang = paramLang;
    });
  });

  React.useEffect(() => {
    changeLanguage(params.lang);
  }, [params.lang]);

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
