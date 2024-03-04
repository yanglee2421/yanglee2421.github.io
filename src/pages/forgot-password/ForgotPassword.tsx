import { zodResolver } from "@hookform/resolvers/zod";
import { Send, ArrowBack } from "@mui/icons-material";
import { Typography, Button, Box } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { z } from "zod";


import { InputText } from "@/components/form/InputText";

export function ForgotPassword() {
  const { t } = useTranslation();

  const formCtx = useForm<FormValues>({
    defaultValues: {
      email: "",
    },

    resolver: zodResolver(schema),
  });

  return (
    <Box position={"fixed"} display={"flex"} sx={{ inset: 0 }}>
      <Box flex={1} overflow={"hidden"}>
        left
      </Box>
      <Box
        width={"100%"}
        maxWidth={{ sm: 450 }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        gap={4}
        p={[4, 12]}
        boxShadow={(theme) => {
          return theme.shadows[2];
        }}
      >
        <Box>
          <Typography variant="h4">{t("hello")}</Typography>
          <Typography
            variant="body2"
            mt={1}
            overflow={"hidden"}
            maxHeight={(theme) => {
              return `calc(${theme.typography.body2.lineHeight}em * 3)`;
            }}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
            velit exercitationem vitae deserunt dolorum consequuntur culpa
            repellendus, quibusdam deleniti error atque in excepturi corrupti
            quae assumenda, necessitatibus amet, incidunt labore?
          </Typography>
        </Box>
        <Box
          component={"form"}
          onSubmit={formCtx.handleSubmit(
            (data) => {
              console.log(data);
            },
            (error) => {
              console.warn(error);
            }
          )}
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <FormProvider {...formCtx}>
            <InputText field="email" label="Email" type="email" />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              endIcon={<Send />}
            >
              {t("send reset link", { ns: "button" })}
            </Button>
          </FormProvider>
        </Box>
        <Button component={RouterLink} to={"/login"} startIcon={<ArrowBack />}>
          Back to login
        </Button>
      </Box>
    </Box>
  );
}

const schema = z.object({
  email: z.string().email(),
});

type FormValues = z.infer<typeof schema>;
