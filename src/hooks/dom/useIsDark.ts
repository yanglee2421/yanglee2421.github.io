import React from "react";

export function useIsDark() {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      mediaQuery.addEventListener("change", onStoreChange);

      return () => {
        mediaQuery.removeEventListener("change", onStoreChange);
      };
    },

    () => mediaQuery.matches,
  );
}

const mediaQuery = matchMedia("(prefers-color-scheme: dark)");
