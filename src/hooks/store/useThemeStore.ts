// Zustand Imports
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useThemeStore = create(
  persist<ThemeStore>(
    (set, get) => {
      return {
        count: 0,
        setCount(count) {
          if (typeof count === "number") {
            return set({ count });
          }

          return set({ count: get().count + 1 });
        },
      };
    },
    {
      name: import.meta.env.VITE_ZUSTAND_PERSIST,
      storage: createJSONStorage(() => globalThis.sessionStorage),
    }
  )
);

export interface ThemeStore {
  count: number;
  setCount(count?: number): void;
}
