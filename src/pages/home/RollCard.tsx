import React from "react";
import { AnimateController } from "@/libs/AnimateController";
import { timeout } from "@/utils/timeout";
import { Button } from "@/components/ui/button";

export function RollCard() {
  const [number, setNumber] = React.useState(0);
  const [rolling, setRolling] = React.useState(false);

  return (
    <div className="space-y-3 rounded border px-5 py-2">
      <p className="text-5xl font-light">{number}</p>
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
        className="btn-indigo uppercase"
      >
        roll
      </Button>
    </div>
  );
}
