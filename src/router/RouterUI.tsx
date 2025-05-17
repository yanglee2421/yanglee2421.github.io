import {
  createBrowserRouter,
  createHashRouter,
  Outlet,
  RouteObject,
  RouterProvider,
  Link,
  useRouteError,
  isRouteErrorResponse,
  useParams,
} from "react-router";
import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";
import { HomeOutlined } from "@mui/icons-material";
import { DashboardLayout, PageContainer, useActivePage } from "@toolpad/core";
import { GuestLayout } from "@/components/layout/guest";
import { BlankLayout } from "@/components/layout/blank";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { AuthGuard, GuestGuard, LangGuard } from "./guard";
import { AuthLayout } from "@/components/layout/auth";
import { RootRoute } from "./root";

const DashLayout = () => {
  const activePage = useActivePage();
  const params = useParams();

  const segments =
    activePage?.path.split("/").filter((path) => {
      if (!path) return false;
      if (path === params.lang) return false;
      return true;
    }) || [];

  const renderTitle = () => {
    const segment = segments[segments.length - 1];
    if (!segment) return;

    const title = decodeURIComponent(segment);

    return [title.slice(0, 1).toLocaleUpperCase(), title.slice(1)].join("");
  };

  const renderBreadcrumbs = () => {
    if (!activePage) return;

    return segments.map((segment, idx, segments) => {
      const title = decodeURIComponent(
        [segment.slice(0, 1).toLocaleUpperCase(), segment.slice(1)].join(""),
      );

      return {
        title,
        path: Object.is(segments.length - 1, idx)
          ? void 0
          : ["", params.lang, ...segments.slice(0, idx + 1)].join("/"),
      };
    });
  };

  return (
    <DashboardLayout
      slots={{
        toolbarActions: ModeToggle,
      }}
    >
      <PageContainer title={renderTitle()} breadcrumbs={renderBreadcrumbs()}>
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
                    id: "invoices",
                    path: "invoices",
                    children: [
                      {
                        id: "invoices/list",
                        index: true,
                        lazy: () => import("@/pages/invoices/component"),
                      },
                      {
                        id: "invoices/new",
                        path: "new",
                        lazy: () => import("@/pages/invoices_new/component"),
                      },
                    ],
                  },
                  {
                    id: "staff",
                    path: "staff",
                    children: [
                      {
                        id: "staff/list",
                        index: true,
                        lazy: () => import("@/pages/staff/component"),
                      },
                      {
                        id: "staff/new",
                        path: "new",
                        lazy: () => import("@/pages/staff_new/component"),
                      },
                    ],
                  },
                  {
                    id: "overtime",
                    path: "overtime",
                    children: [
                      {
                        id: "overtime/list",
                        index: true,
                        lazy: () => import("@/pages/overtime"),
                      },
                      {
                        id: "overtime/new",
                        path: "new",
                        lazy: () => import("@/pages/overtime_new/component"),
                      },
                    ],
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
