import { Outlet } from "react-router-dom";
import { GuestGuard } from "../guard/GuestGuard";
import React from "react";
import { styled } from "@mui/material";
import reactLogo from "@/assets/react.svg";
import viteLogo from "@/assets/vite.svg";

const react_url = new URL(reactLogo, import.meta.url).href;
const vite_url = new URL(viteLogo, import.meta.url).href;

export function Component() {
  return (
    <GuestLayout>
      <Outlet />
    </GuestLayout>
  );
}

function GuestLayout(props: React.PropsWithChildren) {
  return (
    <GuestGuard>
      <Aside>
        <img src={react_url} />
        <img src={vite_url} />
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
