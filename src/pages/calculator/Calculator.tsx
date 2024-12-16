import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid2,
  TextField,
  TextFieldProps,
} from "@mui/material";
import * as math from "mathjs";
import React from "react";

export const Calculator = () => {
  const [result, setResult] = React.useState("");
  const formId = React.useId();
  const [amount, setAmount] = React.useState(Number.NaN);
  const [staff, setStaff] = React.useState("");
  const [note, setNote] = React.useState("");

  return (
    <Card>
      <CardHeader title="Calculator" subheader={result} />
      <CardContent>
        <form
          id={formId}
          action={(fd) => {
            setResult(
              math.add(
                math.bignumber(fd.get("num1") + ""),
                math.bignumber(fd.get("num2") + ""),
              ).toString(),
            );
          }}
          onReset={() => {}}
          noValidate
        >
          <Grid2 container spacing={6}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <NumberField
                value={amount}
                onChange={setAmount}
                name="num1"
                label="Amount"
                fullWidth
                inputMode="numeric"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                value={staff}
                onChange={(e) => setStaff(e.target.value)}
                name="num2"
                label="Staff"
                fullWidth
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                value={note}
                onChange={(e) => setNote(e.target.value)}
                name="num2"
                label="Note"
                fullWidth
                multiline
                minRows={2}
              />
            </Grid2>
          </Grid2>
        </form>
      </CardContent>
      <CardActions>
        <Button type={"submit"} form={formId} variant="contained">Save</Button>
        <Button type={"reset"} form={formId} variant="outlined">Reset</Button>
      </CardActions>
    </Card>
  );
};

type NumberFieldProps = Omit<TextFieldProps, "value" | "onChange"> & {
  value: number;
  onChange(val: number): void;
};

function NumberField(props: NumberFieldProps) {
  const { value, onChange, onBlur, onFocus, ...restProps } = props;
  const [focused, setFocused] = React.useState(false);
  const [focusVal, setFocusVal] = React.useState<number | string>("");

  void value;

  const renderVal = () => {
    if (focused) {
      return focusVal;
    }

    if (Number.isNaN(value)) {
      return "";
    }

    return value;
  };

  const valToFocusVal = (val: number) => {
    if (Number.isNaN(val)) {
      return "";
    }

    return val;
  };

  return (
    <TextField
      value={renderVal()}
      onFocus={(e) => {
        onFocus?.(e);
        setFocused(true);
        setFocusVal(valToFocusVal(value));
      }}
      onBlur={(e) => {
        onBlur?.(e);
        setFocused(false);
        onChange(Number.parseFloat(e.target.value));
      }}
      onChange={(e) => {
        setFocusVal(e.target.value);
      }}
      {...restProps}
    />
  );
}
