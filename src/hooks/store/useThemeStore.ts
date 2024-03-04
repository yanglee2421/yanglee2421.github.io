import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type React from "react";

export const useThemeStore = create(
  persist<ThemeStore>(
    (set, get) => {
      return {
        mode: "system",
        setMode(action) {
          return set({
            mode: typeof action === "function" ? action(get().mode) : action,
          });
        },

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
      name: import.meta.env.VITE_ZUSTAND_PERSIST,
      storage: createJSONStorage(() => globalThis.localStorage),
    },
  ),
);

export interface ThemeStore {
  bgAlpha: number;
  setBgAlpha: React.Dispatch<React.SetStateAction<number>>;
  bgBlur: number;
  setBgBlur: React.Dispatch<React.SetStateAction<number>>;
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  asideMenuCollapsed: boolean;
  setAsideMenuCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

type Mode = "system" | "dark" | "light";
