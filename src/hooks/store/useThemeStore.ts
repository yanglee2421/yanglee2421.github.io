// Zustand Imports
import React from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useThemeStore = create(
  persist<ThemeStore>(
    (set, get) => {
      return {
        bgAlpha: 0,
        setBgAlpha(action) {
          const bgAlpha = (() => {
            if (typeof action === "function") {
              return action(get().bgAlpha);
            }

            return action;
          })();

          return set({ bgAlpha });
        },

        bgBlur: 0,
        setBgBlur(action) {
          const bgBlur = (() => {
            if (typeof action === "function") {
              return action(get().bgBlur);
            }

            return action;
          })();

          return set({ bgBlur });
        },
      };
    },
    {
      name: import.meta.env.VITE_ZUSTAND_PERSIST,
      storage: createJSONStorage(() => globalThis.localStorage),
    }
  )
);

export interface ThemeStore {
  bgAlpha: number;
  setBgAlpha: React.Dispatch<React.SetStateAction<number>>;
  bgBlur: number;
  setBgBlur: React.Dispatch<React.SetStateAction<number>>;
}
