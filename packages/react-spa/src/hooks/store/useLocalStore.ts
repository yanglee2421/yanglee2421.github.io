import { DEFAULT_LANG, DEFAULT_MODE } from "@/lib/constants";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type Mode = "light" | "dark" | "system";

export type State = {
  fallbackLang: string;
  mode: Mode;
  netlifyToken: string;
  accessToken: string;
  refreshToken: string;
};

const storeInitializer = (): State => {
  return {
    mode: DEFAULT_MODE,
    fallbackLang: DEFAULT_LANG,
    netlifyToken: "",
    accessToken: "",
    refreshToken: "",
  };
};

export const useLocalStore = create<State>()(
  persist(immer(storeInitializer), {
    name: "useLocalStore",
    storage: createJSONStorage(() => window.localStorage),
  }),
);
