import {
  NavigateBeforeOutlined,
  NavigateNextOutlined,
  TodayOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Toolbar,
  Stack,
  Slide,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { SwitchTransition } from "react-transition-group";
import { HeadlessCalendar } from "@/components/headless/HeadlessCalendar";
import { Clock } from "./Clock";

export function Calendar() {
  const [selectedTime, setSelectedTime] = React.useState(() => Date.now());

  const { i18n } = useTranslation();

  const selectedDate = new Date(selectedTime);

  return (
    <Paper>
      <Toolbar>
        <Clock />
        <Stack
          direction={"row"}
          spacing={3}
          useFlexGap
          sx={{ marginInlineStart: "auto", marginInlineEnd: 1 }}
        >
          <IconButton
            onClick={() => {
              setSelectedTime(Date.now());
            }}
          >
            <TodayOutlined />
          </IconButton>
        </Stack>
      </Toolbar>
      <Box sx={{ overflow: "hidden" }}>
        <SwitchTransition>
          <Slide key={selectedTime} direction="up" unmountOnExit>
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
              <HeadlessCalendar
                selectedTime={selectedTime}
                render={(props) => [
                  props.data.slice(0, 7).map((date) => {
                    const weekday = date.toLocaleString(i18n.language, {
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
                  }),
                  props.data.map((date) => {
                    return (
                      <Box
                        key={date.getTime()}
                        sx={{
                          borderStyle: "solid",
                          borderColor(theme) {
                            return theme.palette.divider;
                          },
                          borderWidth: "0 1px 1px 0",
                          padding: 3,

                          textAlign: "center",

                          color(theme) {
                            if (
                              Object.is(
                                date.toLocaleDateString(),
                                new Date().toLocaleDateString(),
                              )
                            ) {
                              return theme.palette.primary.main;
                            }
                          },
                        }}
                      >
                        {date.getDate()}
                      </Box>
                    );
                  }),
                ]}
              />
            </Box>
          </Slide>
        </SwitchTransition>
      </Box>

      <Box
        sx={{
          paddingBlock: 2,
          paddingInline: 4,
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="body2">
          {selectedDate.toLocaleString(i18n.language, {
            year: "numeric",
            month: "long",
          })}
        </Typography>
        <IconButton
          onClick={() => {
            React.startTransition(() => {
              setSelectedTime(
                selectedDate.setMonth(selectedDate.getMonth() - 1),
              );
            });
          }}
          sx={{ marginInlineStart: "auto" }}
        >
          <NavigateBeforeOutlined />
        </IconButton>
        <IconButton
          onClick={() => {
            React.startTransition(() => {
              setSelectedTime(
                selectedDate.setMonth(selectedDate.getMonth() + 1),
              );
            });
          }}
        >
          <NavigateNextOutlined />
        </IconButton>
      </Box>
    </Paper>
  );
}
