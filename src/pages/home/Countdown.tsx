import React from "react";

export function Countdown() {
  const [second, setSecond] = React.useState(100);

  return (
    <div>
      <p>{`${Math.round(second)}s`}</p>

      <button
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
      >
        start
      </button>
      <button
        onClick={() => {
          setSecond(100);
        }}
      >
        restore
      </button>
    </div>
  );
}
