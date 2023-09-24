// MUI Imports
import {
  Box,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Typography,
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
  const { mutateAsync, isLoading } = useUsrPost();

  // Submit & Reset
  const handleSubmit = formCtx.handleSubmit(async (data) => {
    console.log(data);
    const usr = await mutateAsync({ data });
    signIn({ ...usr, role: "admin", loginAt: 0 });
  });

  return (
    <Box display={"flex"} height={"100%"}>
      <Box flex={1}>
        <ul>
          <li>xasd</li>
          <li>xasd</li>
          <li>xasd</li>
        </ul>
        <img src="" alt="" />
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        width={"100%"}
        maxWidth={["none", 450]}
        paddingX={4}
        boxShadow={(theme) => theme.shadows[1]}
      >
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <FormProvider {...formCtx}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" fontWeight={500}>
                  Wellcome to Yang_Lee!
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color={"GrayText"}>
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
              >
                <FormControlLabel
                  control={<ItemCheckbox name="remember" />}
                  label="Remember Me"
                />
                <Link component="button">Forgot Password?</Link>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  loading={isLoading}
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
                gap={2}
              >
                <Typography>New on our platform?</Typography>
                <Link component={"button"}>Create an account</Link>
              </Grid>
              <Grid item xs={12}>
                <Divider>Or</Divider>
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"center"}>
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
