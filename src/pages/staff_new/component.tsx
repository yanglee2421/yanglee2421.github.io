import { db } from "@/lib/db";
import { warn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddOutlined,
  CloseOutlined,
  RestoreOutlined,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  alias: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

const useAddForm = () =>
  useForm<FormValues>({
    defaultValues: {
      name: "",
      alias: "",
    },
    resolver: zodResolver(schema),
  });

export const Component = () => {
  const formId = React.useId();

  const form = useAddForm();
  const navigate = useNavigate();
  const params = useParams();

  return (
    <Card>
      <CardHeader
        action={
          <IconButton
            onClick={() => {
              navigate(`/${params.lang}/staff`);
            }}
          >
            <CloseOutlined />
          </IconButton>
        }
      />
      <CardContent>
        <form
          id={formId}
          action={() =>
            form.handleSubmit(async (data) => {
              await db.staffs.add({
                enable: true,
                name: data.name.trim(),
                alias: data.alias.trim(),
              });
              form.reset();
            }, warn)()
          }
          noValidate
          onReset={() => form.reset()}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                    label="Name"
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                control={form.control}
                name="alias"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                    label="Alias"
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <CardActions>
        <Button type="submit" form={formId} startIcon={<AddOutlined />}>
          Add
        </Button>
        <Button type="reset" form={formId} startIcon={<RestoreOutlined />}>
          Reset
        </Button>
      </CardActions>
    </Card>
  );
};
