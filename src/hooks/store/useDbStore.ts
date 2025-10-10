import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import React from "react";
import localforage from "localforage";

type State = {
  completionId: number;
};

const initialState = (): State => ({
  completionId: 0,
});

export const useDbStore = create<State>()(
  persist(immer(initialState), {
    name: "useDbStore",
    storage: createJSONStorage(() => localforage),
    version: 1,
    migrate(state) {
      return state;
    },
  }),
);

export const useDbStoreHasHydrated = () =>
  React.useSyncExternalStore(
    (onStateChange) => useDbStore.persist.onFinishHydration(onStateChange),
    () => useDbStore.persist.hasHydrated(),
    () => false,
  );
