import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";

const dayjsInitializer = () => dayjs();

export const Component = () => {
  const [begin, setBegin] = React.useState(dayjsInitializer);
  const [end, setEnd] = React.useState(dayjsInitializer);

  return (
    <>
      <Card>
        <CardHeader
          title="Calendar"
          subheader={end.diff(begin, "day") + 1 + " day(s)"}
        />
        <CardContent>
          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker
                slotProps={{
                  textField: {
                    fullWidth: true,
                    label: "Begin",
                  },
                }}
                value={begin}
                onChange={(e) => {
                  if (!e) return;
                  setBegin(e);
                }}
                maxDate={end}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker
                slotProps={{
                  textField: {
                    fullWidth: true,
                    label: "End",
                  },
                }}
                value={end}
                onChange={(e) => {
                  if (!e) return;
                  setEnd(e);
                }}
                minDate={begin}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
