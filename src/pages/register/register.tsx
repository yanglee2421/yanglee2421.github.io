// MUI Imports
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Divider,
  FormControlLabel,
  IconButton,
  Link,
  Typography,
  styled,
} from "@mui/material";
import { FacebookOutlined, GitHub, Google, Twitter } from "@mui/icons-material";

// Form Imports
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Components Imports
import { ItemText, ItemPasswd, ItemCheckbox } from "@/components";

// Rouetr Imports
import { Link as RouterLink } from "react-router-dom";
import { useCreateUser } from "@/hooks/api-firebase";

export function Register() {
  const formCtx = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email().max(128).required(),
        password: yup.string().min(8).max(16).required(),
      })
    ),
  });

  const mutation = useCreateUser();

  const handleSubmit = formCtx.handleSubmit((data) => {
    mutation.mutate(data, {});
  });

  return (
    <Box height={"100%"} display={"flex"}>
      <Box flex={1} overflow={"hidden"}></Box>
      <Box
        width={"100%"}
        maxWidth={{ sm: 450 }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        gap={4}
        padding={[4, 12]}
        boxShadow={(theme) => theme.shadows[2]}
      >
        <Box>
          <Typography variant="h4">Hello</Typography>
          <Typography
            variant="body2"
            overflow={"hidden"}
            maxHeight={(theme) => {
              return `calc(${theme.typography.body2.lineHeight}em * 3)`;
            }}
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit illo recusandae accusantium voluptas sapiente
            voluptate, eaque amet porro harum veniam natus. Optio, quod debitis
            asperiores nesciunt explicabo nisi nam eos.
          </Typography>
        </Box>
        <StyledForm onSubmit={handleSubmit}>
          <FormProvider {...formCtx}>
            <ItemText name="email" label="Email" />
            <ItemPasswd name="password" label="Password" />
            <FormControlLabel
              control={<ItemCheckbox name="isAgree" />}
              label={
                <Box display={"flex"} gap={".5ch"}>
                  <Typography variant="body2">I agree to</Typography>
                  <Link
                    variant="body2"
                    component={RouterLink}
                    to={"/privacy-policy"}
                  >
                    privacy policy & terms
                  </Link>
                </Box>
              }
            />
            <LoadingButton
              type="submit"
              loading={mutation.isPending}
              variant="contained"
              fullWidth
              size="large"
            >
              register
            </LoadingButton>
          </FormProvider>
        </StyledForm>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="body2">Already have an account?</Typography>
          <Link variant="body2" component={RouterLink} to={"/login"}>
            Sign in insead
          </Link>
        </Box>
        <Divider>Or</Divider>
        <Box display={"flex"} justifyContent={"center"} gap={4}>
          <IconButton>
            <FacebookOutlined />
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
        </Box>
      </Box>
    </Box>
  );
}

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});
