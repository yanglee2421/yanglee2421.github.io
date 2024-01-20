// MUI Imports
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  alpha,
} from "@mui/material";
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";

// React Imports
import React from "react";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export function SwiperCard() {
  const slideCount = 12;

  const nextElId = React.useId();
  const prevElId = React.useId();
  const scrollbarId = React.useId();
  const paginationId = React.useId();

  return (
    <Card>
      <CardHeader title="Swiper"></CardHeader>
      <CardContent>
        <Box flex={1}>
          <Swiper
            spaceBetween={16}
            slidesPerView={2}
            slidesPerGroup={2}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
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
                  </SwiperSlide>
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
              },
              userSelect: "none",
            }}
          ></Box>
          <Box id={paginationId} sx={{ userSelect: "none" }}></Box>
          <Box>
            <IconButton id={prevElId}>
              <ArrowBackIosNewRounded></ArrowBackIosNewRounded>
            </IconButton>
            <IconButton id={nextElId}>
              <ArrowForwardIosRounded></ArrowForwardIosRounded>
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
