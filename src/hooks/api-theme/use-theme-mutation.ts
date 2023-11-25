// Query Imports
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Localforage Imports
import localforage from "localforage";

import { ThemeConfig, getThemeConfig } from "./get-theme-config";

export function useThemeMutation() {
  const queryClient = useQueryClient();
  return useMutation<ThemeConfig, Error, Partial<ThemeConfig>>({
    mutationFn(themeConfig) {
      return localforage.setItem<ThemeConfig>(
        "theme-config",
        Object.assign(getThemeConfig(), themeConfig)
      );
    },
    onError(error) {
      console.error(error);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["theme-config"] });
    },
  });
}
