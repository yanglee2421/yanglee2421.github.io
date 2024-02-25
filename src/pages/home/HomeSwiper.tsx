import { Box, IconButton } from "@mui/material";
import {
  NavigateNextOutlined,
  NavigateBeforeOutlined,
} from "@mui/icons-material";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
import React from "react";
import { useImmer } from "use-immer";

export function HomeSwiper() {
  const swiperRef = React.useRef<HTMLDivElement>(null);
  const prevElRef = React.useRef<HTMLButtonElement>(null);
  const nextElRef = React.useRef<HTMLButtonElement>(null);
  const paginationElRef = React.useRef<HTMLDivElement>(null);
  const scrollbarElRef = React.useRef<HTMLDivElement>(null);

  const [state, updateState] = useImmer({
    isBeginning: false,
    isEnd: false,
  });

  React.useEffect(() => {
    const swiperEl = swiperRef.current;
    const prevEl = prevElRef.current;
    const nextEl = nextElRef.current;
    const paginationEl = paginationElRef.current;
    const scrollbarEl = scrollbarElRef.current;

    if (!swiperEl) {
      return;
    }

    if (!prevEl) {
      return;
    }

    if (!nextEl) {
      return;
    }

    if (!paginationEl) {
      return;
    }

    if (!scrollbarEl) {
      return;
    }

    const swiper = new Swiper(swiperEl, {
      autoHeight: true,
      modules: [Navigation, Pagination, Autoplay, Scrollbar],
      navigation: {
        prevEl,
        nextEl,
      },
      pagination: {
        el: paginationEl,
      },
      autoplay: {
        delay: 1000 * 5,
      },
      scrollbar: {
        el: scrollbarEl,
      },
    });
    updateState((state) => {
      state.isBeginning = swiper.isBeginning;
      state.isEnd = swiper.isEnd;
    });

    swiper.on("slideChange", (swiper) => {
      console.log(swiper);

      updateState((state) => {
        state.isBeginning = swiper.isBeginning;
        state.isEnd = swiper.isEnd;
      });
    });
    swiper.on("scroll", (swiper) => {
      updateState((state) => {
        state.isBeginning = swiper.isBeginning;
        state.isEnd = swiper.isEnd;
      });
    });

    return () => {
      swiper.destroy();
    };
  }, [updateState]);

  return (
    <Box
      ref={swiperRef}
      className="swiper"
      border="1px solid"
      borderColor={(theme) => theme.palette.divider}
      position={"relative"}
      sx={{
        overflow: "hidden",
        "& .swiper-slide": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
        },
      }}
    >
      <Box className="swiper-wrapper">
        <Box className="swiper-slide">Slide 1</Box>
        <Box className="swiper-slide">Slide 2</Box>
        <Box className="swiper-slide">
          <Box sx={{ height: 320 }}>Slide 3lorem</Box>
        </Box>
      </Box>

      <IconButton
        ref={prevElRef}
        disabled={state.isBeginning}
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          zIndex: 1,
          transform: "translateY(-50%)",
        }}
      >
        <NavigateBeforeOutlined></NavigateBeforeOutlined>
      </IconButton>
      <IconButton
        ref={nextElRef}
        disabled={state.isEnd}
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          zIndex: 1,
          transform: "translateY(-50%)",
        }}
      >
        <NavigateNextOutlined></NavigateNextOutlined>
      </IconButton>
      <Box ref={paginationElRef}></Box>
      <Box ref={scrollbarElRef} sx={{ zIndex: 2, position: "relative" }}></Box>
    </Box>
  );
}
