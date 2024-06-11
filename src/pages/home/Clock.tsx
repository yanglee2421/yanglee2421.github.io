import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export function Clock() {
  const { i18n } = useTranslation();
  const [date, setDate] = React.useState(() => new Date().toDateString());
  const [time, setTime] = React.useState(() => new Date().toLocaleTimeString());
  const [weekday, setWeekday] = React.useState(() => {
    return new Date().toLocaleString(i18n.language, { weekday: "long" });
  });

  React.useEffect(() => {
    let animate = 0;

    const play = () => {
      animate = requestAnimationFrame(play);

      React.startTransition(() => {
        const now = new Date();
        setDate(now.toLocaleDateString());
        setTime(now.toLocaleTimeString());
        setWeekday(now.toLocaleString(i18n.language, { weekday: "long" }));
      });
    };

    play();

    return () => {
      cancelAnimationFrame(animate);
    };
  }, [i18n.language]);

  return (
    <Box sx={{ paddingBlock: 2, paddingInlineStart: 3 }}>
      <Typography component={"time"} variant="h4">
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
        {weekday}
      </Typography>
    </Box>
  );
}
