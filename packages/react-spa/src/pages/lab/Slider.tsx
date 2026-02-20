import React from "react";
import { clamp, devLog } from "@/lib/utils";
import { alpha, styled } from "@mui/material";
import { useResizeObserver } from "@/hooks/dom/useResizeObserver";

const Track = styled("div")(({ theme: t }) => ({
  position: "relative",
  height: 4,
  touchAction: "none ",
  borderRadius: t.shape.borderRadius,
  backgroundColor: alpha(t.palette.common.white, t.palette.action.hoverOpacity),
}));

const Thumb = styled("div")(({ theme: t }) => ({
  position: "absolute",
  top: "50%",
  translate: "0 -50%",
  inlineSize: t.spacing(2),
  blockSize: t.spacing(2),
  cursor: "pointer",
  borderRadius: 99999,
  backgroundColor: t.palette.primary.main,

  display: "flex",
}));

const Dot = styled("input")(() => ({
  inlineSize: "100%",
  blockSize: "100%",

  appearance: "none",
  clipPath: "rect(0px 0px 0px 0px)",
  overflow: "hidden",
  whiteSpace: "nowrap",

  padding: 0,
  margin: -1,

  backgroundColor: "transparent",

  position: "absolute",
}));

const { inlineSize } = useResizeObserver;

export const Slider = () => {
  const [value, setValue] = React.useState(0);

  const startClientXRef = React.useRef(0);
  const startTranslateXRef = React.useRef(0);
  const dotRef = React.useRef<HTMLInputElement>(null);
  const animationIdRef = React.useRef(0);

  const [trackRef, trackEntry] = useResizeObserver<HTMLDivElement>();
  const [thumbRef, thumbEntry] = useResizeObserver<HTMLDivElement>();

  const trackWidth = inlineSize(trackEntry?.borderBoxSize);
  const thumbWidth = inlineSize(thumbEntry?.borderBoxSize);
  const scrollableWidth = trackWidth - thumbWidth;
  const translateX = scrollableWidth * value;

  return (
    <Track ref={trackRef}>
      <Thumb
        ref={thumbRef}
        onPointerDown={(evt) => {
          if (!evt.nativeEvent.isPrimary) return;
          evt.currentTarget.setPointerCapture(evt.pointerId);

          startClientXRef.current = evt.clientX;
          startTranslateXRef.current = translateX;
          dotRef.current?.focus();
        }}
        onPointerMove={(evt) => {
          const hasPointerCapture = evt.currentTarget.hasPointerCapture(
            evt.pointerId,
          );
          if (!hasPointerCapture) return;

          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = requestAnimationFrame(() => {
            React.startTransition(() => {
              setValue(() => {
                const translationX = evt.clientX - startClientXRef.current;

                return clamp(
                  (startTranslateXRef.current + translationX) / scrollableWidth,
                  0,
                  1,
                );
              });
            });

            dotRef.current?.focus();
          });
        }}
        onPointerUp={(evt) => {
          evt.currentTarget.releasePointerCapture(evt.pointerId);
        }}
        sx={{
          transform: `translate3d(${translateX}px, 0, 0)`,
        }}
      >
        <Dot
          ref={dotRef}
          type="range"
          tabIndex={0}
          value={value}
          onChange={(e) => {
            devLog(true, e.target.value);
            dotRef.current?.focus();
          }}
        />
      </Thumb>
    </Track>
  );
};
