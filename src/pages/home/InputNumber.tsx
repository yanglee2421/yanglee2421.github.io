import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import React from "react";
import { minmax } from "@/utils/minmax";

export function InputNumber(props: Props) {
  const { value, onChange, step, min, max } = props;

  const [optimisticValue, setOptimisticValue] = React.useState(() => {
    return number2String(value);
  });

  return (
    <TextField
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
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              onClick={() => {
                setOptimisticValue("");
                onChange(
                  minmax(string2Number(value) - string2Number(step || 1), {
                    min,
                    max,
                  }),
                );
              }}
            >
              <RemoveOutlined />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setOptimisticValue("");
                onChange(
                  minmax(string2Number(value) + string2Number(step || 1), {
                    min,
                    max,
                  }),
                );
              }}
            >
              <AddOutlined />
            </IconButton>
          </InputAdornment>
        ),
      }}
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
