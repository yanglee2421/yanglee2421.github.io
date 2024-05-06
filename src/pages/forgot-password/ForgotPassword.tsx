import { zodResolver } from "@hookform/resolvers/zod";
import { Send, ArrowBack } from "@mui/icons-material";
import { Typography, Button, Box, Stack, Paper } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { app } from "@/api/firebase/app";
import { InputText } from "@/components/form/InputText";

export function ForgotPassword() {
  const { t } = useTranslation();

  const formCtx = useForm<FormValues>({
    defaultValues: {
      email: "",
    },

    resolver: zodResolver(schema),
  });

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

  return (
    <Box position={"fixed"} display={"flex"} sx={{ inset: 0 }}>
      <Box flex={1} overflow={"hidden"}></Box>
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
        <Typography variant="h5">Forgot Password 🔒</Typography>
        <Typography color="secondary">
          Enter your email and we'll send you instructions to reset your
          password
        </Typography>
        <Stack
          component={"form"}
          onSubmit={formCtx.handleSubmit(
            (data) => {
              return new Promise<void>((resolve) => {
                mutation.mutate(data.email, {
                  onSettled() {
                    resolve();
                  },
                  onError(error) {
                    toast.error(error.message);
                  },
                  onSuccess() {
                    toast.success("Send email successlly!");
                  },
                });
              });
            },
            (error) => {
              console.warn(error);
            },
          )}
          noValidate
          autoComplete="off"
          mt={3}
          spacing={3}
        >
          <FormProvider {...formCtx}>
            <InputText field="email" label="Email" type="email" />
            <Button
              type="submit"
              disabled={formCtx.formState.isSubmitting}
              variant="contained"
              size="large"
              fullWidth
              endIcon={<Send />}
            >
              {t("send reset link", { ns: "button" })}
            </Button>
          </FormProvider>
        </Stack>
        <Button
          component={RouterLink}
          to={"/login"}
          startIcon={<ArrowBack />}
          size="large"
        >
          Back to login
        </Button>
      </Paper>
    </Box>
  );
}

const schema = z.object({
  email: z.string().email(),
});

type FormValues = z.infer<typeof schema>;
