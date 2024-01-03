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
          {show ? <CardOne></CardOne> : <CardTwo></CardTwo>}
        </SwitchTransition>
      </CardContent>
    </Card>
  );
}

function CardOne(props: React.PropsWithChildren) {
  // ** Props
  const { ...restProps } = props;

  const nodeRef = React.useRef<HTMLDivElement>(null);

  return (
    <Transition
      nodeRef={nodeRef}
      addEndListener={(done) => {
        nodeRef.current?.addEventListener("transitionend", done);
      }}
      {...restProps}
    >
      {(status) => {
        return (
          <Card
            ref={nodeRef}
            sx={(theme) => {
              switch (status) {
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
                  };

                case "exited":
                  return {
                    opacity: 0,
                  };

                case "entering":
                  return {
                    transition: theme.transitions.create([
                      "opacity",
                      "transform",
                    ]),
                    opacity: 1,
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

  const nodeRef = React.useRef<HTMLDivElement>(null);

  return (
    <Transition
      nodeRef={nodeRef}
      addEndListener={(done) => {
        nodeRef.current?.addEventListener("transitionend", done);
      }}
      {...restProps}
    >
      {(status) => {
        return (
          <Card
            ref={nodeRef}
            sx={(theme) => {
              switch (status) {
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
                  };

                case "exited":
                  return {
                    opacity: 0,
                  };

                case "entering":
                  return {
                    transition: theme.transitions.create([
                      "opacity",
                      "transform",
                    ]),
                    opacity: 1,
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
