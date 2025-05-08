import {
  createBrowserRouter,
  createHashRouter,
  Outlet,
  RouteObject,
  RouterProvider,
  ScrollRestoration,
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
import { HomeOutlined } from "@mui/icons-material";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { DashboardLayout, type Navigation, PageContainer } from "@toolpad/core";
import { GuestLayout } from "@/components/layout/guest";
import { BlankLayout } from "@/components/layout/blank";
import { NprogressBar } from "@/components/layout/nprogress";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { AuthGuard, GuestGuard, LangGuard } from "./guard";
import { ParticlesUI } from "@/components/layout/particles";
import React from "react";
import { AuthLayout } from "@/components/layout/auth";
import { NavMenu } from "./nav";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { signOut } from "firebase/auth";
import { auth } from "@/api/firebase/app";

const BRANDING = {
  title: "GitHub IO",
};

const path = (...args: unknown[]) => args.join("/");

const useNavigtion = () => {
  const params = useParams();
  const lang = params.lang;
  return React.useMemo<Navigation>(() => {
    const navigation: Navigation = NavMenu.list.map((i) => ({
      segment: path(lang, i.to.replace("/", "")),
      icon: i.icon,
      title: i.label,
    }));

    return [
      {
        kind: "header",
        title: "Main items",
      },
      ...navigation.slice(0, -3),
      {
        kind: "divider",
      },
      {
        kind: "header",
        title: "Custom layout",
      },
      ...navigation.slice(-3),
    ];
  }, [lang]);
};

const RootRoute = () => {
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
                id: "login",
                path: "login",
                lazy: () => import("@/pages/login/component"),
              },
              {
                id: "guest_layout",
                Component: GuestLayout,
                children: [],
              },
            ],
          },
          {
            id: "auth_guard",
            Component: AuthGuard,
            children: [
              {
                id: "auth_layout",
                Component: AuthLayout,
                children: [
                  {
                    id: "chat",
                    path: "chat",
                    lazy: () => import("@/pages/chat/component"),
                  },
                  {
                    id: "virtual",
                    path: "virtual",
                    lazy: () => import("@/pages/virtual/component"),
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
                    id: "snackbar",
                    path: "snackbar",
                    lazy: () => import("@/pages/snackbar/component"),
                  },
                ],
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
