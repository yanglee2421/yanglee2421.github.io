import { LangToggle } from "@/components/shared/LangToggle";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { MenuBook } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

export const Header = (props: React.PropsWithChildren) => {
  const theme = useTheme();

  return (
    <Toolbar
      sx={{
        position: "sticky",
        insetBlockStart: 0,
        zIndex: theme.zIndex.appBar,

        gap: 1,

        backgroundColor: theme.palette.background.default,
      }}
    >
      {props.children}
      <Breadcrumbs sx={{ display: { xs: "none", sm: "flex" } }}>
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Typography sx={{ color: "text.primary" }}>Breadcrumbs</Typography>
      </Breadcrumbs>
      <Box sx={{ mx: "auto" }} />
      <IconButton
        LinkComponent={"a"}
        href="https://yanglee2421.github.io/yanglee2421"
      >
        <MenuBook />
      </IconButton>
      <LangToggle />
      <ModeToggle />
    </Toolbar>
  );
};
