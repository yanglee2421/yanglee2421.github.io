// I18n Imports
import { useTranslation } from "react-i18next";

// MUI Imports
import {
  Typography,
  Grid,
  Button,
  Box,
  styled,
  Stack,
  Divider,
} from "@mui/material";

// Form Imports
import { useForm, FormProvider } from "react-hook-form";

// Components Imports
import { ItemPasswd, ItemText } from "@/components/form";

export function ForgotPasswd() {
  const { t } = useTranslation();

  // Form Hooks
  const formCtx = useForm({ defaultValues: {} });
  return (
    <>
      <Box display={"flex"} height={"100%"}>
        <Box flex={1} overflow={"hidden"}>
          left
        </Box>
        <Box
          width={"100%"}
          maxWidth={{ sm: 450 }}
          display={"flex"}
          flexDirection={"column"}
          border={"1px red solid"}
          p={[4, 8]}
        >
          <StyledForm
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <FormProvider {...formCtx}>
              <Typography variant="h4" mt="auto">
                {t("hello")}
              </Typography>
              <ItemText name="email" label="Email" />
              <ItemPasswd name="passwd" label="Password" />
              <Button variant="contained" size="large" fullWidth>
                {t("submit", { ns: "button" })}
              </Button>
            </FormProvider>
            <Divider>Or</Divider>
          </StyledForm>
        </Box>
      </Box>
    </>
  );
}

const StyledForm = styled("form")({});
