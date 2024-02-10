// MUI Imports
import { Box } from "@mui/material";

// Utils Imports
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// React Imports
import React from "react";

export function HomeSwiper() {
  const swiperRef = React.useRef<HTMLDivElement>(null);
  const prevElRef = React.useRef<HTMLDivElement>(null);
  const nextElRef = React.useRef<HTMLDivElement>(null);
  const paginationElRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const swiperEl = swiperRef.current;
    const prevEl = prevElRef.current;
    const nextEl = nextElRef.current;
    const paginationEl = paginationElRef.current;

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

    const swiper = new Swiper(swiperEl, {
      modules: [Navigation, Pagination, Autoplay],
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
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <Box
      ref={swiperRef}
      className="swiper"
      border="1px solid"
      borderColor={(theme) => theme.palette.divider}
      position={"relative"}
      sx={{
        aspectRatio: "16/9",
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
        <Box className="swiper-slide">Slide 3</Box>
      </Box>

      <Box className="swiper-button-prev" ref={prevElRef}></Box>
      <Box className="swiper-button-next" ref={nextElRef}></Box>
      <Box className="swiper-pagination" ref={paginationElRef}></Box>
      <Box className="swiper-scrollbar"></Box>
    </Box>
  );
}
