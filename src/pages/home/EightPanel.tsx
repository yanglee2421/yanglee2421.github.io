import { Grid, TextField } from "@mui/material";
import React from "react";

export function EightPanel() {
  const [numberA, setNumberA] = React.useState("");
  const [numberB, setNumberB] = React.useState("");
  const deferredNumberA = React.useDeferredValue(numberA);
  const timer = React.useRef(0);

  console.log("render");

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TextField
            value={numberA}
            onChange={(evt) => {
              setNumberA(evt.target.value);
              setNumberB(evt.target.value);
            }}
            label="Not Transition"
          ></TextField>
          <TextField
            value={numberA}
            onChange={(evt) => {
              setNumberA(evt.target.value);
              React.startTransition(() => {
                setNumberB(evt.target.value);
              });
            }}
            label="Transition"
          ></TextField>
          <TextField
            value={numberA}
            onChange={(evt) => {
              setNumberA(evt.target.value);
            }}
            label="Deferred value"
          ></TextField>
          <TextField
            value={numberA}
            onChange={(evt) => {
              setNumberA(evt.target.value);

              cancelAnimationFrame(timer.current);
              timer.current = requestAnimationFrame(() => {
                setNumberB(evt.target.value);
              });
            }}
            label="Anti-shake"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          {numberA}
        </Grid>
        <Grid item xs={12} sm={6}>
          <MemoSlowRender>{numberB}</MemoSlowRender>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MemoSlowRender>{deferredNumberA}</MemoSlowRender>
        </Grid>
      </Grid>
    </>
  );
}

const MemoSlowRender = React.memo(SlowRender);

function SlowRender(props: React.PropsWithChildren) {
  const begin = Date.now();

  console.log("render slow");

  while (true) {
    if (Date.now() - begin > 300) {
      break;
    }
  }

  return <>{props.children}</>;
}
