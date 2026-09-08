import React from "react";

export const useCurrentUser = () => {
  return React.useSyncExternalStore(
    (onStateChange) => {
      return () => {};
    },
    () => null,
  );
};
