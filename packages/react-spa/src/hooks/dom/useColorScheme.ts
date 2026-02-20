import React from "react";

const mediaQuery = matchMedia("(prefers-color-scheme: dark)");

export const useColorScheme = () =>
  React.useSyncExternalStore(
    (onStoreChange) => {
      mediaQuery.addEventListener("change", onStoreChange);

      return () => {
        mediaQuery.removeEventListener("change", onStoreChange);
      };
    },

    () => mediaQuery.matches,
  );
