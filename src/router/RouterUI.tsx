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
} from "react-router";
import { useTranslation } from "react-i18next";
import { useLocalStore } from "@/hooks/store/useLocalStore";
import { NavigateToHome, NavigateToLogin } from "@/components/navigate";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { AuthLayout, GuestLayout } from "@/components/layout";
import { NprogressBar } from "@/components/NprogressBar";
import { getMatchedLang } from "@/lib/utils";

const RootRoute = () => {
  return (
    <>
      <Outlet />
      <NprogressBar />
      <ScrollRestoration />
    </>
  );
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

const AuthGuard = () => (useCurrentUser() ? <Outlet /> : <NavigateToLogin />);
const GuestGuard = () => (useCurrentUser() ? <NavigateToHome /> : <Outlet />);

const routes: RouteObject[] = [
  {
    id: "root",
    Component: RootRoute,
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
              return import("@/pages/not-fount/route");
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
                    lazy: () => import("@/pages/login/route"),
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
                Component: AuthLayout,
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
                    lazy: async () => import("@/pages/overtime/route"),
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
        ],
      },
    ],
  },
];

const router = import.meta.env.PROD
  ? createHashRouter(routes)
  : createBrowserRouter(routes);

export const RouterUI = () => <RouterProvider router={router} />;
