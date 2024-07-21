import { Send, ArrowBack } from "@mui/icons-material";
import {
  Typography,
  Button,
  Box,
  Stack,
  Paper,
  TextField,
} from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { app } from "@/api/firebase/app";

export function ForgotPassword() {
  const { t } = useTranslation();

  const mutation = useMutation<
    {
      email: string;
    },
    Error,
    string
  >({
    async mutationFn(email) {
      await sendPasswordResetEmail(getAuth(app), email);
      return { email };
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },

    async onSubmit(props) {
      await mutation.mutateAsync(props.value.email, {
        onError(error) {
          toast.error(error.message);
        },
      });
    },
  });

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          flexGrow: 1,
          overflow: "hidden",
        }}
      ></Box>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: { xs: "100%", md: 450 },
          p: [6, 12],
          borderRadius: 0,
        }}
      >
        <Typography variant="h5">Forgot Password 🔒</Typography>
        <Typography color="secondary">
          Enter your email and we'll send you instructions to reset your
          password
        </Typography>
        <Stack
          component={"form"}
          onSubmit={async (evt) => {
            evt.preventDefault();
            evt.stopPropagation();

            await form.handleSubmit();
          }}
          onReset={(evt) => {
            evt.stopPropagation();

            form.reset();
          }}
          noValidate
          autoComplete="off"
          mt={3}
          spacing={6}
        >
          <form.Field
            name="email"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.string().email(),
            }}
          >
            {(field) => {
              return (
                <TextField
                  value={field.state.value}
                  onChange={(evt) => {
                    field.handleChange(evt.target.value);
                  }}
                  onBlur={field.handleBlur}
                  error={!!field.state.meta.errors.length}
                  helperText={field.state.meta.errors[0]}
                  label="Email"
                  fullWidth
                  type="email"
                />
              );
            }}
          </form.Field>
          <form.Subscribe selector={(state) => state.canSubmit}>
            {(canSubmit) => {
              return (
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  variant="contained"
                  size="large"
                  fullWidth
                  endIcon={<Send />}
                >
                  {t("send reset link", { ns: "button" })}
                </Button>
              );
            }}
          </form.Subscribe>
        </Stack>
        <Button
          component={RouterLink}
          to={"/login"}
          startIcon={<ArrowBack />}
          size="large"
          sx={{ mt: 3 }}
        >
          Back to login
        </Button>
      </Paper>
    </Box>
  );
}
