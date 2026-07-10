import type { RouteObject } from "react-router";
import { RootComponent, RootHydrateFallback } from "./root";

export const createRoutes = (): RouteObject[] => {
  return [
    {
      children: [
        {
          index: true,
          lazy: () => import("@/pages/home"),
        },
      ],
      Component: RootComponent,
      HydrateFallback: RootHydrateFallback,
    },
  ];
};
