// MUI Imports
import { Button, Grid, Paper, Stack } from "@mui/material";

// Form Imports
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Components Imports
import { ItemText } from "@/components/form";

export function SevenForm() {
  const formCtx = useForm<FormValues>({
    defaultValues: {
      name: "",
      age: 0,
    },

    resolver: zodResolver(
      z.object({
        name: z.string(),
        age: z.number(),
      })
    ),
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
        >
          <Grid item xs={12} sm={6}>
            <ItemText name="name" label="Name"></ItemText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ItemText
              name="age"
              label="Age"
              type="number"
              valueAsNumber
            ></ItemText>
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

export interface FormValues {
  name: string;
  age: number;
}
