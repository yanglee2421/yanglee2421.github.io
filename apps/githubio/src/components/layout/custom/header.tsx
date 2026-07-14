import { Box, Toolbar, useTheme } from "@mui/material";
import React from "react";

export const Header = (props: React.PropsWithChildren) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          zIndex: theme.zIndex.appBar,
          insetInline: 0,
          insetBlockStart: 0,

          ["[data-show-sidebar=true] &"]: {
            transition: theme.transitions.create("padding-inline-start", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            paddingInlineStart: { sm: "calc(var(--sidebar-width) * 8px)" },
          },
          ["[data-show-sidebar=false] &"]: {
            transition: theme.transitions.create("padding-inline-start", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            paddingInlineStart: { sm: 0 },
          },
        }}
      >
        <Toolbar
          sx={{
            gap: 1,

            backgroundColor: theme.palette.background.default,
          }}
        >
          {props.children}
        </Toolbar>
      </Box>
      <Toolbar sx={{ visibility: "hidden" }} />
    </>
  );
};
