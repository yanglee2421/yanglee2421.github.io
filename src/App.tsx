import { RouterUI } from "@/router/RouterUI";
import { MuiProvider } from "@/components/mui";
import { QueryProvider } from "@/components/query";
import { useLocalStoreHasHydrated } from "@/hooks/store/useLocalStore";
import { Box, CircularProgress } from "@mui/material";
import { useDbStoreHasHydrated } from "./hooks/store/useDbStore";

const fallbackNode = (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 6,
    }}
  >
    <CircularProgress />
  </Box>
);

export const App = () => {
  const hasHydrated = useLocalStoreHasHydrated();
  const hasDbHydrated = useDbStoreHasHydrated();

  if (!hasHydrated) {
    return fallbackNode;
  }

  if (!hasDbHydrated) {
    return fallbackNode;
  }

  return (
    <QueryProvider>
      <MuiProvider>
        <RouterUI />
      </MuiProvider>
    </QueryProvider>
  );
};
