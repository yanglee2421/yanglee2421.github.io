import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Link,
  Typography,
  Button,
  Paper,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { SignInButtonGroup } from "@/components/shared/SignInButtonGroup";
import { useSignIn } from "@/hooks/api-firebase/useSignIn";
import { timeout } from "@/utils/timeout";

export function Login() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    async onSubmit(props) {
      await timeout(1000 * 1);
      await mutation.mutateAsync(
        {
          email: props.value.email,
          password: props.value.password,
        },
        {
          onError(error) {
            toast.error(error.message);
          },
        },
      );
    },
  });

  const mutation = useSignIn();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
      }}
    >
      <div></div>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: { xs: "100%", md: 450 },
          p: [6, 12],
          borderRadius: 0,
          marginLeft: "auto",
        }}
      >
        <Typography variant="h5">Welcome to Materio!👋🏻</Typography>
        <Typography color="secondary">
          Please sign-in to your account and start the adventure
        </Typography>
        <Stack
          component={"form"}
          onSubmit={(evt) => {
            evt.preventDefault();
            form.handleSubmit();

            if (!import.meta.env.DEV) {
              return;
            }

            const errorEntries = Object.entries(form.state.fieldMeta)
              .map(([key, value]) => {
                return [key, value.errors];
              })
              .filter(([, error]) => error.length);

            if (!errorEntries.length) {
              return;
            }

            console.error(Object.fromEntries(errorEntries));
          }}
          onReset={() => {
            form.reset();
          }}
          noValidate
          autoComplete="off"
          mt={3}
          spacing={3}
        >
          <form.Field
            name="email"
            validatorAdapter={zodValidator}
            validators={{ onChange: z.string().email() }}
            defaultValue=""
            children={(field) => {
              return (
                <TextField
                  value={field.state.value}
                  onChange={(evt) => {
                    field.handleChange(evt.target.value);
                  }}
                  onBlur={field.handleBlur}
                  label="Email"
                  error={!!field.state.meta.errors.length}
                  helperText={field.state.meta.errors[0]}
                />
              );
            }}
          />
          <form.Field
            name="password"
            validatorAdapter={zodValidator}
            validators={{
              onChange: z.string().min(8).max(16),
            }}
            defaultValue=""
            children={(field) => {
              return (
                <TextField
                  value={field.state.value}
                  onChange={(evt) => {
                    field.handleChange(evt.target.value);
                    field.validate("submit");
                  }}
                  onBlur={field.handleBlur}
                  label="Password"
                  error={!!field.state.meta.errors.length}
                  helperText={field.state.meta.errors[0]}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setShowPassword((prev) => !prev);
                          }}
                        >
                          {showPassword ? (
                            <VisibilityOffOutlined />
                          ) : (
                            <VisibilityOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              );
            }}
          />
          <Box>
            <Link
              component={RouterLink}
              to={"/forgot-password"}
              underline="hover"
            >
              Forgot Password?
            </Link>
          </Box>
          <form.Subscribe
            selector={(state) => state.canSubmit}
            children={(canSubmit) => {
              return (
                <Button
                  disabled={!canSubmit}
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                >
                  sign in
                </Button>
              );
            }}
          />
        </Stack>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          pt={2}
        >
          <Typography color="secondary">New on our platform?</Typography>
          <Link component={RouterLink} to={"/signup"} underline="hover">
            Create an account
          </Link>
        </Box>
        <Divider
          sx={{
            color(theme) {
              return theme.palette.text.secondary;
            },
          }}
        >
          Or
        </Divider>
        <Box textAlign={"center"} mt={2}>
          <SignInButtonGroup />
        </Box>
      </Paper>
    </Box>
  );
}
