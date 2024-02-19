// MUI Imports
import { Box, Container, styled } from "@mui/material";

// Components Imports
import { HomeSwiper } from "./HomeSwiper";
import { CardRadio } from "./card-radio";

import snowVillage from "@/assets/images/snow-village.jpg";
import { useImmer } from "use-immer";
import React from "react";

export function Home() {
  return (
    <Box>
      <Container>
        <HomeSwiper></HomeSwiper>
        <CardRadio sx={{ mt: 4 }}></CardRadio>
      </Container>
      <ScrollImage></ScrollImage>
    </Box>
  );
}

function ScrollImage() {
  const [state, updateState] = useImmer({
    top: 0,
  });

  const imgBoxRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const controller = new AbortController();

    document.addEventListener(
      "scroll",
      () => {
        const imgBox = imgBoxRef.current;

        if (imgBox instanceof HTMLElement) {
          React.startTransition(() => {
            updateState((state) => {
              state.top = imgBox.getBoundingClientRect().top;
            });
          });
        }
      },
      {
        signal: controller.signal,
      }
    );

    return () => {
      controller.abort();
    };
  }, [updateState]);

  return (
    <Box height={2000} display={"flex"} alignItems={"center"}>
      <Box
        ref={imgBoxRef}
        position={"relative"}
        height={540}
        border={"1px red solid"}
        width={"100%"}
        overflow={"hidden"}
      >
        <StyledImg
          src={snowVillage}
          alt="snow-village"
          height={540}
          sx={{
            transform: `translate3d(0, ${540 - state.top}px, 0)`,
          }}
        ></StyledImg>
      </Box>
    </Box>
  );
}

const StyledImg = styled("img")({
  position: "absolute",
  top: 0,
  left: 0,
});
