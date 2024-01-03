// MUI Imports
import { Stack } from "@mui/material";

// Components Imports
import { FadeButton } from "./FadeButton";
import { FadeCard } from "./FadeCard";
import { Swiper } from "./Swiper";

export function Transition() {
  return (
    <Stack spacing={6}>
      <FadeButton></FadeButton>
      <FadeCard></FadeCard>
      <Swiper></Swiper>
    </Stack>
  );
}
