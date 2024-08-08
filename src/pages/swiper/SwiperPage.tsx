import { Box, type Theme, useMediaQuery } from "@mui/material";
import React from "react";
import { Swiper } from "swiper";
import "swiper/css";
import { PageLayout } from "@/components/layout/PageLayout";
import { ScrollView } from "@/components/ui/ScrollView";

export function SwiperPage() {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const md = useMediaQuery<Theme>((theme) => {
    return theme.breakpoints.up("md");
  });

  React.useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const swiper = new Swiper(el, {
      slidesPerView: md ? 3 : 1,
    });

    return () => {
      swiper.destroy();
    };
  }, [md]);

  return (
    <PageLayout>
      <Box
        className="contentFixed"
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ px: 5, py: 2 }}>tabs</Box>
        <Box
          ref={ref}
          className="swiper"
          sx={{
            flex: 1,
            inlineSize: "100%",
            border: "1px solid",
            minHeight: "0",
          }}
        >
          <Box className="swiper-wrapper">
            <Box className="swiper-slide">
              <ScrollView>
                <Box sx={{ height: 2000 }}>one</Box>
              </ScrollView>
            </Box>
            <Box className="swiper-slide">two</Box>
            <Box className="swiper-slide">three</Box>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
}
