// MUI Imports
import {
  Box,
  Divider,
  IconButton,
  Link,
  Typography,
  Button,
} from "@mui/material";
import { Google, GitHub, FacebookOutlined, Twitter } from "@mui/icons-material";

// Form Imports
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Components Imports
import { ItemPassword, ItemText } from "@/components";

// Query Imports
import { useSignIn } from "@/hooks/api-firebase";

// Router Imports
import { Link as RouterLink } from "react-router-dom";

export function Unauthorized() {
  // Form Hooks
  const formCtx = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(zodSchema),
  });

  const mutation = useSignIn();

  return (
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

const zodSchema = z.object({
  email: z.string().email().max(128),
  password: z.string().min(8).max(16),
});

export type FormValues = z.infer<typeof zodSchema>;
