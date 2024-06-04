import React from "react";

export function useIsScrolled() {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      document.addEventListener("scroll", onStoreChange);

      return () => {
        document.removeEventListener("scroll", onStoreChange);
      };
    },
    () => Boolean(document.documentElement.scrollTop),
  );
}
