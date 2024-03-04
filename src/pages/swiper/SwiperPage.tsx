import { Stack } from "@mui/material";

import { HorizontalSwiper } from "./HorizontalSwiper";
import { VerticalSwiper } from "./VerticalSwiper";

export function SwiperPage() {
  return (
    <Stack spacing={3}>
      <HorizontalSwiper></HorizontalSwiper>
      <VerticalSwiper></VerticalSwiper>
    </Stack>
  );
}
