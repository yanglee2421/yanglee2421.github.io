import { GitHub } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Box, styled } from "@mui/material";
import React from "react";
import { useOutlet, useLocation } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { AuthGuard } from "@/components/guard/AuthGuard";
import { LanguageToggler } from "@/components/shared/LanguageToggler";
import { MobileMenu } from "@/components/shared/MobileMenu";
import { ModeToggler } from "@/components/shared/ModeToggler";
import { UserDropdown } from "@/components/shared/UserDropdown";

export function MobileLayout() {
  const outlet = useOutlet();
  const location = useLocation();

  const [marginTop, setMarginTop] = React.useState(0);
  const appbarRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <>
      <AppBar ref={appbarRef}>
        <Toolbar>
          <MobileMenu color="inherit" />
          <LanguageToggler color="inherit" sx={{ ml: "auto" }} />
          <ModeToggler color="inherit" />
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

      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          nodeRef={containerRef}
          addEndListener={(done) => {
            containerRef.current?.addEventListener("transitionend", done);
          }}
          unmountOnExit
          classNames={"fade"}
        >
          <StyledBox ref={containerRef} marginTop={`${marginTop}px`}>
            <AuthGuard>{outlet}</AuthGuard>
          </StyledBox>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}

const StyledBox = styled(Box)(({ theme }) => {
  return {
    padding: theme.spacing(2),

    // Enter stage
    "&.fade-enter": {
      opacity: 0,
      transform: "scale(1.1)",
    },
    "&.fade-enter-active": {
      transition: theme.transitions.create(["opacity", "transform"]),
      opacity: 1,
      transform: "scale(1)",
    },
    "&.fade-enter-done": {
      opacity: 1,
      transform: "scale(1)",
    },

    // Exit stage
    "&.fade-exit": {
      opacity: 1,
      transform: "scale(1)",
    },
    "&.fade-exit-active": {
      transition: theme.transitions.create(["opacity", "transform"]),
      opacity: 0,
      transform: "scale(0.9)",
    },
    "&.fade-exit-done": {
      opacity: 0,
      transform: "scale(0.9)",
    },
  };
});
