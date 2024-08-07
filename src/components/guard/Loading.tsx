import { Box, CircularProgress, Typography } from "@mui/material";

export function Loading() {
  return (
    <Box
      sx={{
        inlineSize: "100dvw",
        blockSize: "100dvh",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
      }}
    >
      <CircularProgress />
      <Typography>loading...</Typography>
    </Box>
  );
}
