import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  NavigateBeforeOutlined,
  NavigateNextOutlined,
} from "@mui/icons-material";
import { chunk, minmax } from "@yotulee/run";
import { useLocaleDate } from "@/hooks/dom/useLocaleDate";
import { useLocaleTime } from "@/hooks/dom/useLocaleTime";

const dayInterval = 1000 * 60 * 60 * 24;

const timeToCalendar = (time: number) => {
  const monthStartTime = new Date(time).setDate(1);
  const monthStartIndex = new Date(monthStartTime).getDay();
  const calendarStartTime = monthStartTime - monthStartIndex * dayInterval;
  const calendar = [];

  for (let i = 0; i < 42; i++) {
    calendar.push(calendarStartTime + i * dayInterval);
  }

  return calendar;
};

const inRange = (num: number, min: number, max: number) =>
  Object.is(num, minmax(num, { min, max }));

const renderBadgeContent = (date: Date, start?: Date, end?: Date) => {
  if (!start) {
    return;
  }

  const time = date.getTime();
  const minTime = start.getTime();
  const maxTime = end ? end.getTime() : Number.POSITIVE_INFINITY;

  if (!inRange(time, minTime, maxTime)) {
    return;
  }

  return (time - minTime) / (1000 * 60 * 60 * 24) + 1;
};

export const Component = () => {
  const [selectedTime, setSelectedTime] = React.useState(() =>
    dayjs(new Date().toDateString()),
  );
  const { i18n } = useTranslation();
  const calendar = timeToCalendar(selectedTime.toDate().getTime()).map(
    (i) => new Date(i),
  );
  const [startDate, setStartDate] = React.useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<dayjs.Dayjs | null>(null);
  const params = useParams();
  const date = useLocaleDate(params.lang);
  const time = useLocaleTime(params.lang);

  return (
    <Card>
      <CardHeader
        title={time}
        subheader={date}
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
        <Grid container spacing={6}>
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {calendar.slice(0, 7).map((date) => {
                const weekday = date.toLocaleString(i18n.language, {
                  weekday: "short",
                });

                return <TableCell key={weekday}>{weekday}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {chunk(calendar, 7).map((row, idx) => (
              <TableRow key={idx}>
                {row.map((cell) => (
                  <TableCell key={cell.toLocaleDateString()}>
                    <Badge
                      badgeContent={renderBadgeContent(
                        cell,
                        startDate?.toDate(),
                        endDate?.toDate(),
                      )}
                      color="primary"
                    >
                      <IconButton size="small">{cell.getDate()}</IconButton>
                    </Badge>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
