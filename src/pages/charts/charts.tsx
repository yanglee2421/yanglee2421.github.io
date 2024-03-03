import { Container, Grid } from "@mui/material";

import { PieCard } from "./PieCard";

export function Charts() {
  return (
    <Container sx={{ marginInline: "auto" }}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={4}>
          <PieCard></PieCard>
        </Grid>
      </Grid>
    </Container>
  );
}
