import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import React from "react";
import { DEFAULT_MODE, FALLBACK_LANG } from "@/lib/constants";

export type Mode = "light" | "dark" | "system";

export type State = {
  fallbackLang: string;
  mode: Mode;
  netlifyToken: string;
};

const initialState = (): State => ({
  mode: DEFAULT_MODE,
  fallbackLang: FALLBACK_LANG,
  netlifyToken: "",
});

export const useLocalStore = create<State>()(
  persist(immer(initialState), {
    name: "useLocalStore",
    storage: createJSONStorage(() => window.localStorage),
  }),
);

export const useLocalStoreHasHydrated = () =>
  React.useSyncExternalStore(
    (onStateChange) => useLocalStore.persist.onFinishHydration(onStateChange),
    () => useLocalStore.persist.hasHydrated(),
    () => false,
  );
