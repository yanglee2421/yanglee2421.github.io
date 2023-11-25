// Query Imports
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import localforage from "localforage";

import { getThemeConfig, ThemeConfig } from "./get-theme-config";

export function useThemeQuery() {
  return useQuery<ThemeConfig, Error>({
    queryKey: ["theme-config"],
    async queryFn() {
      const themeConfig = await localforage.getItem<ThemeConfig>(
        "theme-config"
      );

      return Object.assign(getThemeConfig(), themeConfig);
    },

    initialData: getThemeConfig,
    initialDataUpdatedAt: 0,

    placeholderData: keepPreviousData,

    retry: false,
  });
}
