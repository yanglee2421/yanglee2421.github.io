import { Button, Grid } from "@mui/material";
import React from "react";

export function EightPanel() {
  const [numberA, setNumberA] = React.useState(0);
  const [numberB, setNumberB] = React.useState(0);

  console.log("render");

  const memoNode = React.useMemo(() => {
    return <SlowRender>{numberB}</SlowRender>;
  }, [numberB]);

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Button
            onClick={() => {
              console.log("1");

              setNumberA((p) => {
                console.log("2");
                return p + 1;
              });
              setNumberB((p) => p + 1);

              console.log("3");
            }}
          >
            not transition
          </Button>
          <Button
            onClick={() => {
              console.log("1");

              setNumberA((p) => {
                console.log("2");
                return p + 1;
              });

              React.startTransition(() => {
                setNumberB((p) => p + 1);
              });

              console.log("3");
            }}
          >
            transition
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          {numberA}
        </Grid>
        <Grid item xs={12} sm={6}>
          {memoNode}
        </Grid>
      </Grid>
    </>
  );
}

function SlowRender(props: React.PropsWithChildren) {
  const begin = Date.now();

  console.log("render slow");

  while (true) {
    if (Date.now() - begin > 1000) {
      break;
    }
  }

  return <>{props.children}</>;
}
