import React from "react";
import { minmax } from "@/utils/minmax";
import { styled, alpha } from "@mui/material";

export function Slider() {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <Track ref={ref}>
      <Thumb
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
      >
        <Dot />
      </Thumb>
    </Track>
  );
}

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
