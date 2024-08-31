import React from "react";
import { useTranslation } from "react-i18next";
import { HeadlessCalendar } from "@/components/headless/HeadlessCalendar";
import { Clock } from "./Clock";

export function Calendar() {
  const [selectedTime, setSelectedTime] = React.useState(() => Date.now());
  const { i18n } = useTranslation();

  return (
    <>
      <Clock />
      <input
        type="month"
        value={new Date(selectedTime).toJSON().split("-").slice(0, 2).join("-")}
        onChange={(evt) => {
          setSelectedTime(evt.target.valueAsDate?.getTime() || Date.now());
        }}
      />
      <HeadlessCalendar
        selectedTime={selectedTime}
        render={(props) => {
          return (
            <table>
              <thead>
                <tr>
                  {props.data.slice(0, 7).map((date) => {
                    const weekday = date.toLocaleString(i18n.language, {
                      weekday: "short",
                    });

                    return <th key={weekday}>{weekday}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
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
                  .map((row, idx) => {
                    return (
                      <tr key={idx}>
                        {row.map((cell) => {
                          return (
                            <td key={cell.toLocaleDateString()}>
                              {cell.getDate()}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          );
        }}
      />
    </>
  );
}
