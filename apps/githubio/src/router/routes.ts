import { useLocalStore } from "@/hooks/store/useLocalStore";
import { localeService } from "@/shared/LocaleContext";
import type { RouteObject } from "react-router";
import { redirect } from "react-router";
import { GuestGuard, LangRoute } from "./guard";
import { DashLayout } from "./layout";
import { RootErrorBoundary, RootHydrateFallback, RootRoute } from "./root";

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
              children: [],
              Component: GuestGuard,
            },
            {
              children: [
                {
                  path: "dashboard",
                  lazy: () => import("@/pages/dashboard/component"),
                },
                {
                  path: "animate",
                  lazy: () => import("@/pages/animate/component"),
                },
                {
                  index: true,
                  lazy: () => import("@/pages/lab/component"),
                },
                {
                  path: "qrcode",
                  lazy: () => import("@/pages/qrcode/component"),
                },
              ],
              Component: DashLayout,
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
