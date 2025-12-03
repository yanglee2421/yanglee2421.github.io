import {
  createBrowserRouter,
  createHashRouter,
  Outlet,
  RouterProvider,
  Link,
  useRouteError,
  isRouteErrorResponse,
  useParams,
} from "react-router";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { HomeOutlined } from "@mui/icons-material";
import { DashboardLayout, PageContainer, useActivePage } from "@toolpad/core";
import { AuthLayout } from "@/components/layout/auth";
import { GuestLayout } from "@/components/layout/guest";
import { useLocalStore } from "@/hooks/store/useLocalStore";
import { LangToggle } from "@/components/shared/LangToggle";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { UserDropdown } from "@/components/shared/UserDropdonw";
import { RootRoute } from "./root";
import { AuthGuard, GuestGuard, LangGuard } from "./guard";
import type { RouteObject } from "react-router";

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
        toolbarActions: ToolbarActions,
        toolbarAccount: UserDropdown,
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

const RootHydrateFallback = () => {
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

type UseStore = typeof useLocalStore;

const finishHydrate = (useStore: UseStore) =>
  new Promise<void>((resolve) => {
    const hasHydrated = useStore.persist.hasHydrated();
    if (!hasHydrated) {
      useStore.persist.onFinishHydration(() => resolve());
      return;
    }

    resolve();
  });

const routes: RouteObject[] = [
  {
    Component: RootRoute,
    ErrorBoundary: RootErrorBoundary,
    HydrateFallback: RootHydrateFallback,
    loader: async () => {
      await finishHydrate(useLocalStore);
    },
    children: [
      {
        path: ":lang?",
        Component: LangGuard,
        children: [
          {
            path: "*",
            lazy() {
              return import("@/pages/not-fount/component");
            },
          },
          {
            Component: GuestGuard,
            children: [
              {
                path: "login",
                lazy: () => import("@/pages/login/component"),
              },
              {
                Component: GuestLayout,
                children: [],
              },
            ],
          },
          {
            Component: DashLayout,
            children: [
              {
                index: true,
                lazy: () => import("@/pages/lab/component"),
              },
              {
                path: "snackbar",
                lazy: () => import("@/pages/snackbar/component"),
              },
            ],
          },
          {
            Component: AuthGuard,
            children: [
              {
                Component: DashLayout,
                children: [
                  {
                    path: "dashboard",
                    lazy: () => import("@/pages/dashboard/component"),
                  },
                  {
                    path: "invoices",
                    children: [
                      {
                        index: true,
                        lazy: () => import("@/pages/invoices/component"),
                      },
                      {
                        path: "new",
                        lazy: () => import("@/pages/invoices_new/component"),
                      },
                    ],
                  },
                  {
                    path: "staff",
                    children: [
                      {
                        index: true,
                        lazy: () => import("@/pages/staff/component"),
                      },
                      {
                        path: "new",
                        lazy: () => import("@/pages/staff_new/component"),
                      },
                    ],
                  },
                  {
                    path: "overtime",
                    children: [
                      {
                        index: true,
                        lazy: () => import("@/pages/overtime"),
                      },
                      {
                        path: "new",
                        lazy: () => import("@/pages/overtime_new/component"),
                      },
                    ],
                  },
                  {
                    path: "rank",
                    lazy: () => import("@/pages/rank/component"),
                  },
                ],
              },
            ],
          },
          {
            Component: AuthLayout,
            children: [
              {
                path: "scrollbar",
                lazy: () => import("@/pages/scrollbar/component"),
              },
              {
                path: "virtual",
                lazy: () => import("@/pages/virtual/component"),
              },
            ],
          },
          {
            path: "dnd",
            Component: AuthLayout,
            children: [
              {
                path: "core",
                children: [
                  {
                    path: "Draggable",
                    caseSensitive: true,
                    children: [
                      {
                        path: "hooks",
                        children: [
                          {
                            path: "useDraggable",
                            caseSensitive: true,
                            children: [
                              {
                                path: "basic-setup",
                                lazy: () =>
                                  import(
                                    "@/pages/dnd/core/draggable/hooks/usedraggable/basic-setup/component"
                                  ),
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
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

export const Router = () => <RouterProvider router={router} />;

const ToolbarActions = () => {
  return (
    <>
      <LangToggle />
      <ModeToggle />
    </>
  );
};
