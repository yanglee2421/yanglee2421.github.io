import React from "react";

export function Lab(props: { p: number }) {
  return React.use(keyToPromise(props.p));
}

const memoMap = new Map<number, Promise<number>>();

const keyToPromise = (key: number) => {
  const cache = memoMap.get(key);

  if (cache) {
    return cache;
  }

  const newP = new Promise<number>((resolve) => {
    setTimeout(() => {
      console.log(new Date().toLocaleTimeString());

      resolve(key);
    }, 1000 * 3);
  });

  memoMap.set(key, newP);

  return newP;
};
