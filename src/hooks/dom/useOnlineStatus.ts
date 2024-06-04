import React from "react";

export function useOnlineStatus() {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("online", onStoreChange);
      window.addEventListener("offline", onStoreChange);

      return () => {
        window.removeEventListener("online", onStoreChange);
        window.removeEventListener("offline", onStoreChange);
      };
    },
    () => {
      return navigator.onLine;
    },
  );
}
