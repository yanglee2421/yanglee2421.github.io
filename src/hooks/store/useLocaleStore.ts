import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import React from "react";

const FALLBACK_LANG = "en";

type LocaleStore = {
  fallbackLang: string;
  set: (
    partial:
      | LocaleStore
      | Partial<LocaleStore>
      | ((state: LocaleStore) => LocaleStore | Partial<LocaleStore>),
    replace?: boolean | undefined,
  ) => void;
};

export const useLocaleStore = create(
  persist<LocaleStore>(
    (set) => ({
      fallbackLang: FALLBACK_LANG,
      set,
    }),
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

export const localeStoreHasHydrated = new Promise<LocaleStore>((resolve) =>
  useLocaleStore.persist.onFinishHydration(resolve),
);
