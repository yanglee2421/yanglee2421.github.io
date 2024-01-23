// React Imports
import React from "react";

// Utils Imports
import { useImmer } from "use-immer";

export function useResize(ref: React.RefObject<HTMLElement>) {
  const [size, updateSize] = useImmer({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    const el = ref.current;

    if (el instanceof HTMLElement) {
      const observer = new ResizeObserver(([{ contentBoxSize }]) => {
        updateSize((prev) => {
          const [size] = contentBoxSize;
          prev.width = size.inlineSize;
          prev.height = size.blockSize;
        });
      });
      observer.observe(el);

      return () => {
        observer.unobserve(el);
        observer.disconnect();
      };
    }
  }, [updateSize]);

  return size;
}
