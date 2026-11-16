import { useLocalStore } from "@/hooks/store/useLocalStore";
import { authClient } from "@/shared/auth-client";
import { localeService } from "@/shared/LocaleContext";
import type { MiddlewareFunction, RouteObject } from "react-router";
import { Navigate, redirect } from "react-router";
import { GuestGuard, LangRoute } from "./guard";
import { DashLayout } from "./layout";
import { RootErrorBoundary, RootHydrateFallback, RootRoute } from "./root";

const guestMiddleware: MiddlewareFunction = async () => {
  const state = await authClient.waitForResolved();

  if (state.status === "authenicated") {
    throw redirect("/lab");
  }
};

const authMiddleware: MiddlewareFunction = async () => {
  const state = await authClient.waitForResolved();

  if (state.status === "unauthenicated") {
    throw redirect("/login");
  }
};

export const createRoutes = (): RouteObject[] => {
  return [
    {
      children: [
        {
          index: true,
          middleware: [],
          loader: async () => {
            const fallbackLang = useLocalStore.getState().fallbackLang;
            localeService.setLocale(fallbackLang);

            throw redirect(localeService.resolvePathname("/"));
          },
        },
        {
          path: ":lang",
          children: [
            {
              path: "*",
              lazy: () => import("@/pages/not-fount/component"),
            },
            {
              middleware: [guestMiddleware],
              children: [
                {
                  path: "login",
                  lazy: () => import("@/pages/login/component"),
                },
              ],
              Component: GuestGuard,
            },
            {
              children: [
                {
                  index: true,
                  element: <Navigate to="/en/lab" />,
                },
                {
                  path: "dashboard",
                  lazy: () => import("@/pages/dashboard/component"),
                },
                {
                  path: "animate",
                  lazy: () => import("@/pages/animate/component"),
                },
                {
                  path: "qrcode",
                  lazy: () => import("@/pages/qrcode/component"),
                },
                {
                  path: "canvas",
                  lazy: () => import("@/pages/canvas/component"),
                },
                {
                  path: "awilix",
                  lazy: () => import("@/pages/awilix/component"),
                },
                {
                  path: "transition",
                  lazy: () => import("@/pages/transition/component"),
                },
                {
                  path: "pdf",
                  lazy: () => import("@/pages/pdf/component"),
                },
                {
                  middleware: [authMiddleware],
                  path: "lab",
                  lazy: () => import("@/pages/lab/component"),
                },
                {
                  path: "flip",
                  lazy: () => import("@/pages/flip/component"),
                },
              ],
              Component: DashLayout,
            },
            {
              children: [
                {
                  path: "motion",
                  lazy: () => import("@/pages/motion/component"),
                },
              ],
            },
          ],
          Component: LangRoute,
        },
      ],
      Component: RootRoute,
      ErrorBoundary: RootErrorBoundary,
      HydrateFallback: RootHydrateFallback,
    },
  ];
};
