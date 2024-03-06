import { Box, Grid } from "@mui/material";
import React from "react";
import { Transition } from "react-transition-group";

export function RightImage() {
  const [show, setShow] = React.useState(false);
  const tumbElRef = React.useRef<HTMLDivElement>(null);
  const nodeRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (tumbElRef.current instanceof HTMLElement) {
      const observer = new IntersectionObserver(([entry], observer) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.unobserve(entry.target);
        }
      });
      observer.observe(tumbElRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Box
          display={"grid"}
          gridTemplateColumns={"140px 62px 340px"}
          gridTemplateRows={"auto auto 1fr"}
          gridAutoFlow={"column"}
          height={480}
          marginTop={"192px"}
        >
          <Box
            ref={tumbElRef}
            gridColumn={"span 1/span 1"}
            gridRow={"1/-1"}
            borderRight="1px solid currentColor"
          />
          <Box />
          <Box>
            <Transition
              in={show}
              nodeRef={nodeRef}
              addEndListener={(done) => {
                nodeRef.current?.addEventListener("transitionend", done);
              }}
              unmountOnExit
            >
              {(status) => {
                return (
                  <Box
                    ref={nodeRef}
                    height={"100%"}
                    borderLeft={"2px solid currentColor"}
                    sx={(theme) => {
                      switch (status) {
                        // Enter stage
                        case "exited":
                          return {
                            transform: `translateY(100%)`,
                          };
                        case "entering":
                          return {
                            transform: `translateY(0)`,
                            transition: theme.transitions.create("transform", {
                              duration: 1000,
                            }),
                          };

                        // Exit stage
                        case "entered":
                          return {
                            transform: `translateY(0)`,
                            transition: theme.transitions.create("transform", {
                              duration: 1000,
                            }),
                          };
                        case "exiting":
                          return {
                            transform: `translateY(100%)`,
                            transition: theme.transitions.create("transform", {
                              duration: 1000,
                            }),
                          };

                        case "unmounted":
                        default:
                          return {};
                      }
                    }}
                  />
                );
              }}
            </Transition>
          </Box>
          <Box />
          <Box marginBottom={12} fontSize={14}>
            vision
          </Box>
          <Box
            fontSize={"24px"}
            letterSpacing={"0.08em"}
            lineHeight={"1.8em"}
            marginBottom={"10px"}
          >
            We’re Changing the Way the World Thinks About Cars
          </Box>
          <Box alignSelf={"flex-end"}>
            <Box lineHeight={"1.8em"} letterSpacing={"0.04em"}>
              I'm a paragraph. Click here to add your own text and edit me. It’s
              easy. Just click “Edit Text” or double click me to add your own
              content and make changes to the font. I’m a great place for you to
              tell a story and let your users know a little more about you.
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
