import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { DEFAULT_MODE, DEFAULT_LANG } from "@/lib/constants";

export type Mode = "light" | "dark" | "system";

export type State = {
  fallbackLang: string;
  mode: Mode;
  netlifyToken: string;
};

const storeInitializer = (): State => ({
  mode: DEFAULT_MODE,
  fallbackLang: DEFAULT_LANG,
  netlifyToken: "",
});

export const useLocalStore = create<State>()(
  persist(immer(storeInitializer), {
    name: "useLocalStore",
    storage: createJSONStorage(() => window.localStorage),
  }),
);
