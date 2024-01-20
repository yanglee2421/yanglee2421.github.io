// MUI Imports
import { Box, useMediaQuery, Theme, BoxProps } from "@mui/material";

// React Imports
import React from "react";

export const TabLabel = React.forwardRef((props: TabLabelProps, ref) => {
  // ** Props
  const { children, icon, ...restProps } = props;

  const extraSmall = useMediaQuery<Theme>((theme) => {
    return theme.breakpoints.down("sm");
  });

  return (
    <Box
      ref={ref}
      display={"flex"}
      alignItems={"center"}
      sx={{
        "& svg": {
          mr: extraSmall ? 0 : 2,
        },
      }}
      {...restProps}
    >
      {icon}
      {extraSmall || children}
    </Box>
  );
});

export type TabLabelProps = BoxProps & {
  icon: React.ReactNode;
};
