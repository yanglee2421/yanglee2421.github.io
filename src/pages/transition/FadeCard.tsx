// Transition Imports
import { SwitchTransition } from "react-transition-group";

// React Imports
import React from "react";

// MUI Imports
import { Switch, Card, CardHeader, CardContent } from "@mui/material";

// Components Imports
import { FadeTransition } from "@/components/ui";

export function FadeCard() {
  const [show, setShow] = React.useState(false);

  return (
    <Card>
      <CardHeader
        title="Fade card"
        subheader="Transition"
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
          <FadeTransition key={show ? 1 : 2}>
            {show ? (
              <Card>
                <CardHeader
                  title="Title one"
                  subheader="subheader one"
                ></CardHeader>
                <CardContent></CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader
                  title="Title two"
                  subheader="subheader two"
                ></CardHeader>
                <CardContent></CardContent>
              </Card>
            )}
          </FadeTransition>
        </SwitchTransition>
      </CardContent>
    </Card>
  );
}
