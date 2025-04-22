import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import React from "react";
import localforage from "localforage";
import type { WritableDraft } from "immer";

type State = {
  completionId: number;
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
      completionId: 0,
    })),
    {
      name: "useDbStore",
      storage: createJSONStorage(() => localforage),
      version: 1,
    },
  ),
);

export const useDbStoreHasHydrated = () =>
  React.useSyncExternalStore(
    (onStateChange) => useDbStore.persist.onFinishHydration(onStateChange),
    () => useDbStore.persist.hasHydrated(),
    () => false,
  );
