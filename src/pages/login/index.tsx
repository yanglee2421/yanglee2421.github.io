// MUI Imports
import {
  Box,
  Divider,
  FormControlLabel,
  IconButton,
  Link,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Google, GitHub, FacebookOutlined, Twitter } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

// Form Imports
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Components Imports
import { ItemCheckbox, ItemPasswd, ItemText } from "@/components";

// Login Imports
import { useLogin, useUsrPost } from "@/hooks";

// Router Imports
import { Link as RouterLink } from "react-router-dom";

export function Component() {
  // Form Hooks
  const formCtx = useForm({
    defaultValues: {
      email: "",
      passwd: "",
      isRemember: false,
    },
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email().max(50).required(),
        passwd: yup.string().min(8).max(16).required(),
        isRemember: yup.boolean(),
      })
    ),
  });

  // Login Hooks
  const { signIn } = useLogin();
  const { mutateAsync, isPending } = useUsrPost();

  // Submit & Reset
  const handleSubmit = formCtx.handleSubmit(async (data) => {
    console.log(data);
    const usr = await mutateAsync({ data });
    signIn({ ...usr, role: "admin", loginAt: 0 });
  });

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box display={"flex"} height={"100%"}>
      <Box flex={1} overflow={"hidden"}>
        {isSm && <h1>Hello small</h1>}
      </Box>
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
        <StyledForm
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          sx={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
          <FormProvider {...formCtx}>
            <ItemText name="email" label="Email" />
            <ItemPasswd name="passwd" label="Password" />
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <FormControlLabel
                control={<ItemCheckbox name="remember" />}
                label={<Typography variant="body2">Remember Me</Typography>}
              />
              <Link
                variant="body2"
                component={RouterLink}
                to={{ pathname: "/forgot-passwd" }}
              >
                Forgot Password?
              </Link>
            </Box>
            <LoadingButton
              loading={isPending}
              type="submit"
              variant="contained"
              fullWidth
              size="large"
            >
              sign in
            </LoadingButton>
          </FormProvider>
        </StyledForm>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="body2">New on our platform?</Typography>
          <Link
            variant="body2"
            component={RouterLink}
            to={{ pathname: "/register" }}
          >
            Create an account
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

const StyledForm = styled("form")({});
