import { onAnimationFrame } from "@/lib/utils";
import React from "react";

export function useLocaleDate(locales?: Intl.LocalesArgument) {
  return React.useSyncExternalStore(
    onAnimationFrame,
    () => getDateString(locales),
    () => getDateString(locales),
  );
}

function getDateString(locales?: Intl.LocalesArgument) {
  return new Date().toLocaleDateString(locales, {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  });
}
