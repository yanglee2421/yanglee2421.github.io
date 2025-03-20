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
import { Icon, Link, Typography } from "@mui/material";
import { useLocaleStore } from "@/hooks/store/useLocaleStore";
import { MuiProvider } from "@/components/mui";
import { Materio } from "@/components/svg/Materio";
import * as consts from "@/lib/constants";
import { NavigateToHome, NavigateToLogin } from "@/components/navigate";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { QueryProvider } from "@/components/query";
import { AuthLayout, GuestLayout } from "@/components/layout";

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

const LangWrapper = (props: React.PropsWithChildren) => {
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

  return props.children;
};

const NprogressBar = () => {
  const navigation = useNavigation();

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

  return null;
};

const RootRoute = () => {
  return (
    <QueryProvider>
      <MuiProvider>
        <ScrollRestoration />
        <NprogressBar />
        <LangWrapper>
          <Outlet />
        </LangWrapper>
      </MuiProvider>
    </QueryProvider>
  );
};

const FULL_YEAR = new Date().getFullYear();

const logo = (
  <>
    <Icon fontSize="large" color="primary">
      <Materio fontSize="inherit" />
    </Icon>
    <Typography
      component={"span"}
      variant="h6"
      sx={{
        fontSize: (t) => t.spacing(5),
        fontWeight: 600,
        textTransform: "uppercase",
        color: (t) => t.palette.text.primary,
      }}
    >
      github io
    </Typography>
  </>
);

const footer = (
  <>
    &copy;{FULL_YEAR} by{" "}
    <Link href={consts.GITHUB_URL} target={consts.GITHUB_URL}>
      yanglee2421
    </Link>
  </>
);

const AuthWrapper = (props: React.PropsWithChildren) =>
  useCurrentUser() ? props.children : <NavigateToLogin />;

const GuestWrapper = (props: React.PropsWithChildren) =>
  useCurrentUser() ? <NavigateToHome /> : props.children;

const AuthRoute = () => {
  const [key, update] = React.useState("");

  const location = useLocation();
  const showMenuInMobile = Object.is(key, location.key);

  return (
    <AuthLayout
      showMenuInMobile={showMenuInMobile}
      onShowMenuInMobileChange={() => {
        update((prev) => (prev === location.key ? "" : location.key));
      }}
    >
      <Outlet />
    </AuthLayout>
  );
};

const GuestRoute = () => (
  <GuestWrapper>
    <GuestLayout>
      <Outlet />
    </GuestLayout>
  </GuestWrapper>
);

const routes: RouteObject[] = [
  {
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
        Component: GuestRoute,
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
        Component: AuthRoute,
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
            lazy: async () => {
              const { Component, ...rest } = await import(
                "@/pages/overtime/route"
              );

              return {
                ...rest,
                Component() {
                  return (
                    <AuthWrapper>
                      <Component />
                    </AuthWrapper>
                  );
                },
              };
            },
          },
          {
            id: "minesweeper",
            path: "minesweeper",
            lazy: () => import("@/pages/minesweeper/route"),
          },
          {
            id: "lab",
            path: "lab",
            lazy: () => import("@/pages/lab/route"),
          },
          {
            id: "calendar",
            path: "calendar",
            lazy: () => import("@/pages/calendar/Component"),
          },
          {
            id: "calculator",
            path: "calculator",
            lazy: () => import("@/pages/calculator/route"),
          },
          {
            id: "invoices",
            path: "invoices",
            lazy: () => import("@/pages/invoices/route"),
          },
          {
            id: "staff",
            path: "staff",
            lazy: () => import("@/pages/staff/route"),
          },
          {
            id: "chat",
            path: "chat",
            lazy: () => import("@/pages/chat/route"),
          },
          {
            id: "handbook",
            path: "handbook",
            lazy: () => import("@/pages/handbook/component"),
          },
          {
            id: "qrcode",
            path: "qrcode",
            lazy: () => import("@/pages/qrcode/route"),
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
