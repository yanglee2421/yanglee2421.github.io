import React from "react";
import { useTranslation } from "react-i18next";
import { HeadlessCalendar } from "@/components/headless/HeadlessCalendar";
import { Clock } from "./Clock";

export function Calendar() {
  const [selectedTime] = React.useState(() => Date.now());

  const { i18n } = useTranslation();

  return (
    <>
      <Clock />
      <HeadlessCalendar
        selectedTime={selectedTime}
        render={(props) => {
          return (
            <div>
              {props.data.slice(0, 7).map((date) => {
                const weekday = date.toLocaleString(i18n.language, {
                  weekday: "short",
                });

                return <div key={weekday}>{weekday}</div>;
              })}
              {props.data.map((date) => {
                return <div key={date.getTime()}>{date.getDate()}</div>;
              })}
            </div>
          );
        }}
      />
    </>
  );
}
