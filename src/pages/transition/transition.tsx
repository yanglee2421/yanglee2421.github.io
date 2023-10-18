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

export function TransitionPage() {
  const [show, setShow] = React.useState(false);
  const nodeRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <Switch
        checked={show}
        onChange={(evt, checked) => {
          void evt;
          setShow(checked);
        }}
      />
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
                backfaceVisibility: "hidden",
                ...statusMap.get(state),
              }}
              border="1px red dashed"
              width={300}
              height={300}
              marginTop={3}
              overflow={"hidden"}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur quod debitis rem omnis quia temporibus sapiente atque
              doloribus, ullam aliquid totam. Id consequuntur rerum voluptate
              similique ea sed maiores optio!
              <Box position={"absolute"}>back</Box>
            </Box>
          );
        }}
      </Transition>
    </>
  );
}
