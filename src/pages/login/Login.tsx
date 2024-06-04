import {
  Box,
  Divider,
  Link,
  Typography,
  Button,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { InputPassword } from "@/components/form/InputPassword";
import { SignInButtonGroup } from "@/components/shared/SignInButtonGroup";
import { useSignIn } from "@/hooks/api-firebase/useSignIn";

export function Login() {
  const mutation = useSignIn();

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
        <Typography variant="h5">Welcome to Materio!👋🏻</Typography>
        <Typography color="secondary">
          Please sign-in to your account and start the adventure
        </Typography>
        <Stack
          component={"form"}
          onSubmit={async (evt) => {
            evt.preventDefault();
            await form.handleSubmit();

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

            console.error(
              "Error Message:",
              "\n",
              Object.fromEntries(errorEntries),
              "\n",
              "Form Values:",
              "\n",
              form.state.values,
            );
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
                />
              );
            }}
          </form.Field>
          <form.Field
            name="password"
            validatorAdapter={zodValidator}
            validators={{
              onChange: z.string().min(8).max(16),
            }}
          >
            {(field) => {
              return (
                <InputPassword
                  value={field.state.value}
                  onChange={(evt) => {
                    field.handleChange(evt.target.value);
                  }}
                  onBlur={field.handleBlur}
                  error={!!field.state.meta.errors.length}
                  helperText={field.state.meta.errors[0]}
                  label="Password"
                  fullWidth
                />
              );
            }}
          </form.Field>
          <Box sx={{ py: 1 }}>
            <Link
              component={RouterLink}
              to={"/forgot-password"}
              underline="hover"
            >
              Forgot Password?
            </Link>
          </Box>
          <form.Subscribe selector={(state) => state.canSubmit}>
            {(canSubmit) => {
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
          </form.Subscribe>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
            mt: 6,
          }}
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
            mt: 4,
          }}
        >
          or
        </Divider>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
          }}
        >
          <SignInButtonGroup />
        </Box>
      </Paper>
    </Box>
  );
}
