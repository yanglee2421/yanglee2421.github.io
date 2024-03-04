import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Divider, Link, Typography, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { z } from "zod";

import { InputPassword } from "@/components/form/InputPassword";
import { InputText } from "@/components/form/InputText";
import { SignInWithGoogle } from "@/components/shared/SignInWithGoogle";
import { useSignIn } from "@/hooks/api-firebase/useSignIn";

export function SignIn() {
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
      <Box flex={1} overflow={"hidden"}></Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        gap={4}
        width={"100%"}
        maxWidth={{ md: 450 }}
        p={[6, 12]}
        boxShadow={(theme) => theme.shadows[2]}
      >
        <Box>
          <Typography variant="h5">Welcome to Materio!👋🏻</Typography>
          <Typography
            color="secondary"
            sx={{
              overflow: "hidden",
              maxHeight(theme) {
                return `calc(${theme.typography.body1.lineHeight}em * 3)`;
              },
            }}
          >
            Please sign-in to your account and start the adventure
          </Typography>
        </Box>
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
          sx={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
          <FormProvider {...formCtx}>
            <InputText field="email" label="Email"></InputText>
            <InputPassword field="password" label="Password"></InputPassword>
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
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
        >
          <Typography color="secondary">New on our platform?</Typography>
          <Link component={RouterLink} to={"/signup"}>
            Create an account
          </Link>
        </Box>
        <Divider>Or</Divider>
        <Box display={"flex"} justifyContent={"center"} gap={4}>
          <SignInWithGoogle></SignInWithGoogle>
        </Box>
      </Box>
    </Box>
  );
}

const schema = z.object({
  email: z.string().email().max(128),
  password: z.string().min(8).max(16),
});

type FormValues = z.infer<typeof schema>;
