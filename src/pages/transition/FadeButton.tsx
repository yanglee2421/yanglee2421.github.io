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
      classNames="fade"
      {...restProps}
    >
      <Button
        ref={nodeRef}
        onClick={() => setState((state) => !state)}
        variant="contained"
        sx={(theme) => {
          return {
            "&.fade-enter": {
              opacity: 0,
            },
            "&.fade-enter-active": {
              opacity: 1,
              transition: theme.transitions.create("opacity"),
            },
            "&.fade-exit": {
              opacity: 1,
            },
            "&.fade-exit-active": {
              opacity: 0,
              transition: theme.transitions.create("opacity"),
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
