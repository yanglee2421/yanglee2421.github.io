import React from "react";

export function useIsDark() {
  return React.useSyncExternalStore(
    (trigger) => {
      const controller = new AbortController();

      mediaQuery.addEventListener("change", trigger, {
        signal: controller.signal,
      });

      return () => {
        controller.abort();
      };
    },

    () => mediaQuery.matches,
  );
}

const mediaQuery = matchMedia("(prefers-color-scheme: dark)");
