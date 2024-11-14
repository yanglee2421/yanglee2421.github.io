import React from "react";
import { useTranslation } from "react-i18next";
import { timeToCalendar } from "@/utils/timeToCalendar";
import { Clock } from "./Clock";
import {
  Card,
  CardContent,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { chunk } from "@yotulee/run";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export function Calendar() {
  const [selectedTime, setSelectedTime] = React.useState(() => Date.now());
  const { i18n } = useTranslation();
  const calendar = timeToCalendar(selectedTime).map((i) => new Date(i));

  return (
    <Card>
      <Clock />
      <CardContent>
        <Grid2 container spacing={6}>
          <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
            <DatePicker
              value={dayjs(selectedTime)}
              onChange={(e) => {
                console.log(e);
                if (!e) {
                  return;
                }

                setSelectedTime(e.toDate().getTime());
              }}
              slotProps={{
                textField: { fullWidth: true },
              }}
              views={["month", "year"]}
            />
          </Grid2>
        </Grid2>
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
            {chunk(calendar, 7)
              .map((row, idx) => (
                <TableRow key={idx}>
                  {row.map((cell) => (
                    <TableCell key={cell.toLocaleDateString()}>
                      {cell.getDate()}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
