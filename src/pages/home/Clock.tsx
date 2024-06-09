import { Box, Typography } from "@mui/material";
import React from "react";

export function Clock() {
  const [date, setDate] = React.useState(() => new Date());

  React.useEffect(() => {
    let animate = 0;

    const play = () => {
      animate = requestAnimationFrame(play);

      setDate(new Date());
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
        marginInlineStart: "auto",

        textAlign: "end",
      }}
    >
      <Typography component={"time"} variant="h3">
        {date.toLocaleTimeString()}
      </Typography>
      <br />
      <Typography variant="body2">{date.toLocaleDateString()}</Typography>
    </Box>
  );
}
