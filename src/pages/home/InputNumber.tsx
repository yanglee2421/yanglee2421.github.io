import React from "react";
import { minmax } from "@/utils/minmax";

export function InputNumber(props: Props) {
  const { value, onChange, step = 1, min, max } = props;

  const [optimisticValue, setOptimisticValue] = React.useState(() => {
    return number2String(value);
  });

  const handleMinus = () => {
    setOptimisticValue("");
    onChange(
      minmax(string2Number(value) - string2Number(step), {
        min,
        max,
      }),
    );
  };

  const handlePlus = () => {
    setOptimisticValue("");
    onChange(
      minmax(string2Number(value) + string2Number(step), {
        min,
        max,
      }),
    );
  };

  return (
    <input
      value={optimisticValue || number2String(value)}
      onChange={(evt) => {
        setOptimisticValue(evt.target.value);
      }}
      onBlur={(evt) => {
        setOptimisticValue("");
        onChange(
          minmax(string2Number(evt.target.value, Number.NaN), { min, max }),
        );
      }}
      onKeyDown={(evt) => {
        if (!["ArrowUp", "ArrowDown"].includes(evt.key)) {
          return;
        }

        evt.preventDefault();

        switch (evt.key) {
          case "ArrowUp":
            handlePlus();
            break;
          case "ArrowDown":
            handleMinus();
            break;
          default:
        }
      }}
      className="block w-full focus:border-blue-500 focus:ring-blue-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
    />
  );
}

type Props = {
  value: number;
  onChange(value: number): void;
  step?: number;
  min?: number;
  max?: number;
};

function string2Number(value: string | number, fallback = 0) {
  const valueAsNumber =
    typeof value === "number" ? value : Number.parseFloat(value);

  return Number.isNaN(valueAsNumber) ? fallback : valueAsNumber;
}

function number2String(value: number, fallback = "") {
  return Number.isNaN(value) ? fallback : String(value);
}
