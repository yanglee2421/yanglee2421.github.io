import { overtimeCollection } from "@/api/firebase/app";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddOutlined,
  PlusOneOutlined,
  RotateRightOutlined,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, Timestamp } from "firebase/firestore";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { error } from "@/lib/utils";

const schema = z.object({
  hours: z.number().int(),
  date: z.date(),
});

type FormValues = z.infer<typeof schema>;

export function Add() {
  const [show, setShow] = React.useState(false);
  const formId = React.useId();
  const form = useForm<FormValues>({
    defaultValues: {
      hours: 8,
      date: new Date(),
    },

    resolver: zodResolver(schema),
  });

  const handleClose = () => {
    setShow(false);
    form.reset();
  };

  const user = useCurrentUser();
  const queryClient = useQueryClient();
  const add = useMutation<unknown, Error, FormValues>({
    mutationFn(data) {
      return addDoc(overtimeCollection, {
        hours: data.hours,
        userId: user?.uid,
        date: Timestamp.fromDate(data.date),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["firebase", "overtime"],
      });
      handleClose();
    },
  });

  return (
    <>
      <Button
        onClick={() => setShow(true)}
        variant="contained"
        startIcon={<AddOutlined />}
      >
        add
      </Button>
      <Dialog open={show} onClose={handleClose} fullWidth>
        <DialogTitle>Add</DialogTitle>
        <DialogContent>
          <form
            id={formId}
            onSubmit={form.handleSubmit(async (data) => {
              await add.mutateAsync(data);
            }, error)}
            onReset={handleClose}
          >
            <Grid container spacing={6} sx={{ mt: 2 }}>
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
                    <TextField
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value) || 0)
                      }
                      onBlur={field.onBlur}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      fullWidth
                      label="Hours"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            form={formId}
            startIcon={
              add.isPending ? (
                <RotateRightOutlined className="animate-spin" />
              ) : (
                <PlusOneOutlined />
              )
            }
            disabled={add.isPending}
            type="submit"
            variant="contained"
          >
            add
          </Button>
          <Button form={formId} type="reset" variant="outlined">
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
