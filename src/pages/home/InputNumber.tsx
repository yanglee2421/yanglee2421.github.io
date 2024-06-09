import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import React from "react";
import { Translation } from "react-i18next";
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
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={handleMinus}>
              <RemoveOutlined />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handlePlus}>
              <AddOutlined />
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
      label={
        <Translation ns="InputLabel">{(t) => t("number input")}</Translation>
      }
      InputLabelProps={{
        sx: {
          textTransform: "capitalize",
        },
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
