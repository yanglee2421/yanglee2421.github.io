import React from "react";
import { AnimateController } from "@/libs/AnimateController";
import { timeout } from "@/utils/timeout";

export function RollCard() {
  const [number, setNumber] = React.useState(0);
  const [rolling, setRolling] = React.useState(false);

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h1">{number}</Typography>
      <Button
        onClick={async () => {
          const controller = new AnimateController(() => {
            React.startTransition(() => {
              setNumber(Math.ceil(Math.random() * 100));
            });
          });

          controller.play();
          setRolling(true);
          await timeout(1000);
          controller.abort();
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
