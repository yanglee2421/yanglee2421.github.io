// MUI Imports
import {
  Box,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Typography,
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
        width={"100%"}
        maxWidth={{ md: 450 }}
        p={[6, 12]}
        boxShadow={(theme) => Reflect.get(Object(theme.shadows), 1)}
      >
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <FormProvider {...formCtx}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Typography variant="h5" fontWeight={500}>
                  Wellcome to Yang_Lee!
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  color={"GrayText"}
                  sx={{
                    overflow: "hidden",
                    maxHeight(theme) {
                      return `calc(${theme.typography.body1.lineHeight}em * 2)`;
                    },
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                  omnis sed fugiat placeat alias illo praesentium.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <ItemText name="email" label="Email" />
              </Grid>
              <Grid item xs={12}>
                <ItemPasswd name="passwd" label="Password" />
              </Grid>
              <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <FormControlLabel
                  control={<ItemCheckbox name="remember" />}
                  label="Remember Me"
                />
                <Link
                  component={RouterLink}
                  to={{ pathname: "/forgot-passwd" }}
                >
                  Forgot Password?
                </Link>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  loading={isPending}
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                >
                  sign in
                </LoadingButton>
              </Grid>
              <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={"center"}
                gap={[2, 4]}
              >
                <Typography>New on our platform?</Typography>
                <Link component={RouterLink} to={{ pathname: "/register" }}>
                  Create an account
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Divider>Or</Divider>
              </Grid>
              <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={"center"}
                gap={2}
              >
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
              </Grid>
            </Grid>
          </FormProvider>
        </form>
      </Box>
    </Box>
  );
}
