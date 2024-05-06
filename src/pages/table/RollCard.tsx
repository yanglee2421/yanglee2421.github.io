import { Paper, Typography, Button } from "@mui/material";
import React from "react";
import { AnimateController } from "@/libs/AnimateController";
import { timeout } from "@/utils/timeout";

export function RollCard() {
  const [number, setNumber] = React.useState(0);
  const [rolling, setRolling] = React.useState(false);
  const rollRef = React.useRef(
    new AnimateController(() => {
      React.startTransition(() => {
        setNumber(Math.floor(Math.random() * 100) + 1);
      });
    }),
  );

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h1">{number}</Typography>
      <Button
        onClick={async () => {
          rollRef.current.play();
          setRolling(true);
          await timeout(1000);
          rollRef.current.abort();
          setRolling(false);
        }}
        disabled={rolling}
        variant="contained"
      >
        roll
      </Button>
    </Paper>
  );
}
