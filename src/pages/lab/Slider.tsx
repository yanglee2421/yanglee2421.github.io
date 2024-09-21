import React from "react";
import { minmax } from "@/utils/minmax";

export function Slider() {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="relative h-2 touch-none rounded bg-slate-200">
      <div
        onPointerDown={(evt) => {
          evt.currentTarget.setPointerCapture(evt.pointerId);
        }}
        onPointerMove={(evt) => {
          if (!evt.currentTarget.hasPointerCapture(evt.pointerId)) {
            return;
          }

          const el = ref.current!;
          const elClientRect = el.getBoundingClientRect();

          evt.currentTarget.style.left =
            minmax(evt.clientX - elClientRect.left, {
              min: 0,
              max:
                elClientRect.width -
                evt.currentTarget.getBoundingClientRect().width,
            }) + "px";
        }}
        className="absolute top-1/2 size-5 -translate-y-1/2 cursor-pointer rounded-full bg-indigo-500 before:absolute before:start-1/2 before:top-1/2 before:block before:size-3 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white before:content-['']"
      ></div>
    </div>
  );
}
