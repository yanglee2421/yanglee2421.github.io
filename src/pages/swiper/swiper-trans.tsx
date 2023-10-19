// Transition Imports
import {
  TransitionGroup,
  CSSTransition,
  SwitchTransition,
} from "react-transition-group";

// React Imports
import React from "react";

// MUI Imports
import { Box, Divider, IconButton } from "@mui/material";
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";

export function SwiperTrans() {
  const [count, setCount] = React.useState(0);
  const nodeRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <TransitionGroup>
        <CSSTransition
          key={count}
          nodeRef={nodeRef}
          //   addEndListener={(done) => {
          //     nodeRef.current?.addEventListener("transitionend", done);
          //   }}
          timeout={500}
          classNames={"slide"}
          unmountOnExit
        >
          <Box
            ref={nodeRef}
            height={200}
            width={300}
            border={"1px red solid"}
            sx={{
              transition: ".5s",
              "&.slide-enter-active": {
                transform: "translateX(-100%)",
              },
              "&.slide-exit-active": {
                transform: "translateX(0)",
              },
              //   "&.slide-enter-done": {
              //     transform: "translate(0)",
              //   },
              "&.slide-enter": {
                transform: "translateX(0)",
              },
              "&.slide-exit": {
                transform: "translateX(100%)",
              },
              //   "&.slide-exit-done": {
              //     transform: "translate(100%)",
              //   },
            }}
          >
            {count}
          </Box>
        </CSSTransition>
      </TransitionGroup>

      <Divider>divider:{count}</Divider>
      <IconButton onClick={() => setCount((p) => p - 1)}>
        <ArrowBackIosNewRounded />
      </IconButton>
      <IconButton onClick={() => setCount((p) => p + 1)}>
        <ArrowForwardIosRounded />
      </IconButton>
    </>
  );
}
