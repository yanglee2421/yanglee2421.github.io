import {
  AddOutlined,
  CloseOutlined,
  RestoreOutlined,
  SaveOutlined,
} from "@mui/icons-material";
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
  Grid,
  IconButton,
  ToggleButtonGroup,
  TextField,
  TextFieldProps,
  ToggleButton,
  Typography,
  RadioGroup,
  Radio,
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

const renderVal = (
  focused: boolean,
  focusVal: number | string,
  value: number,
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

type NumberFieldProps = Omit<TextFieldProps, "value" | "onChange"> & {
  value: number;
  onChange(val: number): void;
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

const getDate = () => {
  return dayjs(new Date()).startOf("day").toISOString();
};

const calculatorSubsidy = (
  start: string,
  end: string,
  subsidyPerDay: string,
) => {
  const startVal = dayjs(start).startOf("day").valueOf();
  const endVal = dayjs(end).endOf("day").valueOf();

  return mathjs
    .multiply(
      mathjs.divide(
        mathjs.subtract(
          mathjs.sum(mathjs.bignumber(endVal), mathjs.bignumber(1)),
          mathjs.bignumber(startVal),
        ),
        mathjs.bignumber(1000 * 60 * 60 * 24),
      ),
      mathjs.bignumber(subsidyPerDay),
    )
    .toString();
};

const calculatorAmount = (
  start: string,
  end: string,
  subsidyPerDay: string,
  enableDate: boolean,
  amount: number,
) => {
  if (!enableDate) return amount;
  return calculatorSubsidy(start, end, subsidyPerDay);
};

const schema = z.object({
  invoices: z
    .object({
      amount: z.number().or(z.nan()),
      staff: z.string().min(1),
      note: z.string(),
      start: z.string(),
      end: z.string(),
      subsidyPerDay: z.string(),
      type: z.enum(["invoice", "subsidy"] as const),
    })
    .refine(
      (val) => {
        if (val.type === "invoice") {
          return !Number.isNaN(val.amount);
        }

        return true;
      },
      { message: "must be a number", path: ["amount"] },
    )
    .array()
    .min(1),
});

type FormValues = z.infer<typeof schema>;

export const Component = () => {
  const formId = React.useId();
  const datalistId = React.useId();

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
          subsidyPerDay: "100",
          type: "invoice",
        },
      ],
    },

    resolver: zodResolver(schema),
  });

  const fields = useFieldArray({ control: form.control, name: "invoices" });

  const renderInvoice = (idx: number) => {
    return (
      <>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            control={form.control}
            name={`invoices.${idx}.amount`}
            render={({ field, fieldState }) => (
              <NumberField
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label="Amount"
                fullWidth
                slotProps={{
                  htmlInput: { inputMode: "numeric" },
                }}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
                placeholder="Split by '@'"
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
                multiline={false}
                slotProps={{
                  htmlInput: {
                    list: datalistId,
                    autoComplete: "off",
                  },
                }}
              />
            )}
          />
        </Grid>
      </>
    );
  };

  const renderSubsidy = (idx: number) => {
    const startVal = form.watch(`invoices.${idx}.start`);
    const endVal = form.watch(`invoices.${idx}.end`);
    const subsidyPerDay = form.watch(`invoices.${idx}.subsidyPerDay`);

    return (
      <>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            key={`invoices.${idx}.start`}
            control={form.control}
            name={`invoices.${idx}.start`}
            render={({ field }) => (
              <DatePicker
                value={dayjs(field.value)}
                onChange={(val) => {
                  if (!val) return;
                  field.onChange(val.startOf("day").toISOString());
                }}
                maxDate={dayjs(endVal)}
                slotProps={{
                  textField: { fullWidth: true, label: "Start Date" },
                }}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            key={`invoices.${idx}.end`}
            control={form.control}
            name={`invoices.${idx}.end`}
            render={({ field }) => (
              <DatePicker
                value={dayjs(field.value)}
                onChange={(val) => {
                  if (!val) return;
                  field.onChange(val.startOf("day").toISOString());
                }}
                minDate={dayjs(startVal)}
                slotProps={{
                  textField: { fullWidth: true, label: "End Date" },
                }}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            control={form.control}
            name={`invoices.${idx}.amount`}
            render={({ field, fieldState }) => (
              <NumberField
                value={+calculatorSubsidy(startVal, endVal, subsidyPerDay)}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label="Amount"
                fullWidth
                slotProps={{
                  input: { readOnly: true },
                  htmlInput: { inputMode: "numeric" },
                }}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
                placeholder="Split by '@'"
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
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
                multiline={false}
                slotProps={{
                  htmlInput: {
                    list: datalistId,
                    autoComplete: "off",
                  },
                }}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormLabel>Subsidy per day</FormLabel>
          <Controller
            control={form.control}
            name={`invoices.${idx}.subsidyPerDay`}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onChange={(e, val) => {
                  void e;
                  field.onChange(val);
                }}
                row
              >
                <FormControlLabel label="100" control={<Radio value="100" />} />
                <FormControlLabel label="50" control={<Radio value="50" />} />
              </RadioGroup>
            )}
          />
        </Grid>
      </>
    );
  };

  return (
    <Card>
      <datalist id={datalistId}>
        <option value="Subsidy"></option>
        <option value="Train ticket"></option>
        <option value="Accommodation"></option>
        <option value="Taxi"></option>
      </datalist>
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
                      i.subsidyPerDay,
                      i.type === "subsidy",
                      i.amount,
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
          <Grid container spacing={4}>
            {fields.fields.map((f, idx) => {
              const typeVal = form.watch(`invoices.${idx}.type`);
              const isSubsidy = typeVal === "subsidy";

              return (
                <React.Fragment key={f.id}>
                  {!!idx && (
                    <Grid size={{ xs: 12 }}>
                      <Divider />
                    </Grid>
                  )}
                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <FormLabel sx={{ color: (t) => t.palette.primary.main }}>
                        <Typography variant="h6">#{idx + 1}</Typography>
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
                  </Grid>
                  <Grid size={12}>
                    <Controller
                      control={form.control}
                      name={`invoices.${idx}.type`}
                      render={({ field }) => (
                        <ToggleButtonGroup
                          value={field.value}
                          onChange={(e, val) => {
                            field.onChange(val);
                            void e;
                          }}
                          exclusive
                        >
                          <ToggleButton value="invoice">Invoice</ToggleButton>
                          <ToggleButton value="subsidy">Subsidy</ToggleButton>
                        </ToggleButtonGroup>
                      )}
                    />
                  </Grid>
                  {isSubsidy ? renderSubsidy(idx) : renderInvoice(idx)}
                </React.Fragment>
              );
            })}
          </Grid>
        </form>
      </CardContent>
      <CardActions>
        <Button type={"submit"} form={formId} startIcon={<SaveOutlined />}>
          Save
        </Button>
        <Button type={"reset"} form={formId} startIcon={<RestoreOutlined />}>
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
              subsidyPerDay: "100",
            });
          }}
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
};
