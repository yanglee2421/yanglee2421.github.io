// I18n Imports
import { useTranslation } from "react-i18next";

// MUI Imports
import {
  Typography,
  Button,
  Box,
  styled,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import { Google, FacebookRounded, Twitter, GitHub } from "@mui/icons-material";

// Form Imports
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Components Imports
import { ItemPasswd, ItemText } from "@/components/form";

export function ForgotPasswd() {
  const { t } = useTranslation();

  // Form Hooks
  const formCtx = useForm({
    defaultValues: {
      email: "",
      passwd: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email().required(),
        passwd: yup.string().min(6).max(16).required(),
      })
    ),
  });

  const submitHandler = formCtx.handleSubmit((data) => {
    console.log(data);
  });
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
          gap={6}
          p={[4, 8]}
          boxShadow={(theme) => {
            return theme.shadows[3];
          }}
        >
          <Typography variant="h4" mt={"auto"}>
            {t("hello")}
          </Typography>
          <Typography
            variant="body2"
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
          <StyledForm
            onSubmit={submitHandler}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <FormProvider {...formCtx}>
              <ItemText name="email" label="Email" type="email" />
              <ItemPasswd name="passwd" label="Password" />
              <Button variant="contained" size="large" fullWidth>
                {t("submit", { ns: "button" })}
              </Button>
            </FormProvider>
          </StyledForm>
          <Divider>Or</Divider>
          <Stack
            direction={"row"}
            spacing={4}
            justifyContent={"center"}
            mb={"auto"}
          >
            <IconButton>
              <FacebookRounded />
            </IconButton>
            <IconButton>
              <Twitter />
            </IconButton>
            <IconButton>
              <GitHub />
            </IconButton>
            <IconButton>
              <Google />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

const StyledForm = styled("form")({});
