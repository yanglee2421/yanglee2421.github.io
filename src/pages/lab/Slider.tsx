import React from "react";
import { minmax } from "@/utils/minmax";

export function Slider() {
  const downRef = React.useRef(false);
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="relative h-2 rounded bg-slate-200">
      <div
        onPointerDown={(evt) => {
          if (evt.currentTarget.hasPointerCapture(evt.pointerId)) {
            return;
          }

          evt.currentTarget.setPointerCapture(evt.pointerId);
          downRef.current = true;
        }}
        onPointerMove={(evt) => {
          if (!downRef.current) {
            return;
          }

          const el = ref.current!;

          evt.currentTarget.style.left =
            minmax(evt.clientX - el.getBoundingClientRect().left, {
              min: 0,
              max:
                el.getBoundingClientRect().width -
                evt.currentTarget.getBoundingClientRect().width,
            }) + "px";
        }}
        onPointerUp={(evt) => {
          evt.currentTarget.releasePointerCapture(evt.pointerId);
          downRef.current = false;
        }}
        className="absolute top-1/2 size-5 -translate-y-1/2 cursor-pointer rounded-full bg-indigo-500 before:absolute before:start-1/2 before:top-1/2 before:block before:size-3 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white before:content-['']"
      ></div>
    </div>
  );
}
