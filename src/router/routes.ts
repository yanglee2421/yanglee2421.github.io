import React from "react";
import { useOutlet, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { AuthLayout } from "@/components/layout/auth";
import { useLocalStore } from "@/hooks/store/useLocalStore";
import { DashLayout } from "./layout";
import { AuthGuard, GuestGuard } from "./guard";
import { RootRoute, RootErrorBoundary, RootHydrateFallback } from "./root";
import type { RouteObject } from "react-router";

type UseStore = typeof useLocalStore;

const finishHydrate = (useStore: UseStore) => {
  return new Promise<void>((resolve) => {
    const hasHydrated = useStore.persist.hasHydrated();
    if (!hasHydrated) {
      useStore.persist.onFinishHydration(() => resolve());
      return;
    }

    resolve();
  });
};

export const createRoutes = (): RouteObject[] => {
  return [
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
          middleware: [],
          Component: () => {
            const outlet = useOutlet();
            const params = useParams();
            const { i18n } = useTranslation();
            const fallbackLang = useLocalStore((store) => store.fallbackLang);

            const changeLanguage = React.useEffectEvent(
              (paramLang?: string) => {
                i18n.changeLanguage(paramLang || fallbackLang);

                if (!paramLang) return;

                useLocalStore.setState((draft) => {
                  draft.fallbackLang = paramLang;
                });
              },
            );

            React.useEffect(() => {
              changeLanguage(params.lang);
            }, [params.lang]);

            return outlet;
          },
          children: [
            {
              path: "*",
              lazy: () => import("@/pages/not-fount/component"),
            },
            {
              Component: GuestGuard,
              children: [
                {
                  path: "login",
                  lazy: () => import("@/pages/login/component"),
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
                {
                  path: "dnd/:tab?",
                  lazy: () =>
                    import("@/pages/stories/1 - Core/Draggable/1-Draggable.story"),
                },
                {
                  path: "dragoverlay/:tab?",
                  lazy: () =>
                    import("@/pages/stories/1 - Core/Draggable/2-DragOverlay.story"),
                },
                {
                  path: "dropable/:tab?",
                  lazy: () =>
                    import("@/pages/stories/1 - Core/Droppable/Droppable.story"),
                },
                {
                  path: "sortable-vertical/:tab?",
                  lazy: () =>
                    import("@/pages/stories/2 - Presets/Sortable/1-Vertical.story"),
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
                    {
                      path: "lab",
                      lazy: () => import("@/pages/lab/component"),
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
                {
                  path: "electric",
                  lazy: () => import("@/pages/electric/component"),
                },
              ],
            },
          ],
        },
      ],
    },
  ];
};
