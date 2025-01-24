import { RouterUI } from "@/router/RouterUI";
import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useLocaleStore } from "@/hooks/store/useLocaleStore";

const fallback = (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 6,

      position: "fixed",
      inset: 0,
      zIndex(theme) {
        return theme.zIndex.modal;
      },
    }}
  >
    <CircularProgress />
    <Typography>Loading...</Typography>
  </Box>
);

export function App() {
  const hasHydrated = React.useSyncExternalStore(
    (onStoreChange) => useLocaleStore.persist.onFinishHydration(onStoreChange),
    () => useLocaleStore.persist.hasHydrated(),
    () => false
  );

  if (!hasHydrated) {
    return fallback;
  }

  return (
    <React.Suspense fallback={fallback}>
      <RouterUI />
    </React.Suspense>
  );
}
