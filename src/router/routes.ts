import { AuthLayout } from "@/components/layout/auth";
import { useLocalStore } from "@/hooks/store/useLocalStore";
import { RootRoute, RootErrorBoundary, RootHydrateFallback } from "./root";
import { DashLayout } from "./layout";
import { AuthGuard, GuestGuard, LangGuard } from "./guard";
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
          Component: LangGuard,
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
                                    import("@/pages/dnd/core/draggable/hooks/usedraggable/basic-setup/component"),
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
};
