import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import React from "react";
import localforage from "localforage";
import type { WritableDraft } from "immer";

export type Invoice = {
  id: string;
  amount: number;
  staff: string[];
  note: string;
  date: number;
};

export type Staff = {
  id: string;
  name: string;
  alias: string;
  enable: boolean;
};

type State = {
  invoices: Array<Invoice>;
  staffs: Staff[];
};

type Actions = {
  set(
    nextStateOrUpdater:
      | State
      | Partial<State>
      | ((state: WritableDraft<State>) => void),
  ): void;
};

type Store = State & Actions;

export const useDbStore = create<Store>()(
  persist(
    immer((set) => ({
      set,
      invoices: [],
      staffs: [],
    })),
    {
      name: "useDbStore",
      storage: createJSONStorage(() => localforage),
      version: 2,
    },
  ),
);

export const useDbStoreHasHydrated = () =>
  React.useSyncExternalStore(
    (onStateChange) => useDbStore.persist.onFinishHydration(onStateChange),
    () => useDbStore.persist.hasHydrated(),
    () => false,
  );
