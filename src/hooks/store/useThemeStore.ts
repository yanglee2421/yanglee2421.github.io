import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import React from "react";

export type Mode = "system" | "dark" | "light";

export type ThemeStore = {
  // Background setting
  bgAlpha: number;
  setBgAlpha: React.Dispatch<React.SetStateAction<number>>;
  bgBlur: number;
  setBgBlur: React.Dispatch<React.SetStateAction<number>>;
  xsBgImgKey: string;
  setXsBgImgKey: React.Dispatch<React.SetStateAction<string>>;
  smBgImgKey: string;
  setSmBgImgKey: React.Dispatch<React.SetStateAction<string>>;

  // Theme setting
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;

  // Menu setting
  asideMenuCollapsed: boolean;
  setAsideMenuCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useThemeStore = create(
  persist<ThemeStore>(
    (set, get) => {
      return {
        // Background setting
        bgAlpha: 0,
        setBgAlpha(action) {
          return set({
            bgAlpha:
              typeof action === "function" ? action(get().bgAlpha) : action,
          });
        },
        bgBlur: 0,
        setBgBlur(action) {
          return set({
            bgBlur:
              typeof action === "function" ? action(get().bgBlur) : action,
          });
        },
        xsBgImgKey: "",
        setXsBgImgKey(action) {
          return set({
            xsBgImgKey:
              typeof action === "function" ? action(get().xsBgImgKey) : action,
          });
        },
        smBgImgKey: "",
        setSmBgImgKey(action) {
          return set({
            smBgImgKey:
              typeof action === "function" ? action(get().smBgImgKey) : action,
          });
        },

        // Theme setting
        mode: "system",
        setMode(action) {
          return set({
            mode: typeof action === "function" ? action(get().mode) : action,
          });
        },

        // Menu setting
        asideMenuCollapsed: false,
        setAsideMenuCollapsed(action) {
          return set({
            asideMenuCollapsed:
              typeof action === "function"
                ? action(get().asideMenuCollapsed)
                : action,
          });
        },
      };
    },
    {
      name: "useThemeStore",
      storage: createJSONStorage(() => globalThis.localStorage),
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
