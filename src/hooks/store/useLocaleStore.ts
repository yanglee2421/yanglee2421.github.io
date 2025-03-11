import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { type WritableDraft } from "immer";
import React from "react";

const FALLBACK_LANG = "en";
const DEFAULT_MODE = "system";

export type Mode = "light" | "dark" | "system";

type LocaleStoreState = {
  fallbackLang: string;
  mode: Mode;
};

type LocaleStoreActions = {
  update(
    nextStateOrUpdater:
      | LocaleStoreState
      | Partial<LocaleStoreState>
      | ((state: WritableDraft<LocaleStoreState>) => void),
  ): void;
};

type LocaleStore = LocaleStoreState & LocaleStoreActions;

export const useLocaleStore = create<LocaleStore>()(
  persist(
    immer((update) => ({
      mode: DEFAULT_MODE,
      fallbackLang: FALLBACK_LANG,

      update,
    })),
    {
      name: "useLocaleStore",
      storage: createJSONStorage(() => window.localStorage),
    },
  ),
);

export const useLocaleStoreHasHydrated = () =>
  React.useSyncExternalStore(
    (onStateChange) => useLocaleStore.persist.onFinishHydration(onStateChange),
    () => useLocaleStore.persist.hasHydrated(),
    () => false,
  );
