// Components Imports
import { Stack } from "@mui/material";

import { HorizontalSwiper } from "./HorizontalSwiper";
import { VerticalSwiper } from "./VerticalSwiper";

// MUI Imports

export function SwiperPage() {
  return (
    <Stack spacing={3}>
      <HorizontalSwiper></HorizontalSwiper>
      <VerticalSwiper></VerticalSwiper>
    </Stack>
  );
}
