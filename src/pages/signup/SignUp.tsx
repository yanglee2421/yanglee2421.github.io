import { zodResolver } from "@hookform/resolvers/zod";
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
} from "@mui/material";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { InputPassword } from "@/components/form/InputPassword";
import { InputText } from "@/components/form/InputText";
import { SignInButtonGroup } from "@/components/shared/SignInButtonGroup";
import { useCreateUser } from "@/hooks/api-firebase/useCreateUser";

export function SignUp() {
  const formCtx = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(schema),
  });

  const [checked, setChecked] = React.useState(false);

  const mutation = useCreateUser();

  return (
    <Box position={"fixed"} display={"flex"} sx={{ inset: 0 }}>
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
          onSubmit={formCtx.handleSubmit(
            (data) => {
              return new Promise<void>((resolve) => {
                mutation.mutate(data, {
                  onSettled() {
                    resolve();
                  },
                  onError(error) {
                    toast.error(error.message);
                  },
                });
              });
            },
            (error) => {
              console.error(error);
            },
          )}
          mt={3}
          spacing={3}
        >
          <FormProvider {...formCtx}>
            <InputText field="email" label="Email" />
            <InputPassword field="password" label="Password" />
            <FormControlLabel
              checked={checked}
              onChange={(evt, checked) => {
                void evt;
                setChecked(checked);
              }}
              control={<Checkbox sx={{ p: 0 }} />}
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
            />
            <Button
              type="submit"
              disabled={!checked || mutation.isPending}
              variant="contained"
              fullWidth
              size="large"
            >
              register
            </Button>
          </FormProvider>
        </Stack>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          pt={2}
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
          }}
        >
          Or
        </Divider>
        <Box textAlign={"center"} mt={3}>
          <SignInButtonGroup />
        </Box>
      </Paper>
    </Box>
  );
}

const schema = z.object({
  email: z.string().email().max(128),
  password: z.string().min(8).max(16),
});

type FormValues = z.infer<typeof schema>;
