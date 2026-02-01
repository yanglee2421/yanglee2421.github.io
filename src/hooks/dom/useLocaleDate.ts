import { onAnimationFrame } from "@/lib/utils";
import React from "react";

export const useLocaleDate = (locales?: Intl.LocalesArgument) => {
  return React.useSyncExternalStore(
    onAnimationFrame,
    () => getDateString(locales),
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
