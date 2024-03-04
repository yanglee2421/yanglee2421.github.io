import { Card, CardHeader, CardContent, Switch, Button } from "@mui/material";
import React from "react";
import { SwitchTransition } from "react-transition-group";

import { FadeCssTransition } from "@/components/ui/FadeCssTransition";

export function FadeButton() {
  const [state, setState] = React.useState(false);

  return (
    <Card>
      <CardHeader
        title="Fade button"
        subheader="CSS Transition"
        action={
          <Switch
            checked={state}
            onChange={(evt, checked) => {
              void evt;
              setState(checked);
            }}
          ></Switch>
        }
      ></CardHeader>
      <CardContent>
        <SwitchTransition>
          <FadeCssTransition key={state ? 1 : 2}>
            <Button
              onClick={() => {
                setState((p) => !p);
              }}
              variant="contained"
            >
              {state ? "Goodbye, world!" : "Hello, world!"}
            </Button>
          </FadeCssTransition>
        </SwitchTransition>
      </CardContent>
    </Card>
  );
}
