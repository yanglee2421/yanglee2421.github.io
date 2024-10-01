import localforage from "localforage";
import React from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Input } from "@/components/ui/input";

export function AsyncStore() {
  const value = useAsyncStore((store) => store.value);
  const hasHydrated = useAsyncStoreHasHydrated();
  const { setValue } = React.use(asyncStoreHasHydrated);

  return (
    <Input
      disabled={!hasHydrated}
      value={value}
      onChange={(evt) => {
        setValue(evt.target.value);
      }}
    />
  );
}

type AsyncStore = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const useAsyncStore = create(
  persist<AsyncStore>(
    (set, get) => ({
      value: "",
      setValue(updater) {
        set({
          value: typeof updater === "function" ? updater(get().value) : updater,
        });
      },
    }),
    {
      name: "useAsyncStore",
      storage: createJSONStorage(() => {
        return {
          getItem(name) {
            return localforage.getItem(name);
          },
          setItem(name, value) {
            return localforage.setItem(name, value);
          },
          removeItem(name) {
            return localforage.removeItem(name);
          },
        };
      }),
    },
  ),
);

const useAsyncStoreHasHydrated = () =>
  React.useSyncExternalStore(
    (onStoreChange) => useAsyncStore.persist.onFinishHydration(onStoreChange),
    () => useAsyncStore.persist.hasHydrated(),
    () => false,
  );

const asyncStoreHasHydrated = new Promise<AsyncStore>((resolve) =>
  useAsyncStore.persist.onFinishHydration(resolve),
);
