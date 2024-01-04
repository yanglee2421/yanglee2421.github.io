// Transition Imports
import { SwitchTransition, Transition } from "react-transition-group";

// React Imports
import React from "react";

// MUI Imports
import { Switch, Card, CardHeader, CardContent } from "@mui/material";

export function FadeCard() {
  const [show, setShow] = React.useState(false);

  return (
    <Card>
      <CardHeader
        title="Fade card"
        action={
          <Switch
            checked={show}
            onChange={(evt, checked) => {
              void evt;
              setShow(checked);
            }}
          ></Switch>
        }
      ></CardHeader>
      <CardContent>
        <SwitchTransition>
          {show ? (
            <CardOne key="1">Card one</CardOne>
          ) : (
            <CardOne key="2">Card two</CardOne>
          )}
        </SwitchTransition>
      </CardContent>
    </Card>
  );
}

function CardOne(props: React.PropsWithChildren) {
  // ** Props
  const { children, ...restProps } = props;

  const nodeRef = React.useRef<HTMLDivElement>(null);

  return (
    <Transition
      nodeRef={nodeRef}
      addEndListener={(done) => {
        nodeRef.current?.addEventListener("transitionend", done);
      }}
      unmountOnExit
      {...restProps}
    >
      {(status) => {
        return (
          <Card
            ref={nodeRef}
            sx={(theme) => {
              switch (status) {
                // Exit stage
                case "entered":
                  return {
                    opacity: 1,
                    transform: "scale(1)",
                  };

                case "exiting":
                  return {
                    transition: theme.transitions.create([
                      "opacity",
                      "transform",
                    ]),
                    opacity: 0,
                    transform: "scale(0.9)",
                  };

                // Enter stage
                case "exited":
                  return {
                    opacity: 0,
                    transform: "scale(1.1)",
                  };

                case "entering":
                  return {
                    transition: theme.transitions.create([
                      "opacity",
                      "transform",
                    ]),
                    opacity: 1,
                    transform: "scale(1)",
                  };

                case "unmounted":
                default:
                  return {};
              }
            }}
          >
            <CardHeader title="Card transition"></CardHeader>
            <CardContent>{children}</CardContent>
          </Card>
        );
      }}
    </Transition>
  );
}
