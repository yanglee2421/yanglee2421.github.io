import React from "react";

const calculateIsHTMLEl = (el: unknown): el is HTMLElement => {
  return el instanceof HTMLElement;
};

export const useResizeObserver = <TEl>() => {
  const [entry, setEntry] = React.useState<ResizeObserverEntry | null>(null);

  const ref = React.useRef<TEl>(null);

  React.useEffect(() => {
    const el = ref.current;
    const isHTMLEl = calculateIsHTMLEl(el);
    if (!isHTMLEl) return;

    let animationId = 0;

    const observer = new ResizeObserver((entries) => {
      cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(() => {
        const entry = entries.at(0) || null;
        setEntry(entry);
      });
    });
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  return [ref, entry] as const;
};

const calculateInlineSize = (sizes?: readonly ResizeObserverSize[]) => {
  return sizes?.at(0)?.inlineSize || 0;
};

const calculateBlockSize = (sizes?: readonly ResizeObserverSize[]) => {
  return sizes?.at(0)?.blockSize || 0;
};

useResizeObserver.inlineSize = calculateInlineSize;
useResizeObserver.blockSize = calculateBlockSize;
