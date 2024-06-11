import type React from "react";

export function HeadlessCalendar(props: Props) {
  const { selectedTime, render } = props;

  const monthStartTime = new Date(selectedTime).setDate(1);
  const monthStartIndex = new Date(monthStartTime).getDay();
  const calendarStartTime = monthStartTime - monthStartIndex * dayInterval;

  const data = [];

  for (let i = 0; i < 42; i++) {
    data.push(calendarStartTime + i * dayInterval);
  }

  return render({ data: data.map((item) => new Date(item)) });
}

const dayInterval = 1000 * 60 * 60 * 24;

type Props = {
  selectedTime: number;
  render(props: RenderProps): React.ReactNode;
};

type RenderProps = {
  data: Date[];
};
