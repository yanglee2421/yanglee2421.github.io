import { Outlet } from "react-router-dom";
import { GuestGuard } from "../guard/GuestGuard";
import React from "react";
import { styled } from "@mui/material";
import { Logo } from "../svg/Logo";

export function Component() {
  return (
    <GuestLayout>
      <Outlet />
    </GuestLayout>
  );
}

const IMAGE_SIZE = 128;
const ICON_SIZE = IMAGE_SIZE / 8;

function GuestLayout(props: React.PropsWithChildren) {
  const id = React.useId();
  const cvsRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const svg = document.getElementById(id);

    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.src = url;
    img.width = ICON_SIZE;
    img.height = ICON_SIZE;
    img.onload = () => {
      URL.revokeObjectURL(url);

      const cvs = cvsRef.current;

      if (!cvs) return;

      const ctx = cvs.getContext("2d");

      if (!ctx) return;

      cvs.width = IMAGE_SIZE;
      cvs.height = IMAGE_SIZE;
      ctx.drawImage(
        img,
        0,
        0,
        IMAGE_SIZE,
        IMAGE_SIZE,
        IMAGE_SIZE / 2 - ICON_SIZE / 2,
        IMAGE_SIZE / 2 - ICON_SIZE / 2,
        IMAGE_SIZE,
        IMAGE_SIZE,
      );

      img.remove();
    };
    document.body.append(img);
  }, [id]);

  return (
    <GuestGuard>
      <Aside>
        <Logo
          id={id}
          width={ICON_SIZE}
          height={ICON_SIZE}
        />
        <canvas ref={cvsRef} width={IMAGE_SIZE} height={IMAGE_SIZE}></canvas>
      </Aside>
      <Main>{props.children}</Main>
    </GuestGuard>
  );
}

const MAIN_SIZE = 120;

const Aside = styled("aside")(({ theme }) => ({
  position: "fixed",
  zIndex: theme.zIndex.appBar - 1,
  inset: 0,

  inlineSize: "100dvw",
  blockSize: "100dvh",

  [theme.breakpoints.up("sm")]: {
    paddingInlineEnd: theme.spacing(MAIN_SIZE),
  },
}));

const Main = styled("main")(({ theme }) => ({
  position: "fixed",
  zIndex: theme.zIndex.appBar,
  insetInlineEnd: 0,
  insetBlock: 0,

  inlineSize: "100dvw",
  blockSize: "100dvh",

  backgroundColor: theme.palette.background.default,

  [theme.breakpoints.up("sm")]: {
    maxInlineSize: theme.spacing(MAIN_SIZE),

    borderInlineStart: `1px solid ${theme.palette.divider}`,
  },
}));
