import { Box, Stack } from "@mui/material";
import React from "react";

export function BlankLayout(props: React.PropsWithChildren) {
  return (
    <Box
      sx={{
        padding: 6,
        backgroundColor(t) {
          return t.palette.grey[300];
        },
      }}
    >
      <Stack spacing={6}>
        {props.children}
      </Stack>
    </Box>
  );
}
