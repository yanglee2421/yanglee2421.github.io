import React from "react";
import { animationFrames } from "rxjs";

export const useLocaleTime = (locales?: Intl.LocalesArgument) => {
  return React.useSyncExternalStore(
    (onStateChange) => {
      const sub = animationFrames().subscribe(onStateChange);

      return () => {
        sub.unsubscribe();
      };
    },
    () => getTimeString(locales),
  );
};

const getTimeString = (locales?: Intl.LocalesArgument) => {
  return new Date().toLocaleTimeString(locales, {
    hour12: false,
  });
};
