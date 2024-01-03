// Transition Imports
import { CSSTransition, SwitchTransition } from "react-transition-group";

// React Imports
import React from "react";

// MUI Imports
import { Button, Card, CardHeader, CardContent } from "@mui/material";

export function FadeButton() {
  const [state, setState] = React.useState(false);

  return (
    <Card>
      <CardHeader title="Fade button"></CardHeader>
      <CardContent>
        <SwitchTransition>
          {state ? (
            <MyItem key={1} setState={setState}>
              Goodbye, world!
            </MyItem>
          ) : (
            <MyItem key={2} setState={setState}>
              Hello, world!
            </MyItem>
          )}
        </SwitchTransition>
      </CardContent>
    </Card>
  );
}

function MyItem(props: MyItemProps) {
  const { setState, children, ...restProps } = props;

  const nodeRef = React.useRef<HTMLButtonElement>(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      addEndListener={(done) =>
        nodeRef.current?.addEventListener("transitionend", done)
      }
      unmountOnExit
      classNames="fade"
      {...restProps}
    >
      <Button
        ref={nodeRef}
        onClick={() => setState((state) => !state)}
        variant="contained"
        sx={(theme) => {
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
        }}
      >
        {children}
      </Button>
    </CSSTransition>
  );
}

interface MyItemProps {
  children: React.ReactNode;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}
