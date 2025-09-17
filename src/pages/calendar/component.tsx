import React from "react";
import { useParams } from "react-router";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import {
  NavigateBeforeOutlined,
  NavigateNextOutlined,
} from "@mui/icons-material";
import { useLocaleDate } from "@/hooks/dom/useLocaleDate";
import { useLocaleTime } from "@/hooks/dom/useLocaleTime";
import * as mathjs from "mathjs";

const minmax = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, min), max);
};

const DAY_INTERVAL = 1000 * 60 * 60 * 24;

const getMonthFirst = (date: Date) => new Date(date).setDate(1);
const getMonthLast = (date: Date) => {
  return new Date(date).setMonth(date.getMonth() + 1, 0);
};

const timestampToCalendar = (timestamp: number) => {
  const currentDate = new Date(timestamp);
  const monthFirst = getMonthFirst(currentDate);
  const monthLast = getMonthLast(currentDate);
  const weekdayOfMonthFirst = new Date(monthFirst).getDay();
  const calendarFirst = monthFirst - weekdayOfMonthFirst * DAY_INTERVAL;
  const needLine6 = monthLast > calendarFirst + 34 * DAY_INTERVAL;
  const cellNumber = needLine6 ? 42 : 35;
  const calendar = [];

  for (let i = 0; i < cellNumber; i++) {
    calendar.push(calendarFirst + i * DAY_INTERVAL);
  }

  return calendar;
};

const inRange = (num: number, min: number, max: number) => {
  return Object.is(num, minmax(num, min, max));
};

const renderBadgeContent = (date: Date, start?: Date, end?: Date) => {
  if (!start) return;

  const current = dayjs(date).startOf("day").valueOf();
  const minTime = dayjs(start).startOf("day").valueOf();
  const maxTime = end
    ? dayjs(end).startOf("day").valueOf()
    : Number.POSITIVE_INFINITY;

  if (!inRange(current, minTime, maxTime)) {
    return;
  }

  return mathjs
    .add(
      mathjs.divide(
        mathjs.subtract(mathjs.bignumber(current), mathjs.bignumber(minTime)),
        mathjs.multiply(
          mathjs.bignumber(1000),
          mathjs.bignumber(60),
          mathjs.bignumber(60),
          mathjs.bignumber(24),
        ),
      ),
      mathjs.bignumber(1),
    )
    .toString();
};

const initSelectedTime = () => dayjs();

export const Component = () => {
  const [endDate, setEndDate] = React.useState<dayjs.Dayjs | null>(null);
  const [startDate, setStartDate] = React.useState<dayjs.Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = React.useState(initSelectedTime);

  const params = useParams();
  const date = useLocaleDate(params.lang);
  const time = useLocaleTime(params.lang);

  const calendar = timestampToCalendar(selectedTime.toDate().getTime()).map(
    (i) => new Date(i),
  );

  return (
    <Card>
      <CardHeader
        title={date}
        subheader={time}
        action={
          <>
            <IconButton
              onClick={() => {
                setSelectedTime((p) => {
                  const date = p.toDate();
                  date.setMonth(date.getMonth() - 1);

                  return dayjs(date);
                });
              }}
            >
              <NavigateBeforeOutlined />
            </IconButton>
            <IconButton
              onClick={() => {
                setSelectedTime((p) => {
                  const date = p.toDate();
                  date.setMonth(date.getMonth() + 1);

                  return dayjs(date);
                });
              }}
            >
              <NavigateNextOutlined />
            </IconButton>
          </>
        }
      />
      <CardContent>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <DatePicker
              value={selectedTime}
              onChange={(e) => {
                if (e?.isValid()) {
                  setSelectedTime(e);
                }
              }}
              slotProps={{
                textField: { fullWidth: true, label: "Month" },
              }}
              views={["month", "year"]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <DatePicker
              value={startDate}
              onChange={setStartDate}
              maxDate={endDate || void 0}
              slotProps={{
                textField: { fullWidth: true, label: "Start Date" },
                field: { clearable: true },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <DatePicker
              value={endDate}
              onChange={setEndDate}
              minDate={startDate || void 0}
              slotProps={{
                textField: { fullWidth: true, label: "End Date" },
                field: { clearable: true },
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, minmax(0,1fr))",
        }}
      >
        {calendar.map((date, index) => (
          <Box
            key={date.getTime()}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderBottom: 0,
              borderLeft: 0,
              borderRight: (index + 1) % 7 === 0 ? 0 : void 0,
              borderTop: index < 7 ? 0 : void 0,

              padding: 2,
            }}
          >
            <Badge
              badgeContent={renderBadgeContent(
                date,
                startDate?.toDate(),
                endDate?.toDate(),
              )}
              color="primary"
            >
              <Box padding={1.5}>
                <Typography variant="h5" fontWeight={300}>
                  {date.getDate()}
                </Typography>
              </Box>
            </Badge>
          </Box>
        ))}
      </Box>
    </Card>
  );
};
