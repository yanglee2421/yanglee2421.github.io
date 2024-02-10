// MUI Imports
import { Box, Container } from "@mui/material";

// Components Imports
import { HomeSwiper } from "./HomeSwiper";
import { CardRadio } from "./card-radio";

export function Home() {
  return (
    <Box>
      <Container>
        <HomeSwiper></HomeSwiper>
        <CardRadio sx={{ mt: 4 }}></CardRadio>
      </Container>
    </Box>
  );
}
