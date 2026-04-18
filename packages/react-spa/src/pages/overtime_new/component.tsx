import { useOvertime } from "@/api/netlify";
import { NumberField } from "@/components/form/number";
import { CloseOutlined, PlusOneOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useForm } from "@tanstack/react-form";
import { useNotifications } from "@toolpad/core";
import dayjs from "dayjs";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";

const schema = z.object({
  hours: z.number().int(),
  date: z.date(),
  reason: z.string(),
});

type FormValues = z.infer<typeof schema>;

export const Component = () => {
  const formId = React.useId();

  const params = useParams();
  const navigate = useNavigate();
  const add = useOvertime();
  const snackbar = useNotifications();
  const form = useForm({
    defaultValues: {
      hours: 8,
      date: new Date(),
      reason: "",
    } as FormValues,
    validators: {
      onChange: schema,
    },
    onSubmit: async ({ value: data }) => {
      await add.mutateAsync(
        {
          data: {
            rows: [
              {
                hours: data.hours,
                date: data.date.toISOString(),
                reason: data.reason,
              },
            ],
          },
        },
        {
          onSuccess: () => {
            form.reset();
            handleNavigateToOvertime();
          },
          onError: () => {
            snackbar.show("Some error", {
              severity: "error",
            });
          },
        },
      );
    },
  });

  const handleNavigateToOvertime = () => {
    navigate(`/${params.lang}/overtime`);
  };

  return (
    <Card>
      <CardHeader
        title="Overtime"
        action={
          <IconButton onClick={handleNavigateToOvertime}>
            <CloseOutlined />
          </IconButton>
        }
      />
      <CardContent>
        <form
          id={formId}
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          onReset={() => form.reset()}
        >
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12 }}>
              <form.Field name="date">
                {(field) => (
                  <DatePicker
                    value={dayjs(field.state.value)}
                    onChange={(e) => {
                      const date = e?.toDate();
                      if (!date) return;

                      field.handleChange(date);
                    }}
                    slotProps={{
                      textField: {
                        onBlur: field.handleBlur,
                        error: !!field.state.meta.errors.length,
                        helperText: field.state.meta.errors.at(0)?.message,
                        fullWidth: true,
                      },
                    }}
                    label="Date"
                  />
                )}
              </form.Field>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <form.Field name="hours">
                {(field) => (
                  <NumberField
                    field={{
                      value: field.state.value,
                      onChange: field.handleChange,
                      onBlur: field.handleBlur,
                    }}
                    error={!!field.state.meta.errors.length}
                    helperText={field.state.meta.errors.at(0)?.message}
                    fullWidth
                    label="Hours"
                  />
                )}
              </form.Field>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <form.Field name="reason">
                {(field) => (
                  <TextField
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    error={!!field.state.meta.errors.length}
                    helperText={field.state.meta.errors.at(0)?.message}
                    fullWidth
                    label="Reason"
                    multiline
                    minRows={2}
                  />
                )}
              </form.Field>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <CardActions>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => {
            return (
              <Button
                form={formId}
                startIcon={
                  isSubmitting ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    <PlusOneOutlined />
                  )
                }
                disabled={!canSubmit}
                type="submit"
              >
                add
              </Button>
            );
          }}
        </form.Subscribe>
        <Button form={formId} type="reset">
          reset
        </Button>
      </CardActions>
    </Card>
  );
};
