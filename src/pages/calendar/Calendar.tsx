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
        className="block w-full text-slate-700 focus:border-blue-500 focus:ring-blue-500"
      />
      <HeadlessCalendar
        selectedTime={selectedTime}
        render={(props) => {
          return (
            <table className="w-full rounded border">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr className="divide-x">
                  {props.data.slice(0, 7).map((date) => {
                    const weekday = date.toLocaleString(i18n.language, {
                      weekday: "short",
                    });

                    return (
                      <th
                        key={weekday}
                        className="px-6 py-3 text-left text-sm font-medium uppercase text-slate-900"
                      >
                        {weekday}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y">
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
                      <tr
                        key={idx}
                        className="divide-x odd:bg-white even:bg-slate-50"
                      >
                        {row.map((cell) => {
                          return (
                            <td
                              key={cell.toLocaleDateString()}
                              className="max-w-72 px-6 py-4 text-sm font-medium text-slate-900"
                            >
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
