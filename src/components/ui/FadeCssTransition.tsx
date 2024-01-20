// MUI Imports
import { Box } from "@mui/material";

// React Imports
import React from "react";

// Components Imports
import { CSSTransition } from "react-transition-group";

export function FadeCssTransition(props: React.PropsWithChildren) {
  // ** Props
  const { children, ...restProps } = props;

  const nodeRef = React.useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      addEndListener={(done) => {
        nodeRef.current?.addEventListener("transitionend", done);
      }}
      classNames={"fade"}
      unmountOnExit
      {...restProps}
    >
      <Box
        ref={nodeRef}
        sx={(theme) => {
          return {
            // Enter stage
            "&.fade-enter": {
              opacity: 0,
            },
            "&.fade-enter-active": {
              transition: theme.transitions.create("opacity"),
              opacity: 1,
            },
            "&.fade-enter-done": {
              opacity: 1,
            },

            // Exit stage
            "&.fade-exit": {
              opacity: 1,
            },
            "&.fade-exit-active": {
              transition: theme.transitions.create("opacity"),
              opacity: 0,
            },
            "&.fade-exit-done": {
              opacity: 0,
            },
          };
        }}
      >
        {children}
      </Box>
    </CSSTransition>
  );
}
