// Router Imports
import { useLocation, useOutlet } from "react-router-dom";

// MUI Imports
import { Box } from "@mui/material";

// Component Imports
import { Appbar } from "@/components/layout";

// React Imports
import React from "react";

// Utils Imports
import { useObserverResize } from "@/hooks";

// Transition Imports
import { SwitchTransition, CSSTransition } from "react-transition-group";

export function Main() {
  const outlet = useOutlet();
  const appBarRef = React.useRef<HTMLElement>(null);
  const resizeEntry = useObserverResize(appBarRef);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const location = useLocation();

  return (
    <>
      <Appbar ref={appBarRef} />
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
          <Box
            ref={containerRef}
            p={3}
            mt={`${resizeEntry?.borderBoxSize.at(0)?.blockSize}px`}
            sx={(theme) => {
              return {
                // Enter stage
                "&.fade-enter": {
                  opacity: 0,
                  transform: "scale(1.1)",
                },
                "&.fade-enter-active": {
                  transition: theme.transitions.create([
                    "opacity",
                    "transform",
                  ]),
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
                  transition: theme.transitions.create([
                    "opacity",
                    "transform",
                  ]),
                  opacity: 0,
                  transform: "scale(0.9)",
                },
                "&.fade-exit-done": {
                  opacity: 0,
                  transform: "scale(0.9)",
                },
              };
            }}
          >
            {outlet}
          </Box>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}
