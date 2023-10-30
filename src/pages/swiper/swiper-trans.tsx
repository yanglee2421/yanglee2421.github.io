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
      <MyItem
        key={state ? "Goodbye, world!" : "Hello, world!"}
        state={state}
        nodeRef={nodeRef}
        setState={setState}
      />
    </SwitchTransition>
  );
}

function MyItem(props: any) {
  const { state, nodeRef, setState, ...restProps } = props;
  return (
    <CSSTransition
      nodeRef={nodeRef}
      addEndListener={(done: any) =>
        nodeRef.current?.addEventListener("transitionend", done)
      }
      classNames="fade"
      {...restProps}
    >
      <Button
        ref={nodeRef}
        onClick={() => setState((state: any) => !state)}
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
  );
}
