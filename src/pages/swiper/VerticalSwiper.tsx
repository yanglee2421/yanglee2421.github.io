import { Paper, styled } from "@mui/material";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/pagination";
import "swiper/css";

export function VerticalSwiper() {
  const slideCount = 12;

  return (
    <Paper sx={{ padding: 3 }}>
      <StyledSwiper
        // ** Core
        direction={"vertical"}
        slidesPerGroup={2}
        slidesPerView={2}
        spaceBetween={16}
        // ** Modules
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
      >
        {(() => {
          const nodeSet = new Set<React.ReactNode>();
          for (let i = 0; i < slideCount; i++) {
            nodeSet.add(
              <StyledSwiperSlide key={i}>Slide {i}</StyledSwiperSlide>,
            );
          }

          return nodeSet;
        })()}
      </StyledSwiper>
    </Paper>
  );
}

const StyledSwiper = styled(Swiper)({
  height: 420,
});

const StyledSwiperSlide = styled(SwiperSlide)({
  border: "1px dashed red",
});
