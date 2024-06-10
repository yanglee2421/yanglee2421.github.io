import { Box, Typography } from "@mui/material";
import React from "react";

export function Clock() {
  const [date, setDate] = React.useState(() => new Date().toDateString());
  const [time, setTime] = React.useState(() => new Date().toLocaleTimeString());

  React.useEffect(() => {
    let animate = 0;

    const play = () => {
      animate = requestAnimationFrame(play);

      React.startTransition(() => {
        const now = new Date();
        setDate(now.toLocaleDateString());
        setTime(now.toLocaleTimeString());
      });
    };

    play();

    return () => {
      cancelAnimationFrame(animate);
    };
  }, []);

  return (
    <Box
      sx={{
        padding: 3,

        textAlign: "end",
      }}
    >
      <Typography component={"time"} variant="h3">
        {time}
      </Typography>
      <br />
      <Typography component={"time"} variant="body2">
        {date}
      </Typography>
      <Typography
        component={"time"}
        variant="body1"
        sx={{ marginInlineStart: 3 }}
      >
        {new Date().toLocaleString(navigator.language, { weekday: "long" })}
      </Typography>
    </Box>
  );
}
