import React from "react";
import {
  createBrowserRouter,
  createHashRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  ScrollRestoration,
  useLocation,
  useParams,
  Link,
  useRouteError,
  isRouteErrorResponse,
} from "react-router";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import {
  AppsOutlined,
  CalculateOutlined,
  CalendarMonthOutlined,
  CalendarTodayOutlined,
  ChatOutlined,
  DashboardOutlined,
  HandshakeOutlined,
  HomeOutlined,
  MessageOutlined,
  PeopleOutlineOutlined,
  QrCodeOutlined,
  ScienceOutlined,
  SportsEsportsOutlined,
  TokenOutlined,
  ViewDayRounded,
  WalletOutlined,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useLocalStore } from "@/hooks/store/useLocalStore";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { getMatchedLang } from "@/lib/utils";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadBigCirclesPreset } from "@tsparticles/preset-big-circles";
import { loadBubblesPreset } from "@tsparticles/preset-bubbles";
import { fetchUserByFirebase, netlify } from "@/api/netlify";
import { useQuery } from "@tanstack/react-query";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { DashboardLayout, PageContainer } from "@toolpad/core";
import { GuestLayout } from "@/components/layout/guest";
import { BlankLayout } from "@/components/layout/blank";
import { NprogressBar } from "@/components/layout/nprogress";
import { NavigateToHome, NavigateToLogin } from "@/components/layout/navigate";
import { ModeToggle } from "@/components/shared/ModeToggle";

const snowPro = initParticlesEngine(async (engine) => {
  await loadBubblesPreset(engine);
  await loadBigCirclesPreset(engine);
  await loadSlim(engine);
});

type ParticlesUIProps = {
  preset: string;
};

const ParticlesUI = (props: ParticlesUIProps) => {
  React.use(snowPro);

  return (
    <Particles
      options={{
        preset: props.preset,
        background: { opacity: 0 },
      }}
    />
  );
};

const BRANDING = {
  title: "GitHub IO",
};

const path = (...args: unknown[]) => args.join("/");

const RootRoute = () => {
  const theme = useTheme();
  const params = useParams();
  const lang = params.lang;

  return (
    <ReactRouterAppProvider
      navigation={[
        {
          kind: "header",
          title: "Main items",
        },
        {
          segment: path(lang, "dashboard"),
          title: "Dashboard",
          icon: <DashboardOutlined />,
        },
        {
          segment: path(lang, "calendar"),
          title: "Calendar",
          icon: <CalendarTodayOutlined />,
        },
        {
          segment: path(lang, "calculator"),
          title: "Calculator",
          icon: <CalculateOutlined />,
        },
        {
          segment: path(lang, "invoices"),
          title: "Invoices",
          icon: <WalletOutlined />,
        },
        {
          segment: path(lang, "staff"),
          title: "Staff",
          icon: <PeopleOutlineOutlined />,
        },
        {
          segment: path(lang, "overtime"),
          title: "Overtime",
          icon: <CalendarMonthOutlined />,
        },
        {
          segment: path(lang, "minesweeper"),
          title: "Minesweeper",
          icon: <SportsEsportsOutlined />,
        },
        {
          segment: path(lang, "qrcode"),
          title: "QR Code",
          icon: <QrCodeOutlined />,
        },
        {
          segment: path(lang, "chat"),
          title: "Chat",
          icon: <ChatOutlined />,
        },
        {
          segment: path(lang, "lab"),
          title: "Lab",
          icon: <ScienceOutlined />,
        },
        {
          segment: path(lang, "scrollbar"),
          title: "Scrollbar",
          icon: <TokenOutlined />,
        },
        {
          segment: path(lang, "handbook"),
          title: "Handbook",
          icon: <HandshakeOutlined />,
        },
        {
          segment: path(lang, "app"),
          title: "App",
          icon: <AppsOutlined />,
        },
        {
          segment: path(lang, "virtual"),
          title: "Virtual",
          icon: <ViewDayRounded />,
        },
        {
          segment: path(lang, "snackbar"),
          title: "Snackbar",
          icon: <MessageOutlined />,
        },
      ]}
      branding={BRANDING}
      theme={theme}
    >
      <ParticlesUI preset="bubbles" />
      <NprogressBar />
      <Outlet />
      <ScrollRestoration />
    </ReactRouterAppProvider>
  );
};

