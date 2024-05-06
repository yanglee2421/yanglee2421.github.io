import React from "react";

export function useOnlineStatus() {
  return React.useSyncExternalStore(
    (trigger) => {
      window.addEventListener("online", trigger);
      window.addEventListener("offline", trigger);

      return () => {
        window.removeEventListener("online", trigger);
        window.removeEventListener("offline", trigger);
      };
    },
    () => {
      return navigator.onLine;
    },
  );
}
