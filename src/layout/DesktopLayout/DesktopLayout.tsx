// Router Imports
import { useLocation } from "react-router-dom";

// MUI Imports
import { Box, Button, styled } from "@mui/material";

// Components Imports
import { SwitchTransition, CSSTransition } from "react-transition-group";

// React Imports
import React from "react";

// Store Imports
import { useAuthStore } from "@/hooks/store";
import { useShallow } from "zustand/react/shallow";

export function DesktopLayout(props: React.PropsWithChildren) {
  const location = useLocation();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const authValue = useAuthStore(
    useShallow((store) => {
      return store.value;
    })
  );

  return (
    <>
      <Box>
        <Button
          onClick={() => {
            authValue.auth.signOut();
          }}
          color="error"
          variant="contained"
        >
          logout
        </Button>
      </Box>
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
          <StyledBox>{props.children}</StyledBox>
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
