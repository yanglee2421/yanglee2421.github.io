import { AddOutlined, CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid2,
  IconButton,
  Switch,
  Tab,
  Tabs,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";
import { useDbStore } from "@/hooks/store/useDbStore";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import * as mathjs from "mathjs";

type NumberFieldProps = Omit<TextFieldProps, "value" | "onChange"> & {
  value: number;
  onChange(val: number): void;
};

const renderVal = (
  focused: boolean,
  focusVal: number | string,
  value: number
) => {
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

const getDate = (hour = 0, minutes = 0, seconds = 0, millisecond = 0) => {
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minutes);
  date.setSeconds(seconds);
  date.setMilliseconds(millisecond);
  return date;
};

const calculatorSubsidy = (start: Date, end: Date, isOutside: boolean) => {
  const base = isOutside ? 100 : 50;
  const startVal = new Date(start);
  const endVal = new Date(end);

  startVal.setHours(0);
  startVal.setMinutes(0);
  startVal.setSeconds(0);
  startVal.setMilliseconds(0);
  endVal.setHours(23);
  endVal.setMinutes(59);
  endVal.setSeconds(59);
  endVal.setMilliseconds(1000);

  return mathjs
    .multiply(
      mathjs.divide(
        mathjs.subtract(
          mathjs.bignumber(endVal.getTime()),
          mathjs.bignumber(startVal.getTime())
        ),
        mathjs.bignumber(1000 * 60 * 60 * 24)
      ),
      mathjs.bignumber(base)
    )
    .toString();
};

const calculatorAmount = (
  start: Date,
  end: Date,
  isOutside: boolean,
  enableDate: boolean,
  amount: number
) => {
  if (!enableDate) return amount;
  return calculatorSubsidy(start, end, isOutside);
};

const NumberField = (props: NumberFieldProps) => {
  const { value, onChange, onBlur, onFocus, ...restProps } = props;
  const [focused, setFocused] = React.useState(false);
  const [focusVal, setFocusVal] = React.useState<number | string>("");

  return (
    <TextField
      value={renderVal(focused, focusVal, value)}
      onFocus={(e) => {
        onFocus?.(e);
        setFocused(true);
        setFocusVal(valToFocusVal(value));
      }}
      onBlur={(e) => {
        onBlur?.(e);
        setFocused(false);
        onChange(Number.parseFloat(e.target.value.trim()));
      }}
      onChange={(e) => {
        setFocusVal(e.target.value);
      }}
      slotProps={{ htmlInput: { inputMode: "numeric" } }}
      {...restProps}
    />
  );
};

const schema = z.object({
  invoices: z
    .object({
      amount: z.number().or(z.nan()),
      staff: z.string().min(1),
      note: z.string(),
      start: z.date(),
      end: z.date(),
      isOutside: z.boolean(),
      type: z.enum(["invoice", "subsidy"] as const),
    })
    .refine(
      (val) => {
        if (val.type === "invoice") {
          return !Number.isNaN(val.amount);
        }

        return true;
      },
      { message: "must be a number", path: ["amount"] }
    )
    .array()
    .min(1),
});

type FormValues = z.infer<typeof schema>;

export const Calculator = () => {
  const formId = React.useId();

  const set = useDbStore((s) => s.set);
  const params = useParams();
  const navigate = useNavigate();
  const staffs = useDbStore((s) => s.staffs);
  const staffMap = React.useMemo(() => {
    const map = new Map<string, string>();

    staffs.forEach((i) => {
      map.set(i.alias, i.name);
    });

    return map;
  }, [staffs]);

  const form = useForm<FormValues>({
    defaultValues: {
      invoices: [
        {
          amount: Number.NaN,
          staff: "",
          note: "",
          start: getDate(),
          end: getDate(),
          isOutside: true,
          type: "invoice",
        },
      ],
    },

    resolver: zodResolver(schema),
  });

  const fields = useFieldArray({ control: form.control, name: "invoices" });

  return (
    <Card>
      <CardHeader title="Calculator" />
      <CardContent>
        <form
          id={formId}
          action={() =>
            form.handleSubmit(async (data) => {
              set((d) => {
                data.invoices.forEach((i) => {
                  d.invoices.push({
                    ...i,
                    id: crypto.randomUUID(),
                    staff: i.staff
                      .split("@")
                      .map((i) => staffMap.get(i.trim()) || i.trim()),
                    date: Date.now(),
                    amount: +calculatorAmount(
                      i.start,
                      i.end,
                      i.isOutside,
                      i.type === "subsidy",
                      i.amount
                    ),
                  });
                });
              });

              await navigate("/" + params.lang + "/invoices");
            }, console.error)()
          }
          onReset={() => form.reset()}
          noValidate
        >
          <Grid2 container spacing={6}>
            {fields.fields.map((f, idx) => {
              const typeVal = form.watch(`invoices.${idx}.type`);
              const startVal = form.watch(`invoices.${idx}.start`);
              const endVal = form.watch(`invoices.${idx}.end`);
              const isOutsideVal = form.watch(`invoices.${idx}.isOutside`);

              const isSubsidy = typeVal === "subsidy";

              return (
                <React.Fragment key={f.id}>
                  {!!idx && (
                    <Grid2 size={{ xs: 12 }}>
                      <Divider />
                    </Grid2>
                  )}
                  <Grid2 size={{ xs: 12 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <FormLabel sx={{ color: (t) => t.palette.primary.main }}>
                        #{idx + 1}
                      </FormLabel>
                      {!!idx && (
                        <IconButton
                          color="error"
                          onClick={() => fields.remove(idx)}
                          sx={{ marginInlineStart: "auto" }}
                        >
                          <CloseOutlined />
                        </IconButton>
                      )}
                    </Box>
                  </Grid2>
                  <Grid2 size={12}>
                    <Controller
                      control={form.control}
                      name={`invoices.${idx}.type`}
                      render={({ field }) => (
                        <Tabs
                          value={field.value}
                          onChange={(e, val) => {
                            field.onChange(val);
                            void e;
                          }}
                        >
                          <Tab label="Invoice" value="invoice" />
                          <Tab label="Subsidy" value="subsidy" />
                        </Tabs>
                      )}
                    />
                  </Grid2>
                  {isSubsidy && (
                    <>
                      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                        <Controller
                          control={form.control}
                          name={`invoices.${idx}.start`}
                          render={({ field }) => (
                            <DatePicker
                              value={dayjs(field.value)}
                              onChange={(val) => {
                                if (!val) return;
                                field.onChange(
                                  val
                                    .hour(0)
                                    .minute(0)
                                    .second(0)
                                    .millisecond(0)
                                    .toDate()
                                );
                              }}
                              maxDate={dayjs(endVal)}
                              slotProps={{
                                textField: { fullWidth: true },
                              }}
                            />
                          )}
                        />
                      </Grid2>
                      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                        <Controller
                          control={form.control}
                          name={`invoices.${idx}.end`}
                          render={({ field }) => (
                            <DatePicker
                              value={dayjs(field.value)}
                              onChange={(val) => {
                                if (!val) return;
                                field.onChange(
                                  val
                                    .hour(0)
                                    .minute(0)
                                    .second(0)
                                    .millisecond(0)
                                    .toDate()
                                );
                              }}
                              minDate={dayjs(startVal)}
                              slotProps={{
                                textField: { fullWidth: true },
                              }}
                            />
                          )}
                        />
                      </Grid2>
                      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          <Controller
                            control={form.control}
                            name={`invoices.${idx}.isOutside`}
                            render={({ field }) => (
                              <FormControlLabel
                                label="Outside"
                                control={
                                  <Switch
                                    checked={field.value}
                                    onChange={(e, checked) => {
                                      void e;
                                      field.onChange(checked);
                                    }}
                                  />
                                }
                              />
                            )}
                          />
                        </Box>
                      </Grid2>
                    </>
                  )}
                  <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <Controller
                      control={form.control}
                      name={`invoices.${idx}.amount`}
                      render={({ field, fieldState }) => (
                        <NumberField
                          value={
                            isSubsidy
                              ? +calculatorSubsidy(
                                  startVal,
                                  endVal,
                                  isOutsideVal
                                )
                              : field.value
                          }
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          label="Amount"
                          fullWidth
                          slotProps={{
                            input: {
                              readOnly: isSubsidy,
                            },
                            htmlInput: { inputMode: "numeric" },
                          }}
                        />
                      )}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <Controller
                      control={form.control}
                      name={`invoices.${idx}.staff`}
                      render={({ field, fieldState }) => (
                        <TextField
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          label="Staff"
                          fullWidth
                        />
                      )}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <Controller
                      control={form.control}
                      name={`invoices.${idx}.note`}
                      render={({ field, fieldState }) => (
                        <TextField
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          label="Note"
                          fullWidth
                          multiline
                        />
                      )}
                    />
                  </Grid2>
                </React.Fragment>
              );
            })}
          </Grid2>
        </form>
      </CardContent>
      <CardActions>
        <Button type={"submit"} form={formId} variant="contained">
          Save
        </Button>
        <Button type={"reset"} form={formId} variant="outlined">
          Reset
        </Button>
        <Button
          startIcon={<AddOutlined />}
          onClick={() => {
            fields.append({
              amount: Number.NaN,
              staff: "",
              note: "",
              type: "invoice",
              start: getDate(),
              end: getDate(),
              isOutside: true,
            });
          }}
          variant="outlined"
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
};
