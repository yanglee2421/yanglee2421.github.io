// Transition Imports
import { Transition, TransitionStatus } from "react-transition-group";

// React Imports
import React from "react";

// MUI Imports
import { Box, Switch, SxProps } from "@mui/material";

const statusMap = new Map<TransitionStatus, SxProps>();
statusMap.set("entering", {
  transition: "ease-in-out .3s",
  //   transform: "translate(0)",
  transform: "rotateY(0)",
});
statusMap.set("entered", {
  //   transform: "translate(0)",
  transform: "rotateY(0)",
});
statusMap.set("exiting", {
  transition: "ease-in-out .3s",
  //   transform: "translate(-100%)",
  transform: "rotateY(180deg)",
});
statusMap.set("exited", {
  //   transform: "translate(-100%)",
  transform: "rotateY(180deg)",
});

const backMap = new Map<TransitionStatus, SxProps>();
backMap.set("entering", {
  transition: "ease-in-out .3s",
  //   transform: "translate(0)",
  transform: "rotateY(0)",
});
backMap.set("entered", {
  //   transform: "translate(0)",
  transform: "rotateY(0)",
});
backMap.set("exiting", {
  transition: "ease-in-out .3s",
  //   transform: "translate(-100%)",
  transform: "rotateY(-180deg)",
});
backMap.set("exited", {
  //   transform: "translate(-100%)",
  transform: "rotateY(-180deg)",
});

export function TransitionPage() {
  const [show, setShow] = React.useState(false);
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const backRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <Switch
        checked={show}
        onChange={(evt, checked) => {
          void evt;
          setShow(checked);
        }}
      />
      <Box
        position={"relative"}
        overflow={"hidden"}
        border="1px red dashed"
        width={300}
        height={300}
        marginTop={3}
        textAlign={"center"}
      >
        <Transition
          nodeRef={nodeRef}
          addEndListener={(done) => {
            nodeRef.current?.addEventListener("transitionend", done);
          }}
          in={show}
        >
          {(state) => {
            console.log(state);
            return (
              <Box
                ref={nodeRef}
                sx={{
                  inset: 0,
                  backfaceVisibility: "hidden",
                  ...statusMap.get(state),
                }}
                position={"absolute"}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur quod debitis rem omnis quia temporibus sapiente atque
                doloribus, ullam aliquid totam. Id consequuntur rerum voluptate
                similique ea sed maiores optio!
              </Box>
            );
          }}
        </Transition>
        <Transition
          nodeRef={backRef}
          addEndListener={(done) => {
            backRef.current?.addEventListener("transitionend", done);
          }}
          in={!show}
        >
          {(status) => {
            return (
              <Box
                ref={backRef}
                position={"absolute"}
                sx={{
                  inset: 0,
                  backfaceVisibility: "hidden",
                  transform: "rotateY(-180deg)",
                  ...backMap.get(status),
                }}
              >
                back
              </Box>
            );
          }}
        </Transition>
      </Box>
    </>
  );
}
