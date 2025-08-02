import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import {
  type TextFieldProps,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";

const renderNumberValue = (
  value: number,
  focusValue: string,
  focused: boolean,
) => {
  if (focused) {
    return focusValue;
  }

  if (Number.isNaN(value)) {
    return "";
  }

  return value;
};

const numberToFocusedValue = (value: number) => {
  if (Number.isNaN(value)) {
    return "";
  }

  return value.toString();
};

type NumberFieldProps = TextFieldProps & {
  field: {
    value: number;
    onChange: (value: number) => void;
    onBlur?: () => void;
  };
  _step?: number;
  _min?: number;
  _max?: number;
  _spinner?: boolean;
};

export const NumberField = (props: NumberFieldProps) => {
  const {
    field,
    _step = 1,
    _min = Number.NEGATIVE_INFINITY,
    _max = Number.POSITIVE_INFINITY,
    _spinner = false,
    ...restProps
  } = props;

  const [focused, setFocused] = React.useState(false);
  const [focusedValue, setFocusedValue] = React.useState("");

  const changeValue = (num: number) => {
    field.onChange(minmax(num, _min, _max));
  };

  const handlePlus = () => {
    setFocusedValue((prev) => {
      const nextValue = (Number.parseFloat(prev) || 0) + _step;
      changeValue(nextValue);
      return minmax(nextValue, _min, _max).toString();
    });
  };

  const handleMinus = () => {
    setFocusedValue((prev) => {
      const nextValue = (Number.parseFloat(prev) || 0) - _step;
      changeValue(nextValue);
      return minmax(nextValue, _min, _max).toString();
    });
  };

  return (
    <TextField
      value={renderNumberValue(field.value, focusedValue, focused)}
      onChange={(e) => {
        setFocusedValue(e.target.value);
      }}
      onFocus={() => {
        setFocused(true);
        setFocusedValue(numberToFocusedValue(field.value));
      }}
      onBlur={(e) => {
        setFocused(false);
        setFocusedValue("");
        field.onBlur?.();
        changeValue(Number.parseFloat(e.target.value.trim()));
      }}
      onKeyDown={(e) => {
        switch (e.key) {
          case "ArrowUp":
            e.preventDefault();
            handlePlus();
            break;
          case "ArrowDown":
            e.preventDefault();
            handleMinus();
            break;
          default:
        }
      }}
      slotProps={{
        input: {
          startAdornment: _spinner && (
            <InputAdornment position="start">
              <IconButton onClick={handleMinus}>
                <RemoveOutlined />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: _spinner && (
            <InputAdornment position="end">
              <IconButton onClick={handlePlus}>
                <AddOutlined />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...restProps}
    />
  );
};

const minmax = (
  num: number,
  min: number = Number.NEGATIVE_INFINITY,
  max: number = Number.POSITIVE_INFINITY,
) => {
  return Math.min(max, Math.max(min, num));
};

// const interval = (num: number, min: number, max: number) => {
//   return Object.is(num, minmax(num, min, max));
// };
