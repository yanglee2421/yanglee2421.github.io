// MUI Imports
import { Button, Grid, Paper, Stack, TextField } from "@mui/material";

// Form Imports
import {
  useForm,
  FormProvider,
  useFormContext,
  useController,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Components Imports
import { ItemText } from "@/components/form";

// React Imports
// import React from "react";

export function SevenForm() {
  const formCtx = useForm<FormValues>({
    defaultValues: {
      name: "",
      age: null,
    },

    resolver: zodResolver(zodSchema),
  });

  return (
    <Paper sx={{ padding: 3 }}>
      <FormProvider {...formCtx}>
        <Grid
          container
          spacing={3}
          component={"form"}
          onSubmit={formCtx.handleSubmit(
            (data) => {
              console.log(data);
            },
            (error) => {
              console.warn(error);
            }
          )}
          onReset={() => {
            formCtx.reset();
          }}
          noValidate
          autoComplete="off"
        >
          <Grid item xs={12} sm={6}>
            <ItemText name="name" label="Name"></ItemText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <IntInput></IntInput>
          </Grid>
          <Grid item xs={12}>
            <Stack direction={"row"} spacing={3}>
              <Button type="submit" variant="contained">
                submit
              </Button>
              <Button type="reset" variant="outlined">
                reset
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </Paper>
  );
}

const zodSchema = z.object({
  name: z.string().min(1).max(16),
  age: z.number().int().nullable(),
});

export type FormValues = z.infer<typeof zodSchema>;

function IntInput() {
  const formCtx = useFormContext();
  const controller = useController({
    control: formCtx.control,
    name: "age",
    defaultValue: null,
  });

  return (
    <TextField
      value={(() => {
        if (controller.field.value === null) {
          return "";
        }

        return controller.field.value;
      })()}
      onChange={(evt) => {
        const stringValue = evt.target.value.replace(/\D/g, "");

        if (stringValue) {
          controller.field.onChange(Number.parseInt(stringValue));

          return;
        }

        controller.field.onChange(null);
      }}
      fullWidth
      label="Age"
      type="number"
      error={!!controller.fieldState.error}
      helperText={controller.fieldState.error?.message}
    ></TextField>
  );
}
