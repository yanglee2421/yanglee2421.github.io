import React from "react";
import { minmax } from "@/lib/utils";
import { alpha, styled } from "@mui/material";

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

const useResizeObserver = () => {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLDivElement>(null);
  const scrollableWidthRef = React.useRef(0);

  const updateScrollableWidth = React.useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const thumb = thumbRef.current;
    if (!thumb) return;

    const trackRect = track.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();

    scrollableWidthRef.current = trackRect.width - thumbRect.width;
  }, []);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const thumb = thumbRef.current;
    if (!thumb) return;

    let raf = 0;
    const observer = new ResizeObserver(() => {
      /**
       * Performance optimization:
       * Separate the reading and writing of layout information by requestAnimationFrame
       * to avoid Forced Reflow / Forced Layout
       */
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateScrollableWidth);
    });
    observer.observe(track);
    observer.observe(thumb);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [updateScrollableWidth]);

  return [trackRef, thumbRef, scrollableWidthRef] as const;
};

export const Slider = () => {
  const [translateX, setTranslateX] = React.useState(0);

  const startClientXRef = React.useRef(0);
  const startTranslateXRef = React.useRef(0);
  const dotRef = React.useRef<HTMLInputElement>(null);

  const [trackRef, thumbRef, scrollableWidthRef] = useResizeObserver();

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

          const translationX = evt.clientX - startClientXRef.current;
          const scrollableWidth = scrollableWidthRef.current;

          setTranslateX(() =>
            minmax(startTranslateXRef.current + translationX, {
              min: 0,
              max: scrollableWidth,
            }),
          );
          dotRef.current?.focus();
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
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            const scrollableWidth = scrollableWidthRef.current;
            const newTranslateX = minmax((value / 100) * scrollableWidth, {
              min: 0,
              max: scrollableWidth,
            });

            setTranslateX(newTranslateX);
            dotRef.current?.focus();
          }}
        />
      </Thumb>
    </Track>
  );
};
