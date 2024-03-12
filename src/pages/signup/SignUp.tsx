import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Divider,
  FormControlLabel,
  Link,
  Typography,
  Button,
  Checkbox,
} from "@mui/material";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { z } from "zod";
import { InputPassword } from "@/components/form/InputPassword";
import { InputText } from "@/components/form/InputText";
import { SignInWithGoogle } from "@/components/shared/SignInWithGoogle";
import { useCreateUser } from "@/hooks/api-firebase/useCreateUser";

export function SignUp() {
  const formCtx = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(schema),
  });

  const [checked, setChecked] = React.useState(false);

  const mutation = useCreateUser();

  return (
    <Box position={"fixed"} display={"flex"} sx={{ inset: 0 }}>
      <Box flex={1} overflow={"hidden"} />
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
          <Typography variant="h5">Adventure starts here 🚀</Typography>
          <Typography
            color={"secondary"}
            overflow={"hidden"}
            maxHeight={(theme) => {
              return `calc(${theme.typography.body2.lineHeight}em * 3)`;
            }}
          >
            Make your app management easy and fun!
          </Typography>
        </Box>
        <Box
          component={"form"}
          onSubmit={formCtx.handleSubmit((data) => {
            mutation.mutate(data, {});
          })}
        >
          <FormProvider {...formCtx}>
            <InputText field="email" label="Email" />
            <InputPassword field="password" label="Password" sx={{ mt: 3 }} />
            <FormControlLabel
              checked={checked}
              onChange={(evt, checked) => {
                void evt;
                setChecked(checked);
              }}
              control={<Checkbox />}
              label={
                <Box display={"flex"} gap={".5ch"}>
                  <Typography color="secondary">I agree to</Typography>
                  <Link component={RouterLink} to={"/privacy-policy"}>
                    privacy policy & terms
                  </Link>
                </Box>
              }
              sx={{ my: 2 }}
            ></FormControlLabel>
            <Button
              type="submit"
              disabled={!checked || mutation.isPending}
              variant="contained"
              fullWidth
              size="large"
            >
              register
            </Button>
          </FormProvider>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography color="secondary">Already have an account?</Typography>
          <Link component={RouterLink} to={"/login"}>
            Sign in insead
          </Link>
        </Box>
        <Divider>Or</Divider>
        <Box display={"flex"} justifyContent={"center"} gap={4}>
          <SignInWithGoogle></SignInWithGoogle>
        </Box>
      </Box>
    </Box>
  );
}

const schema = z.object({
  email: z.string().email().max(128),
  password: z.string().min(8).max(16),
});

type FormValues = z.infer<typeof schema>;
