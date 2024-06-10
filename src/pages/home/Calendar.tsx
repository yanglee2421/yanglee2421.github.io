import {
  NavigateBeforeOutlined,
  NavigateNextOutlined,
  TodayOutlined,
} from "@mui/icons-material";
import { Box, Typography, IconButton, Paper, Toolbar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Clock } from "./Clock";

export function Calendar() {
  const selectedTime = Date.now();

  const monthFirstTime = new Date(selectedTime).setDate(1);
  const monthFirstTimeIdx = new Date(monthFirstTime).getDay();
  const calendarStartTime = monthFirstTime - monthFirstTimeIdx * dayInterval;

  const data = [];

  for (let i = 0; i < 42; i++) {
    data.push(calendarStartTime + i * dayInterval);
  }

  const { i18n } = useTranslation();

  return (
    <Paper>
      <Toolbar>
        <Clock />
        <IconButton sx={{ marginInlineStart: "auto" }}>
          <TodayOutlined />
        </IconButton>
      </Toolbar>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7,minmax(0,1fr))",

          borderStyle: "solid",
          borderColor(theme) {
            return theme.palette.divider;
          },
          borderWidth: "1px 0 0 1px",
        }}
      >
        {data.slice(0, 7).map((time) => {
          const weekday = new Date(time).toLocaleString(i18n.language, {
            weekday: "short",
          });

          return (
            <Box
              key={weekday}
              sx={{
                borderStyle: "solid",
                borderColor(theme) {
                  return theme.palette.divider;
                },
                borderWidth: "0 1px 1px 0",
                padding: 3,

                textAlign: "center",
              }}
            >
              {weekday}
            </Box>
          );
        })}

        {data.map((time) => {
          const date = new Date(time);

          return (
            <Box
              key={time}
              sx={{
                borderStyle: "solid",
                borderColor(theme) {
                  return theme.palette.divider;
                },
                borderWidth: "0 1px 1px 0",
                padding: 3,

                textAlign: "center",

                color(theme) {
                  if (Object.is(time, selectedTime)) {
                    return theme.palette.primary.main;
                  }
                },
              }}
            >
              {date.getDate()}
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          paddingBlock: 2,
          paddingInline: 3,
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="body2">
          {new Date().toLocaleString(i18n.language, { month: "long" })}
        </Typography>
        <IconButton sx={{ marginInlineStart: "auto" }}>
          <NavigateBeforeOutlined />
        </IconButton>
        <IconButton>
          <NavigateNextOutlined />
        </IconButton>
      </Box>
    </Paper>
  );
}

const dayInterval = 1000 * 60 * 60 * 24;
