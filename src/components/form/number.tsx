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

  // Variables

  const inputText = focused ? draftText : numberToInputText(field.value);

  // Shared Logic

  const changeValue = (num: number) => {
    const nextValue = minmax(num, _min, _max);
    field.onChange(nextValue);
    return nextValue;
  };

  const setDraftTextWithNumber = (num: number) => {
    setDraftText(numberToInputText(num));
  };

  const plusStep = () => {
    const nextValue = changeValue(field.value + _step);
    return nextValue;
  };

  const minusStep = () => {
    const nextValue = changeValue(field.value - _step);
    return nextValue;
  };

  // Mouse Event

  const handlePlusSpinnerClick = () => {
    plusStep();
  };

  const handleMinusSpinnerClick = () => {
    minusStep();
  };

  // Keyboard Event

  const handleArrowUpPress = () => {
    const nextValue = plusStep();
    setDraftTextWithNumber(nextValue);
  };

  const handleArrowDownPress = () => {
    const nextValue = minusStep();
    setDraftTextWithNumber(nextValue);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDraftText(e.target.value);
  };

  // Focus Event

  const handleInputFocus = () => {
    setFocused(true);
    setDraftTextWithNumber(field.value);
  };

  const handleInputBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFocused(false);
    changeValue(Number.parseFloat(e.target.value.trim()));
    field.onBlur?.();
  };

  return (
    <TextField
      value={inputText}
      onChange={handleInputChange}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      onKeyDown={(e) => {
        switch (e.key) {
          case "ArrowUp":
            e.preventDefault();
            handleArrowUpPress();
            break;
          case "ArrowDown":
            e.preventDefault();
            handleArrowDownPress();
            break;
          default:
        }
      }}
      slotProps={{
        input: {
          startAdornment: _spinner && (
            <InputAdornment position="start">
              <IconButton onClick={handleMinusSpinnerClick}>
                <RemoveOutlined />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: _spinner && (
            <InputAdornment position="end">
              <IconButton onClick={handlePlusSpinnerClick}>
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
