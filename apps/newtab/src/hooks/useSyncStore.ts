import React from "react";
import { animationFrameScheduler, auditTime, filter, fromEvent } from "rxjs";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type Preset = "links" | "snow" | "bubbles" | "";
export type BackgroundType = "color" | "gallery";
export type Mode = "system" | "light" | "dark";

interface Store {
  mode: Mode;
  lang: string;

  preset: Preset;

  alpha: number;
  blur: number;
  backgroundType: BackgroundType;
  wallpaperId: number;
  gallery: number[];
  backgroundColor: string;
}

const storeInitializer = (): Store => {
  return {
    alpha: 15,
    blur: 4,
    lang: "en",
    preset: "snow",
    backgroundType: "gallery",
    wallpaperId: 0,
    gallery: [],
    mode: "system",
    backgroundColor: "oklch(58.5% 0.233 277.117)",
  };
};

export const useSyncStore = create<Store>()(
  persist(immer(storeInitializer), {
    name: "useSyncStore",
    storage: createJSONStorage(() => localStorage),
    version: 9,
  }),
);

const storage$ = fromEvent<StorageEvent>(window, "storage");
const storeChange$ = storage$.pipe(
  filter((e) => {
    const storageKey = useSyncStore.persist.getOptions().name;

    return e.key === storageKey;
  }),
  auditTime(0, animationFrameScheduler),
);

export const useSubscribeSyncStoreChange = () => {
  React.useEffect(() => {
    const sub = storeChange$.subscribe(() => {
      React.startTransition(() => {
        useSyncStore.persist.rehydrate();
      });
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);
};
