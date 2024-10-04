import { Card, CardContent, Grid2, Typography } from "@mui/material";
import { Translation } from "react-i18next";

export function Dashboard() {
  return (
    <Grid2 container spacing={6}>
      <Grid2 size={{ xs: 12 }}>
        <Typography variant="h3">
          <Translation ns="/dashboard">{(t) => t("dashboard")}</Translation>
        </Typography>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Card>
          <CardContent></CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}
