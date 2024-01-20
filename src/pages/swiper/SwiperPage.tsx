// Components Imports
import { HorizontalSwiper } from "./HorizontalSwiper";
import { VerticalSwiper } from "./VerticalSwiper";

// MUI Imports
import { Stack } from "@mui/material";

export function SwiperPage() {
  return (
    <Stack spacing={3}>
      <HorizontalSwiper></HorizontalSwiper>
      <VerticalSwiper></VerticalSwiper>
    </Stack>
  );
}
