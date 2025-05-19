import { NumberField } from "@/components/form/number";
import { error } from "@/lib/utils";
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
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import React from "react";
import { useOvertime } from "@/api/netlify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotifications } from "@toolpad/core";
import { z } from "zod";
import { CloseOutlined, PlusOneOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router";

const schema = z.object({
  hours: z.number().int(),
  date: z.date(),
  reason: z.string(),
});

type FormValues = z.infer<typeof schema>;

const useAddForm = () =>
  useForm<FormValues>({
    defaultValues: {
      hours: 8,
      date: new Date(),
      reason: "",
    },
    resolver: zodResolver(schema),
  });

export const Component = () => {
  const formId = React.useId();

  const params = useParams();
  const navigate = useNavigate();
  const add = useOvertime();
  const form = useAddForm();
  const snackbar = useNotifications();

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
          onSubmit={form.handleSubmit((data) => {
            add.mutate(
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
          }, error)}
          onReset={() => form.reset()}
        >
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12 }}>
              <Controller
                control={form.control}
                name="date"
                render={({ field, fieldState }) => (
                  <DatePicker
                    value={dayjs(field.value)}
                    onChange={(e) => {
                      field.onChange(e?.toDate());
                    }}
                    slotProps={{
                      textField: {
                        onBlur: field.onBlur,
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message,
                        fullWidth: true,
                      },
                    }}
                    label="Date"
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                control={form.control}
                name="hours"
                render={({ field, fieldState }) => (
                  <NumberField
                    field={field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                    label="Hours"
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                control={form.control}
                name="reason"
                render={({ field, fieldState }) => (
                  <TextField
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                    label="Reason"
                    multiline
                    minRows={2}
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <CardActions>
        <Button
          form={formId}
          startIcon={
            add.isPending ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <PlusOneOutlined />
            )
          }
          disabled={add.isPending}
          type="submit"
        >
          add
        </Button>
        <Button form={formId} type="reset">
          reset
        </Button>
      </CardActions>
    </Card>
  );
};
