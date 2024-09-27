import React from "react";
import { useTranslation } from "react-i18next";
import { HeadlessCalendar } from "@/components/headless/HeadlessCalendar";
import { Clock } from "./Clock";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function Calendar() {
  const [selectedTime, setSelectedTime] = React.useState(() => Date.now());
  const { i18n } = useTranslation();

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
      <HeadlessCalendar
        selectedTime={selectedTime}
        render={(props) => {
          return (
            <Table>
              <TableHeader>
                <TableRow>
                  {props.data.slice(0, 7).map((date) => {
                    const weekday = date.toLocaleString(i18n.language, {
                      weekday: "short",
                    });

                    return <TableHead key={weekday}>{weekday}</TableHead>;
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.data
                  .reduce<Array<Date[]>>((rows, item) => {
                    const lastRow = rows[rows.length - 1];

                    if (!lastRow) {
                      rows.push([item]);
                      return rows;
                    }

                    if (lastRow.length < 7) {
                      lastRow.push(item);
                      return rows;
                    }

                    rows.push([item]);

                    return rows;
                  }, [])
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
          );
        }}
      />
    </Card>
  );
}
