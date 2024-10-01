import React from "react";

export const useIsScrolled = () =>
  React.useSyncExternalStore(
    (onStoreChange) => {
      document.addEventListener("scroll", onStoreChange);

      return () => {
        document.removeEventListener("scroll", onStoreChange);
      };
    },
    () => Boolean(document.documentElement.scrollTop),
    () => false,
  );
