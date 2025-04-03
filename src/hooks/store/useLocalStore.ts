import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { type WritableDraft } from "immer";
import React from "react";
import { DEFAULT_MODE, FALLBACK_LANG } from "@/lib/constants";

export type Mode = "light" | "dark" | "system";

type State = {
  fallbackLang: string;
  mode: Mode;
};

type Actions = {
  update(
    nextStateOrUpdater:
      | State
      | Partial<State>
      | ((state: WritableDraft<State>) => void),
  ): void;
};

type Store = State & Actions;

export const useLocalStore = create<Store>()(
  persist(
    immer((update) => ({
      mode: DEFAULT_MODE,
      fallbackLang: FALLBACK_LANG,

      update,
    })),
    {
      name: "useLocalStore",
      storage: createJSONStorage(() => window.localStorage),
    },
  ),
);

export const useLocalStoreHasHydrated = () =>
  React.useSyncExternalStore(
    (onStateChange) => useLocalStore.persist.onFinishHydration(onStateChange),
    () => useLocalStore.persist.hasHydrated(),
    () => false,
  );
