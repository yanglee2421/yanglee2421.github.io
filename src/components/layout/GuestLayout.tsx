import { Outlet } from "react-router";
import React from "react";
import { Box, styled, useTheme } from "@mui/material";

export function Component() {
  return (
    <GuestLayout>
      <Outlet />
    </GuestLayout>
  );
}

const IMAGE_SIZE = 1024;
const ICON_SIZE = IMAGE_SIZE * 1 / 2;

function GuestLayout(props: React.PropsWithChildren) {
  const id = React.useId();
  const cvsRef = React.useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  React.useEffect(() => {
    const svg = document.getElementById(id);

    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image(ICON_SIZE, ICON_SIZE);
    img.src = url;
    img.onload = () => {
      URL.revokeObjectURL(url);

      const cvs = cvsRef.current;

      if (!cvs) return;

      const ctx = cvs.getContext("2d");

      if (!ctx) return;

      cvs.width = IMAGE_SIZE;
      cvs.height = IMAGE_SIZE;
      ctx.fillStyle = theme.palette.primary.main;
      ctx.fillRect(0, 0, IMAGE_SIZE, IMAGE_SIZE);
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
  }, [id, theme.palette.primary.main]);

  return (
    <>
      <Aside>
        <Logo
          id={id}
          width={ICON_SIZE}
          height={ICON_SIZE}
          bgcolor={theme.palette.primary.main}
          display={"none"}
        />
        <Box
          display={"flex"}
          border="1px red dash"
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
        >
          <canvas ref={cvsRef} width={IMAGE_SIZE} height={IMAGE_SIZE}></canvas>
        </Box>
        <button
          onClick={() => {
            const link = document.createElement("a");
            link.download = "icon.png";
            link.href = cvsRef.current?.toDataURL("image/png", 1) || "";
            link.click();
            link.remove();
          }}
        >
          export
        </button>
      </Aside>
      <Main>{props.children}</Main>
    </>
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

function Logo(props: React.SVGProps<SVGSVGElement> & { bgcolor: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx="12" cy="12" r="12" fill={props.bgcolor} />
      <circle cx="12" cy="12" r="1" fill="#FFFFFF" />
      <ellipse
        cx="12"
        cy="12"
        rx="4"
        ry="10"
        stroke="#FFFFFF"
        strokeWidth="2"
        fill="none"
        transform="rotate(45 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="4"
        ry="10"
        stroke="#FFFFFF"
        strokeWidth="2"
        fill="none"
        transform="rotate(-45 12 12)"
      />
    </svg>
  );
}
