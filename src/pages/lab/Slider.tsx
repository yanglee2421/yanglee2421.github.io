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
  inlineSize: t.spacing(5),
  blockSize: t.spacing(5),
  cursor: "pointer",
  borderRadius: 99999,
  backgroundColor: t.palette.primary.main,
}));

const Dot = styled("div")(({ theme: t }) => ({
  backgroundColor: t.palette.primary.contrastText,

  inlineSize: 10,
  blockSize: 10,
  borderRadius: 99999,

  position: "absolute",
  insetInline: "50%",
  insetBlock: "50%",
  translate: "-50% -50%",
}));

export const Slider = () => {
  const [translateX, setTranslateX] = React.useState(0);

  const startClientXRef = React.useRef(0);
  const startTranslateXRef = React.useRef(0);

  return (
    <Track>
      <Thumb
        onPointerDown={(evt) => {
          if (!evt.nativeEvent.isPrimary) return;
          evt.currentTarget.setPointerCapture(evt.pointerId);

          const currentRect = evt.currentTarget.getBoundingClientRect();
          const parentRect =
            evt.currentTarget.parentElement!.getBoundingClientRect();

          startClientXRef.current = evt.clientX;
          startTranslateXRef.current = currentRect.left - parentRect.left;
        }}
        onPointerMove={(evt) => {
          const hasPointerCapture = evt.currentTarget.hasPointerCapture(
            evt.pointerId,
          );
          if (!hasPointerCapture) return;

          const currentRect = evt.currentTarget.getBoundingClientRect();
          const parentRect =
            evt.currentTarget.parentElement!.getBoundingClientRect();

          const translationX = evt.clientX - startClientXRef.current;
          const scrollableWidth = parentRect.width - currentRect.width;

          setTranslateX(() =>
            minmax(startTranslateXRef.current + translationX, {
              min: 0,
              max: scrollableWidth,
            }),
          );
        }}
        onPointerUp={(evt) => {
          evt.currentTarget.releasePointerCapture(evt.pointerId);
        }}
        sx={{
          transform: `translate3d(${translateX}px, 0, 0)`,
        }}
      >
        <Dot />
      </Thumb>
    </Track>
  );
};
