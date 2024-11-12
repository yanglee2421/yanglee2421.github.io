import { CardHeader } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export function Clock() {
  const { i18n } = useTranslation();
  const [date, setDate] = React.useState(() => new Date().toDateString());
  const [time, setTime] = React.useState(() => new Date().toLocaleTimeString());
  const [weekday, setWeekday] = React.useState(() => {
    return new Date().toLocaleString(i18n.language, { weekday: "long" });
  });

  React.useEffect(() => {
    let animate = 0;

    const play = () => {
      animate = requestAnimationFrame(play);

      React.startTransition(() => {
        const now = new Date();
        setDate(now.toLocaleDateString());
        setTime(now.toLocaleTimeString());
        setWeekday(now.toLocaleString(i18n.language, { weekday: "long" }));
      });
    };

    play();

    return () => {
      cancelAnimationFrame(animate);
    };
  }, [i18n.language]);

  return (
    <CardHeader
      title={time}
      subheader={
        <>
          <time>{date}</time>
          <time className="text-sm">{weekday}</time>
        </>
      }
    >
    </CardHeader>
  );
}