const DashLayout = () => {
  return (
    <DashboardLayout
      slots={{
        toolbarActions: ModeToggle,
      }}
    >
      <PageContainer>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
};

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

const RootErrorBoundary = () => {
  const error = useRouteError();

  return <Box sx={{ padding: 6 }}>{renderError(error)}</Box>;
};

const LangGuard = () => {
  const params = useParams();
  const location = useLocation();
  const { i18n } = useTranslation();
  const setStoreLang = useLocalStore((s) => s.update);
  const storeLang = useLocalStore((s) => s.fallbackLang);
  const matchedLang = getMatchedLang(params.lang, storeLang);

  React.useEffect(() => {
    setStoreLang({ fallbackLang: matchedLang });
    i18n.changeLanguage(matchedLang);
  }, [setStoreLang, matchedLang, i18n]);

  if (matchedLang !== params.lang) {
    return (
      <Navigate
        to={{
          pathname: `/${matchedLang + location.pathname}`,
          search: location.search,
          hash: location.hash,
        }}
        state={location.state}
        replace
      />
    );
  }

  return <Outlet />;
};

const GuestGuard = () => (useCurrentUser() ? <NavigateToHome /> : <Outlet />);
const AuthGuard = () => {
  const user = useCurrentUser();
  const netlifyToken = useLocalStore((s) => s.netlifyToken);
  const setNetlifyToken = useLocalStore((s) => s.update);

  const auth = useQuery({
    ...fetchUserByFirebase({
      data: {
        firebaseId: user?.uid || "",
        name: user?.displayName || "",
      },
    }),
    enabled: !!user?.uid,
  });

  React.useInsertionEffect(() => {
    if (!auth.data?.data.token) return;
    setNetlifyToken({ netlifyToken: auth.data.data.token });
  }, [auth.data?.data.token]);

  React.useInsertionEffect(() => {
    if (!netlifyToken) return;

    const id = netlify.interceptors.request.use((config) => {
      config.headers.setAuthorization(`Bearer ${netlifyToken}`, false);
      return config;
    });

    return () => {
      netlify.interceptors.request.eject(id);
    };
  }, [netlifyToken]);

  return user ? <Outlet /> : <NavigateToLogin />;
};

const routes: RouteObject[] = [
  {
    id: "root",
    Component: RootRoute,
    ErrorBoundary: RootErrorBoundary,
    children: [
      {
        id: "lang",
        path: ":lang?",
        Component: LangGuard,
        children: [
          {
            id: "404",
            path: "*",
            lazy() {
              return import("@/pages/not-fount/component");
            },
          },
          {
            id: "guest_guard",
            Component: GuestGuard,
            children: [
              {
                id: "guest_layout",
                Component: GuestLayout,
                children: [
                  {
                    id: "login",
                    path: "login",
                    lazy: () => import("@/pages/login/component"),
                  },
                ],
              },
            ],
          },
          {
            id: "auth_guard",
            Component: AuthGuard,
            children: [
              {
                id: "auth_layout",
                Component: DashLayout,
                children: [
                  {
                    id: "snackbar",
                    path: "snackbar",
                    lazy: () => import("@/pages/snackbar/component"),
                  },
                ],
              },
            ],
          },
          {
            id: "dash_layout",
            Component: DashLayout,
            children: [
              {
                id: "home",
                index: true,
                lazy: () => import("@/pages/home/component"),
              },
              {
                id: "dashboard",
                path: "dashboard",
                lazy: () => import("@/pages/dashboard/component"),
              },
              {
                id: "overtime",
                path: "overtime",
                lazy: () => import("@/pages/overtime"),
              },
              {
                id: "minesweeper",
                path: "minesweeper",
                lazy: () => import("@/pages/minesweeper/component"),
              },
              {
                id: "lab",
                path: "lab",
                lazy: () => import("@/pages/lab/component"),
              },
              {
                id: "calendar",
                path: "calendar",
                lazy: () => import("@/pages/calendar/component"),
              },
              {
                id: "calculator",
                path: "calculator",
                lazy: () => import("@/pages/calculator/component"),
              },
              {
                id: "invoices",
                path: "invoices",
                lazy: () => import("@/pages/invoices/component"),
              },
              {
                id: "staff",
                path: "staff",
                lazy: () => import("@/pages/staff/component"),
              },
              {
                id: "chat",
                path: "chat",
                lazy: () => import("@/pages/chat/component"),
              },
              {
                id: "handbook",
                path: "handbook",
                lazy: () => import("@/pages/handbook/component"),
              },
              {
                id: "qrcode",
                path: "qrcode",
                lazy: () => import("@/pages/qrcode/component"),
              },
              {
                id: "scrollbar",
                path: "scrollbar",
                lazy: () => import("@/pages/scrollbar/component"),
              },
              {
                id: "virtual",
                path: "virtual",
                lazy: () => import("@/pages/virtual/component"),
              },
            ],
          },
          {
            id: "blank_layout",
            Component: BlankLayout,
            children: [
              {
                id: "app",
                path: "app",
                lazy: () => import("@/pages/app/component"),
              },
            ],
          },
        ],
      },
    ],
  },
];

const router = import.meta.env.PROD
  ? createHashRouter(routes)
  : createBrowserRouter(routes);

export const RouterUI = () => <RouterProvider router={router} />;
