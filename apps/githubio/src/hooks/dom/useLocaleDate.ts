import React from "react";
import { animationFrames } from "rxjs";

export const useLocaleDate = (locales?: Intl.LocalesArgument) => {
  return React.useSyncExternalStore(
    (onStateChange) => {
      const sub = animationFrames().subscribe(onStateChange);

      return () => {
        sub.unsubscribe();
      };
    },
    () => getDateString(locales),
  );
};

const getDateString = (locales?: Intl.LocalesArgument) => {
  return new Date().toLocaleDateString(locales, {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};
