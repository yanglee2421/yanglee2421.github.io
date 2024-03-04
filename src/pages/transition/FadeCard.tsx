import { Switch, Card, CardHeader, CardContent } from "@mui/material";
import React from "react";
import { SwitchTransition } from "react-transition-group";
import { FadeTransition } from "@/components/ui/FadeTransition";

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
