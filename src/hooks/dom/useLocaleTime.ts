import { onAnimationFrame } from "@/lib/utils";
import React from "react";

export function useLocaleTime(locales?: Intl.LocalesArgument) {
  return React.useSyncExternalStore(
    onAnimationFrame,
    () => getTimeString(locales),
    () => getTimeString(locales),
  );
}

function getTimeString(locales?: Intl.LocalesArgument) {
  return new Date().toLocaleTimeString(locales, {
    timeStyle: "short",
    hour12: false,
  });
}
