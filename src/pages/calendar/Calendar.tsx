import React from "react";
import { useTranslation } from "react-i18next";
import { timeToCalendar } from "@/utils/timeToCalendar";
import { Clock } from "./Clock";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { chunk } from "@yotulee/run";

export function Calendar() {
  const [selectedTime, setSelectedTime] = React.useState(() => Date.now());
  const { i18n } = useTranslation();
  const calendar = timeToCalendar(selectedTime).map((i) => new Date(i));

  return (
    <Card>
      <Clock />
      <CardContent>
        <input
          type="month"
          value={new Date(selectedTime)
            .toJSON()
            .split("-")
            .slice(0, 2)
            .join("-")}
          onChange={(evt) => {
            setSelectedTime(evt.target.valueAsDate?.getTime() || Date.now());
          }}
          className="block w-full text-slate-700 focus:border-blue-500 focus:ring-blue-500"
        />
      </CardContent>
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
      {timeToCalendar(selectedTime)}
    </Card>
  );
}
