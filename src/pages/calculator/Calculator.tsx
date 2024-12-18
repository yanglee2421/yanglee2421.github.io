import { useDbStore } from "@/hooks/store/useDbStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddOutlined, CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormLabel,
  Grid2,
  IconButton,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";

const schema = z.object({
  invoices: z.array(z.object({
    amount: z.number(),
    staff: z.string().min(1),
    note: z.string(),
  })).min(1),
});

type FormValues = z.infer<typeof schema>;

export const Calculator = () => {
  const set = useDbStore((s) => s.set);
  const formId = React.useId();
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
                    staff: i.staff.split("@").map((i) =>
                      staffMap.get(i.trim()) || i.trim()
                    ),
                    date: Date.now(),
                  });
                });
              });

              await navigate("/" + params.lang + "/invoices");
            }, console.error)()}
          onReset={() => form.reset()}
          noValidate
        >
          <Grid2 container spacing={6}>
            {fields.fields.map((f, idx) => (
              <React.Fragment key={f.id}>
                {!!idx && (
                  <Grid2 size={{ xs: 12 }}>
                    <Divider />
                  </Grid2>
                )}
                <Grid2 size={{ xs: 12 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FormLabel
                      sx={{ color: (t) => t.palette.primary.main }}
                    >
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
                <Controller
                  control={form.control}
                  name={`invoices.${idx}.amount`}
                  render={({ field, fieldState }) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                      <NumberField
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        label="Amount"
                        fullWidth
                        inputMode="numeric"
                      />
                    </Grid2>
                  )}
                />
                <Controller
                  control={form.control}
                  name={`invoices.${idx}.staff`}
                  render={({ field, fieldState }) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                      <TextField
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        label="Staff"
                        fullWidth
                      />
                    </Grid2>
                  )}
                />
                <Controller
                  control={form.control}
                  name={`invoices.${idx}.note`}
                  render={({ field, fieldState }) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
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
                    </Grid2>
                  )}
                />
              </React.Fragment>
            ))}
          </Grid2>
        </form>
      </CardContent>
      <CardActions>
        <Button type={"submit"} form={formId} variant="contained">Save</Button>
        <Button type={"reset"} form={formId} variant="outlined">Reset</Button>
        <Button
          startIcon={<AddOutlined />}
          onClick={() => {
            fields.append({ amount: Number.NaN, staff: "", note: "" });
          }}
          variant="outlined"
        >
          Add
        </Button>
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
        onChange(Number.parseFloat(e.target.value.trim()));
      }}
      onChange={(e) => {
        setFocusVal(e.target.value);
      }}
      {...restProps}
    />
  );
}
