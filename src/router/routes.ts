import { AuthLayout } from "@/components/layout/auth";
import { DashLayout } from "./layout";
import { AuthGuard, GuestGuard } from "./guard";
import { RootRoute, RootErrorBoundary, RootHydrateFallback } from "./root";
import type { RouteObject } from "react-router";

export const createRoutes = (): RouteObject[] => {
  return [
    {
      path: ":lang?",
      Component: RootRoute,
      ErrorBoundary: RootErrorBoundary,
      HydrateFallback: RootHydrateFallback,
      loader: async () => {},
      middleware: [],
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
          Component: AuthGuard,
          children: [
            {
              Component: DashLayout,
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
            },
          ],
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
  ];
};
