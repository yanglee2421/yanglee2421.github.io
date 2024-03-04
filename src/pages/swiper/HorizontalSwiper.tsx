import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import { Box, IconButton, Paper, alpha } from "@mui/material";
import React from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useImmer } from "use-immer";

import type { Swiper as SwiperType } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/a11y";
import "swiper/css/autoplay";

export function HorizontalSwiper() {
  const slideCount = 12;

  const [navigationState, updateNavigationState] = useImmer({
    isBeginning: true,
    isEnd: false,
  });

  const nextElId = React.useId();
  const prevElId = React.useId();
  const scrollbarId = React.useId();
  const paginationId = React.useId();

  const handleNavigationChange = (swiper: SwiperType) => {
    updateNavigationState((prev) => {
      prev.isBeginning = swiper.isBeginning;
      prev.isEnd = swiper.isEnd;
    });
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Swiper
        // ** Event
        onSwiper={handleNavigationChange}
        onSlideChange={handleNavigationChange}
        onActiveIndexChange={handleNavigationChange}
        onScrollbarDragMove={handleNavigationChange}
        // ** Core
        spaceBetween={16}
        slidesPerView={2}
        slidesPerGroup={2}
        direction="horizontal"
        // ** Modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        navigation={{
          nextEl: `#${CSS.escape(nextElId)}`,
          prevEl: `#${CSS.escape(prevElId)}`,
        }}
        pagination={{
          clickable: true,
          el: `#${CSS.escape(paginationId)}`,
        }}
        scrollbar={{
          draggable: true,
          el: `#${CSS.escape(scrollbarId)}`,
        }}
        autoplay={{
          delay: 1000 * 5,
        }}
      >
        {(() => {
          const nodeSet = new Set<React.ReactNode>();
          for (let i = 0; i < slideCount; i++) {
            nodeSet.add(
              <SwiperSlide key={i}>
                <Box
                  height={320}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  border="1px solid red"
                >
                  {i}
                </Box>
              </SwiperSlide>,
            );
          }

          return nodeSet;
        })()}
      </Swiper>
      <Box
        id={scrollbarId}
        position={"relative"}
        height={6}
        marginBlock={2}
        bgcolor={alpha("#000", 0.12)}
        sx={{
          "& .swiper-scrollbar-drag": {
            backgroundColor: alpha("#f00", 0.5),
            cursor: "pointer",
          },
          userSelect: "none",
        }}
      ></Box>
      <Box id={paginationId} sx={{ userSelect: "none" }}></Box>
      <Box>
        <IconButton id={prevElId} disabled={navigationState.isBeginning}>
          <ArrowBackIosNewRounded></ArrowBackIosNewRounded>
        </IconButton>
        <IconButton id={nextElId} disabled={navigationState.isEnd}>
          <ArrowForwardIosRounded></ArrowForwardIosRounded>
        </IconButton>
      </Box>
    </Paper>
  );
}
