import {
  Box,
  Divider,
  FormControlLabel,
  Link,
  Typography,
  Button,
  Checkbox,
  Stack,
  Paper,
  TextField,
} from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { InputPassword } from "@/components/form/InputPassword";
import { SignInButtonGroup } from "@/components/shared/SignInButtonGroup";
import { useCreateUser } from "@/hooks/api-firebase/useCreateUser";

export function SignUp() {
  const mutation = useCreateUser();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      checked: false,
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
        <Typography variant="h5">Adventure starts here 🚀</Typography>
        <Typography
          color={"secondary"}
          overflow={"hidden"}
          maxHeight={(theme) => {
            return `calc(${theme.typography.body2.lineHeight}em * 3)`;
          }}
        >
          Make your app management easy and fun!
        </Typography>
        <Stack
          component={"form"}
          onSubmit={async (evt) => {
            evt.preventDefault();
            evt.stopPropagation();

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
          mt={3}
          spacing={3}
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
          <form.Field
            name="password"
            validatorAdapter={zodValidator()}
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
          <form.Field
            name="confirmPassword"
            validators={{
              onChangeListenTo: ["password"],
              onChange(evt) {
                return Object.is(
                  evt.value,
                  evt.fieldApi.form.getFieldValue("password"),
                )
                  ? null
                  : "Passwords do not match";
              },
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
                  label="Comfirm Password"
                  fullWidth
                />
              );
            }}
          </form.Field>
          <form.Field
            name="checked"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.literal(true),
            }}
          >
            {(field) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.state.value}
                      onChange={(evt, checked) => {
                        void evt;
                        field.handleChange(checked);
                      }}
                      sx={{ p: 0 }}
                    />
                  }
                  label={
                    <Box>
                      <Typography color="secondary" component={"span"}>
                        I agree to
                      </Typography>{" "}
                      <Link
                        component={RouterLink}
                        to={"/privacy-policy"}
                        underline="hover"
                      >
                        privacy policy & terms
                      </Link>
                    </Box>
                  }
                  sx={{ py: 1 }}
                />
              );
            }}
          </form.Field>
          <form.Subscribe
            selector={(state) => state.values.checked && state.canSubmit}
          >
            {(canSubmit) => {
              return (
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  variant="contained"
                  fullWidth
                  size="large"
                >
                  register
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
          <Typography color="secondary">Already have an account?</Typography>
          <Link component={RouterLink} to={"/login"} underline="hover">
            Sign in insead
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
