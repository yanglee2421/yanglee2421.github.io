import { AuthLayout } from "@/components/layout/auth";
import { QueryProvider } from "@/components/query";
import { useLocalStore } from "@/hooks/store/useLocalStore";
import { localeService } from "@/shared/LocaleContext";
import type { RouteObject } from "react-router";
import { redirect } from "react-router";
import { AuthGuard, GuestGuard, LangRoute } from "./guard";
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
              children: [
                {
                  path: "login",
                  lazy: () => import("@/pages/login/component"),
                },
                {
                  path: "login_demo",
                  lazy: () => import("@/pages/login_demo/component"),
                },
              ],
              Component: GuestGuard,
              loader: async () => {
                if (import.meta.env.MODE !== "STG") {
                  return;
                }

                const accessToken = useLocalStore.getState().accessToken;
                const refreshToken = useLocalStore.getState().refreshToken;
                const queryClient = QueryProvider.queryClient;

                if (!refreshToken) {
                  return;
                }

                const loaderData = await queryClient
                  .ensureQueryData({
                    queryKey: ["me"],
                    queryFn: async () => {
                      const res = await fetch("/api/me", {
                        headers: {
                          Authorization: `Bearer ${accessToken}`,
                        },
                      });

                      if (!res.ok) {
                        throw new Error("API Failed");
                      }

                      return res.json();
                    },
                    staleTime: Infinity,
                    gcTime: Infinity,
                  })
                  // If the API call fails (e.g., token expired),
                  // we consider the user as guest and let them visit the guest pages,
                  // DO NOT throw any error here
                  // Throwing an error here would cause ErrorBoundary to capture it and render a fallback UI,
                  // which is not the result we want.
                  .catch(Boolean);

                return loaderData;
              },
            },
            {
              children: [
                {
                  children: [
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
                  ],
                  Component: DashLayout,
                },
              ],
              Component: AuthGuard,
              loader: async () => {
                if (import.meta.env.MODE !== "STG") {
                  return;
                }

                const accessToken = useLocalStore.getState().accessToken;
                const refreshToken = useLocalStore.getState().refreshToken;
                const queryClient = QueryProvider.queryClient;

                if (!refreshToken) {
                  throw redirect(localeService.resolvePathname("/login"));
                }

                const loaderData = await queryClient.ensureQueryData({
                  queryKey: ["me"],
                  queryFn: async () => {
                    const res = await fetch("/api/me", {
                      headers: {
                        Authorization: `Bearer ${accessToken}`,
                      },
                    });

                    if (!res.ok) {
                      throw redirect(localeService.resolvePathname("/login"));
                    }

                    return res.json();
                  },
                  staleTime: Infinity,
                  gcTime: Infinity,
                });

                return loaderData;
              },
            },
            {
              Component: DashLayout,
              children: [
                {
                  path: "dashboard",
                  lazy: () => import("@/pages/dashboard/component"),
                },
                {
                  path: "rank",
                  lazy: () => import("@/pages/rank/component"),
                },
                {
                  path: "lab",
                  lazy: () => import("@/pages/lab/component"),
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
                {
                  path: "sortable-horizontal/:tab?",
                  lazy: () =>
                    import("@/pages/stories/2 - Presets/Sortable/2-Horizontal.story"),
                },
                {
                  path: "sortable-grid/:tab?",
                  lazy: () =>
                    import("@/pages/stories/2 - Presets/Sortable/3-Grid.story"),
                },
                {
                  path: "sortable-multiple-containers/:tab?",
                  lazy: () =>
                    import("@/pages/stories/2 - Presets/Sortable/4-MultipleContainers.story"),
                },
                {
                  path: "qrcode",
                  lazy: () => import("@/pages/qrcode/component"),
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
          Component: LangRoute,
          loader: async ({ params, request }) => {
            const langInPath = params.lang!;
            const fallbackLang = useLocalStore.getState().fallbackLang;
            localeService.setLocale(fallbackLang);
            localeService.setLocale(langInPath);
            const lang = localeService.getLocale();

            if (Object.is(lang, langInPath)) {
              return;
            }

            const url = new URL(request.url);
            url.pathname = localeService.resolvePathname(url.pathname);

            throw redirect(url.href);
          },
        },
      ],
      Component: RootRoute,
      ErrorBoundary: RootErrorBoundary,
      HydrateFallback: RootHydrateFallback,
    },
  ];
};
