import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import {
  type TextFieldProps,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";

const numberToInputText = (value: number) => {
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
  const [draftText, setDraftText] = React.useState("");

  const inputText = focused ? draftText : numberToInputText(field.value);

  const changeValue = (num: number) => {
    const nextValue = minmax(num, _min, _max);
    field.onChange(nextValue);
    setDraftTextWithNumber(nextValue);
  };

  const setDraftTextWithNumber = (num: number) => {
    setDraftText(numberToInputText(num));
  };

  const handlePlus = () => {
    const nextValue = field.value + _step;
    changeValue(nextValue);
  };

  const handleMinus = () => {
    const nextValue = field.value - _step;
    changeValue(nextValue);
  };

  return (
    <TextField
      value={inputText}
      onChange={(e) => {
        setDraftText(e.target.value);
      }}
      onFocus={() => {
        setFocused(true);
        setDraftTextWithNumber(field.value);
      }}
      onBlur={(e) => {
        setFocused(false);
        changeValue(Number.parseFloat(e.target.value.trim()));
        field.onBlur?.();
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
