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

export function Login() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    async onSubmit(props) {
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

    validatorAdapter: zodValidator,
  });

  const mutation = useSignIn();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Box
      position={"fixed"}
      display={"flex"}
      height={"100%"}
      sx={{
        inset: 0,
      }}
    >
      <Box flex={1} overflow={"hidden"} />
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          maxWidth: 450,
          p: [6, 12],
          borderRadius: 0,
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
            form.handleSubmit().catch((error) => {
              console.error(error);
            });
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
                  helperText={field.state.meta.errors.join(", ")}
                />
              );
            }}
          />
          <form.Field
            name="password"
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
                  helperText={field.state.meta.errors.join(", ")}
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
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => {
              return (
                <Button
                  disabled={!canSubmit || isSubmitting}
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
