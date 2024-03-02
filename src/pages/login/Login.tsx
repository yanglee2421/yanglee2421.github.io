import { Box, Divider, Link, Typography, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputText } from "@/components/form/InputText";
import { InputPassword } from "@/components/form/InputPassword";
import { useSignIn } from "@/hooks/api-firebase/useSignIn";
import { Link as RouterLink } from "react-router-dom";
import { SignInWithGoogle } from "@/components/shared/SignInWithGoogle";

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
          <Typography variant="h4">Wellcome to here!</Typography>
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              maxHeight(theme) {
                return `calc(${theme.typography.body1.lineHeight}em * 3)`;
              },
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro omnis
            sed fugiat placeat alias illo praesentium.
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
            }
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
              <Link
                variant="body2"
                component={RouterLink}
                to={"/forgot-password"}
              >
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
          <Typography variant="body2">New on our platform?</Typography>
          <Link variant="body2" component={RouterLink} to={"/register"}>
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
