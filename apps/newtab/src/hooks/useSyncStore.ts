import React from "react";
import {
  animationFrameScheduler,
  auditTime,
  filter,
  fromEventPattern,
  tap,
} from "rxjs";
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
    preset: "snow" as Preset,
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

export const useSubscribeSyncStoreChange = () => {
  React.useEffect(() => {
    const storage$ = fromEventPattern<StorageEvent>(
      (f) => window.addEventListener("storage", f),
      (f) => window.removeEventListener("storage", f),
    );

    const sub = storage$
      .pipe(
        filter((e) => {
          const storageKey = useSyncStore.persist.getOptions().name;

          return e.key === storageKey;
        }),
        auditTime(0, animationFrameScheduler),
        tap(() => {
          React.startTransition(() => {
            useSyncStore.persist.rehydrate();
          });
        }),
      )
      .subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, []);
};
