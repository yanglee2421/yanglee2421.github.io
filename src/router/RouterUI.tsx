import NProgress from "nprogress";
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
  useNavigation,
  useParams,
} from "react-router";
import { useTranslation } from "react-i18next";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useLocaleStore } from "@/hooks/store/useLocaleStore";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { GuestLayout } from "@/components/layout/GuestLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { NavigateToHome } from "@/components/NavigateToHome";

// #region Routes

const routes: RouteObject[] = [{
  id: "root",
  path: ":lang?",
  Component: RootRoute,
  children: [
    {
      id: "404",
      path: "*",
      lazy() {
        return import("@/pages/not-fount/route");
      },
    },
    {
      id: "guest_layout",
      Component() {
        return useCurrentUser() ? <NavigateToHome /> : (
          <GuestLayout>
            <Outlet />
          </GuestLayout>
        );
      },
      children: [
        {
          id: "login",
          path: "login",
          lazy: () => import("@/pages/login/route"),
        },
      ],
    },
    {
      id: "auth_layout",
      Component() {
        const location = useLocation();
        return (
          <AuthLayout key={location.pathname}>
            <Outlet />
          </AuthLayout>
        );
      },
      children: [
        {
          id: "home",
          index: true,
          lazy: () => import("@/pages/home/route"),
        },
        {
          id: "dashboard",
          path: "dashboard",
          lazy: () => import("@/pages/dashboard/route"),
        },
        {
          id: "overtime",
          path: "overtime",
          lazy: () => import("@/pages/overtime/route"),
        },
        {
          id: "minesweeper",
          path: "minesweeper",
          lazy: () => import("@/pages/minesweeper/route"),
        },
      ],
    },
    {
      id: "blank_layout",
      Component() {
        return (
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        );
      },
      children: [{
        id: "lab",
        path: "lab",
        lazy: () => import("@/pages/lab/route"),
      }, {
        id: "calendar",
        path: "calendar",
        lazy: () => import("@/pages/calendar/Component"),
      }],
    },
  ],
}];

// #endregion

// #region Router UI

const router = import.meta.env.PROD
  ? createHashRouter(routes)
  : createBrowserRouter(routes);

export const RouterUI = () => <RouterProvider router={router} />;

// #endregion

// #region Root Route

const LANGS = new Set(["en", "zh"]);
const FALLBACK_LANG = "en";
const getMatchedLang = (path = "", state: string) => {
  if (LANGS.has(path)) {
    return path;
  }

  if (LANGS.has(state)) {
    return state;
  }

  return FALLBACK_LANG;
};

function RootRoute() {
  const navigation = useNavigation();
  const hasHydrated = React.useSyncExternalStore(
    (onStoreChange) => useLocaleStore.persist.onFinishHydration(onStoreChange),
    () => useLocaleStore.persist.hasHydrated(),
    () => false,
  );

  React.useEffect(() => {
    switch (navigation.state) {
      case "submitting":
      case "loading":
        NProgress.start();
        break;
      case "idle":
      default:
        NProgress.done();
    }
  }, [navigation.state]);

  if (!hasHydrated) {
    return;
  }

  return (
    <React.Suspense
      fallback={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 6,

            position: "fixed",
            inset: 0,
            zIndex(theme) {
              return theme.zIndex.modal;
            },
          }}
        >
          <CircularProgress />
          <Typography>Loading...</Typography>
        </Box>
      }
    >
      <ThemeProvider>
        <RootOutlet />
      </ThemeProvider>
      <ScrollRestoration />
    </React.Suspense>
  );
}

function RootOutlet() {
  const params = useParams();
  const location = useLocation();
  const { i18n } = useTranslation();
  const setStoreLang = useLocaleStore((s) => s.update);
  const storeLang = useLocaleStore((s) => s.fallbackLang);
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
}

// #endregion