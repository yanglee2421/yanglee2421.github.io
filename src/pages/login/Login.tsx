import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Divider, Link, Typography, Button, Paper } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { z } from "zod";
import { InputPassword } from "@/components/form/InputPassword";
import { InputText } from "@/components/form/InputText";
import { SignInButtonGroup } from "@/components/shared/SignInButtonGroup";
import { useSignIn } from "@/hooks/api-firebase/useSignIn";

export function Login() {
  const formCtx = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(schema),
  });

  const mutation = useSignIn();

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
        <Box
          component={"form"}
          onSubmit={formCtx.handleSubmit(
            (data) => {
              mutation.mutate(data, {
                onError() {},
                onSuccess() {},
              });
            },
            (error) => {
              console.warn(error);
            },
          )}
          noValidate
          autoComplete="off"
          mt={3}
        >
          <FormProvider {...formCtx}>
            <InputText field="email" label="Email" />
            <InputPassword field="password" label="Password" sx={{ mt: 3 }} />
            <Box textAlign={"end"} my={2}>
              <Link component={RouterLink} to={"/forgot-password"}>
                Forgot Password?
              </Link>
            </Box>
            <Button
              disabled={mutation.isPending}
              type="submit"
              variant="contained"
              fullWidth
              size="large"
            >
              sign in
            </Button>
          </FormProvider>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mt={3}
        >
          <Typography color="secondary">New on our platform?</Typography>
          <Link component={RouterLink} to={"/signup"}>
            Create an account
          </Link>
        </Box>
        <Divider
          sx={{
            color(theme) {
              return theme.palette.text.secondary;
            },
            my: 2,
          }}
        >
          Or
        </Divider>
        <Box textAlign={"center"}>
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
