import {
  NavigateBeforeOutlined,
  NavigateNextOutlined,
} from "@mui/icons-material";
import { CardHeader, IconButton } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  onBeforeClick?(): void;
  onNextClick?(): void;
};

export function Clock(props: Props) {
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
      action={
        <>
          <IconButton onClick={props.onBeforeClick}>
            <NavigateBeforeOutlined />
          </IconButton>
          <IconButton onClick={props.onNextClick}>
            <NavigateNextOutlined />
          </IconButton>
        </>
      }
    />
  );
}
