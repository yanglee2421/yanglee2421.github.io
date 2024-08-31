import React from "react";

export function Component() {
  return (
    <React.Suspense fallback={<span>suspenseing</span>}>
      <Lab p={1} />
      <Lab p={2} />
    </React.Suspense>
  );
}

function Lab(props: { p: number }) {
  const timer = React.use(
    (() => {
      const cache = memoMap.get(props.p);

      if (cache) {
        return cache;
      }

      const newP = new Promise<number>((resolve) => {
        setTimeout(() => {
          console.log(new Date().toLocaleTimeString());

          resolve(props.p);
        }, 1000 * 3);
      });

      memoMap.set(props.p, newP);

      return newP;
    })(),
  );

  return timer;
}

const memoMap = new Map<number, Promise<number>>();
