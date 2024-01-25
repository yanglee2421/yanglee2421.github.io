// Router Imports
import { useOutlet } from "react-router-dom";

// MUI Imports
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import { GitHub } from "@mui/icons-material";

// Components Imports
import {
  LanguageToggler,
  ModeToggler,
  MobileMenu,
  UserDropdown,
  Searcher,
} from "@/shared";

// React Imports
import React from "react";

export function MobileLayout() {
  const outlet = useOutlet();

  const appbarRef = React.useRef<HTMLDivElement>(null);
  const [marginTop, setMarginTop] = React.useState(0);

  React.useEffect(() => {
    const el = appbarRef.current;

    if (!el) {
      return;
    }

    const observer = new ResizeObserver(([{ contentBoxSize }]) => {
      const [size] = contentBoxSize;
      setMarginTop(size.blockSize);
    });
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      observer.disconnect();
    };
  }, [setMarginTop]);

  return (
    <>
      <AppBar ref={appbarRef}>
        <Toolbar>
          <MobileMenu color="inherit"></MobileMenu>
          <Searcher color="inherit" sx={{ mr: "auto" }}></Searcher>
          <LanguageToggler color="inherit"></LanguageToggler>
          <ModeToggler color="inherit"></ModeToggler>
          <IconButton
            href="https://github.com/yanglee2421/react-mui"
            target="_blank"
            color="inherit"
          >
            <GitHub />
          </IconButton>
          <UserDropdown />
        </Toolbar>
      </AppBar>
      <Box marginTop={`${marginTop}px`}>{outlet}</Box>
    </>
  );
}
