// Transition Imports
import { SwitchTransition, Transition } from "react-transition-group";

// React Imports
import React from "react";

// MUI Imports
import { Stack, Switch, Card, CardHeader, CardContent } from "@mui/material";

export function SwitchHidden() {
  const [show, setShow] = React.useState(false);

  return (
    <Stack>
      <Switch
        checked={show}
        onChange={(evt, checked) => {
          void evt;
          setShow(checked);
        }}
      ></Switch>
      <SwitchTransition>
        {show ? <CardOne></CardOne> : <CardTwo></CardTwo>}
      </SwitchTransition>
    </Stack>
  );
}

function CardOne(props: React.PropsWithChildren) {
  // ** Props
  const { ...restProps } = props;

  const nodeRef = React.useRef(null);

  return (
    <Transition
      addEndListener={(node, done) => {
        node.addEventListener("transitionend", done);
      }}
      {...restProps}
    >
      {(status) => {
        return (
          <Card
            ref={nodeRef}
            sx={(theme) => {
              switch (status) {
                case "entering":
                  return {
                    transition: theme.transitions.create([
                      "opacity",
                      "transform",
                    ]),
                    opacity: 1,
                    // transform: "translateX(0%)",
                  };

                case "entered":
                  return {
                    opacity: 1,
                  };

                case "exiting":
                  return {
                    transition: theme.transitions.create([
                      "opacity",
                      "transform",
                    ]),
                    opacity: 0,
                    // transform: "translateX(-100%)",
                  };

                case "exited":
                  return {
                    opacity: 0,
                    // transform: "translateX(-100%)",
                  };

                default:
                  return {};
              }
            }}
          >
            <CardHeader title="Card one"></CardHeader>
            <CardContent></CardContent>
          </Card>
        );
      }}
    </Transition>
  );
}

function CardTwo(props: React.PropsWithChildren) {
  // ** Props
  const { ...restProps } = props;

  const nodeRef = React.useRef(null);

  return (
    <Transition
      addEndListener={(node, done) => {
        node.addEventListener("transitionend", done);
      }}
      {...restProps}
    >
      {(status) => {
        return (
          <Card
            ref={nodeRef}
            sx={(theme) => {
              switch (status) {
                case "entering":
                  return {
                    transition: theme.transitions.create([
                      "opacity",
                      "transform",
                    ]),
                    opacity: 1,
                    // transform: "translateX(0%)",
                  };

                case "entered":
                  return {
                    opacity: 1,
                    // transform: "translateX(0%)",
                  };

                case "exiting":
                  return {
                    transition: theme.transitions.create([
                      "opacity",
                      "transform",
                    ]),
                    opacity: 0,
                    // transform: "translateX(-100%)",
                  };

                case "exited":
                  return {
                    opacity: 0,
                    // transform: "translateX(-100%)",
                  };

                default:
                  return {};
              }
            }}
          >
            <CardHeader title="Card two"></CardHeader>
            <CardContent></CardContent>
          </Card>
        );
      }}
    </Transition>
  );
}
