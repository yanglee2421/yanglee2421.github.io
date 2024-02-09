// MUI Imports
import { Box, styled } from "@mui/material";

// Utils Imports
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// React Imports
import React from "react";

export function Home() {
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
    <Box>
      <Box
        ref={swiperRef}
        className="swiper"
        border="1px red solid"
        position={"relative"}
      >
        <Box className="swiper-wrapper">
          <StyledSwiperSlide className="swiper-slide">
            Slide 1
          </StyledSwiperSlide>
          <StyledSwiperSlide className="swiper-slide">
            Slide 2
          </StyledSwiperSlide>
          <StyledSwiperSlide className="swiper-slide">
            Slide 3
          </StyledSwiperSlide>
        </Box>

        <Box className="swiper-button-prev" ref={prevElRef}></Box>
        <Box className="swiper-button-next" ref={nextElRef}></Box>
        <Box className="swiper-pagination" ref={paginationElRef}></Box>
        <Box className="swiper-scrollbar"></Box>
      </Box>
    </Box>
  );
}

const StyledSwiperSlide = styled(Box)({
  border: "1px red solid",
});
