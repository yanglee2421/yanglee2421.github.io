import { Button } from "@/components/ui/button";
import React from "react";

export function Countdown() {
  const [second, setSecond] = React.useState(100);

  return (
    <div className="space-y-3 rounded border px-5 py-2">
      <p className="font-5xl text-5xl font-light">{`${Math.round(second)}s`}</p>

      <div className="flex gap-3">
        <Button
          onClick={() => {
            let prevTime = performance.now();
            let animateId = 0;
            const startTime = prevTime;
            const startSecond = second;

            const play = () => {
              animateId = requestAnimationFrame(play);

              const currentTime = performance.now();

              if (currentTime - prevTime < 1000) {
                return;
              }

              prevTime = currentTime;
              const nextSecond = Math.max(
                0,
                startSecond - Math.round((currentTime - startTime) / 1000),
              );

              if (!nextSecond) {
                cancelAnimationFrame(animateId);
              }

              React.startTransition(() => {
                setSecond(nextSecond);
              });
            };

            play();
          }}
          className="uppercase"
        >
          start
        </Button>
        <Button
          onClick={() => {
            setSecond(100);
          }}
          variant={"outline"}
          className="uppercase"
        >
          restore
        </Button>
      </div>
    </div>
  );
}
