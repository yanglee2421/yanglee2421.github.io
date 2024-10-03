import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import React from "react";

export type Mode = "system" | "dark" | "light";

export type ThemeStore = {
  mode: Mode;
  set: (
    partial:
      | ThemeStore
      | Partial<ThemeStore>
      | ((state: ThemeStore) => ThemeStore | Partial<ThemeStore>),
    replace?: boolean | undefined,
  ) => void;
};

export const useThemeStore = create(
  persist<ThemeStore>(
    (set) => {
      return {
        mode: "system",
        set,
      };
    },
    {
      name: "useThemeStore",
      storage: createJSONStorage(() => window.localStorage),
    },
  ),
);

export const useThemeStoreHasHydrated = () =>
  React.useSyncExternalStore(
    (onStateChange) => useThemeStore.persist.onFinishHydration(onStateChange),
    () => useThemeStore.persist.hasHydrated(),
    () => false,
  );

export const themeStoreHasHydrated = new Promise<ThemeStore>((resolve) =>
  useThemeStore.persist.onFinishHydration(resolve),
);
