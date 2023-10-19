// Transition Imports
import { CSSTransition, SwitchTransition } from "react-transition-group";

// React Imports
import React from "react";

// MUI Imports
import { Button } from "@mui/material";

export function SwiperTrans() {
  const [state, setState] = React.useState(false);
  const helloRef = React.useRef<HTMLButtonElement>(null);
  const goodbyeRef = React.useRef<HTMLButtonElement>(null);
  const nodeRef = state ? goodbyeRef : helloRef;

  return (
    <SwitchTransition>
      <CSSTransition
        key={state ? "Goodbye, world!" : "Hello, world!"}
        nodeRef={nodeRef}
        addEndListener={(done) =>
          nodeRef.current?.addEventListener("transitionend", done)
        }
        classNames="fade"
      >
        <Button
          ref={nodeRef}
          onClick={() => setState((state) => !state)}
          variant="contained"
          sx={{
            "&.fade-enter": {
              opacity: 0,
            },
            "&.fade-exit": {
              opacity: 1,
            },
            "&.fade-enter-active": {
              opacity: 1,
              transition: " opacity 500ms",
            },
            "&.fade-exit-active": {
              opacity: 0,
              transition: " opacity 500ms",
            },
          }}
        >
          {state ? "Goodbye, world!" : "Hello, world!"}
        </Button>
      </CSSTransition>
    </SwitchTransition>
  );
}
