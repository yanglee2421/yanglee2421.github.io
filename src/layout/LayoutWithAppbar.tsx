// Router Imports
import { useLocation, useOutlet } from "react-router-dom";

// MUI Imports
import { Box, styled } from "@mui/material";

// Component Imports
import { Appbar } from "@/components/layout";
import { SwitchTransition, CSSTransition } from "react-transition-group";

// React Imports
import React from "react";

// Utils Imports
import { useObserverResize } from "@/hooks";

export function LayoutWithAppbar() {
  const outlet = useOutlet();
  const location = useLocation();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const appBarRef = React.useRef<HTMLElement>(null);
  const resizeEntry = useObserverResize(appBarRef);

  return (
    <>
      <Appbar ref={appBarRef}></Appbar>
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
          <StyledBox
            ref={containerRef}
            p={2}
            mt={`${resizeEntry?.borderBoxSize.at(0)?.blockSize || 0}px`}
          >
            {outlet}
          </StyledBox>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}

const StyledBox = styled(Box)(({ theme }) => {
  return {
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
