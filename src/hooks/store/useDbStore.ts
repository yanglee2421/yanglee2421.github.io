import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { type WritableDraft } from "immer";
import React from "react";
import localforage from "localforage";

export type Invoice = {
  id: number;
  amount: number;
  staff: string[];
  note: string;
  date: number;
};

type StoreState = {
  invoices: Array<Invoice>;
};

type StoreActions = {
  set(
    nextStateOrUpdater:
      | StoreState
      | Partial<StoreState>
      | ((state: WritableDraft<StoreState>) => void),
  ): void;
};

type Store = StoreState & StoreActions;

export const useDbStore = create<Store>()(
  persist(
    immer(
      (set) => ({
        set,
        invoices: [],
      }),
    ),
    {
      name: "useDbStore",
      storage: createJSONStorage(() => localforage),
      version: 2,
    },
  ),
);

export const useLocaleStoreHasHydrated = () =>
  React.useSyncExternalStore(
    (onStateChange) => useDbStore.persist.onFinishHydration(onStateChange),
    () => useDbStore.persist.hasHydrated(),
    () => false,
  );
