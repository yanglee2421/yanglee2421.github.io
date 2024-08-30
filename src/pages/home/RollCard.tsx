import React from "react";
import { AnimateController } from "@/libs/AnimateController";
import { timeout } from "@/utils/timeout";

export function RollCard() {
  const [number, setNumber] = React.useState(0);
  const [rolling, setRolling] = React.useState(false);

  return (
    <div>
      <p>{number}</p>
      <button
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
      >
        roll
      </button>
    </div>
  );
}
