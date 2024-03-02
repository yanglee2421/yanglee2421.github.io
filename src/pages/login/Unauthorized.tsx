import { Box, Divider, Link, Typography, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ItemPassword, ItemText } from "@/components/form";
import { useSignIn } from "@/hooks/api-firebase";
import { Link as RouterLink } from "react-router-dom";
import GoogleLogo from "@/assets/images/google.png";
import { useMutation } from "@tanstack/react-query";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/api/firebase";
import { GuestGuard } from "@/components/guard/GuestGuard";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";

export function Unauthorized() {
  useHeadTitle("Login");

  const formCtx = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(schema),
  });

  const mutation = useSignIn();

  const mutationGoogle = useMutation({
    mutationFn() {
      return signInWithPopup(getAuth(app), new GoogleAuthProvider());
    },
  });

  return (
    <GuestGuard>
      <Box display={"flex"} height={"100%"}>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              omnis sed fugiat placeat alias illo praesentium.
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
              <ItemText name="email" label="Email"></ItemText>
              <ItemPassword name="password" label="Password"></ItemPassword>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Link
                  variant="body2"
                  component={RouterLink}
                  to={"/forgot-passwd"}
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
            <Button
              color="secondary"
              startIcon={<img src={GoogleLogo} alt="Google" width={22}></img>}
              sx={{ "& .MuiButton-startIcon": { marginInlineEnd: 3 } }}
              onClick={() => {
                mutationGoogle.mutate();
              }}
            >
              Sign in with Google
            </Button>
          </Box>
        </Box>
      </Box>
    </GuestGuard>
  );
}

const schema = z.object({
  email: z.string().email().max(128),
  password: z.string().min(8).max(16),
});

export type FormValues = z.infer<typeof schema>;

const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.addScope(
  "https://www.googleapis.com/auth/contacts.readonly"
);
googleAuthProvider.setCustomParameters({
  login_hint: "user@example.com",
});
