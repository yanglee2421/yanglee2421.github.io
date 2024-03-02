import {
  Box,
  Divider,
  FormControlLabel,
  Link,
  Typography,
  Button,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputCheckbox } from "@/components/form/InputCheckbox";
import { InputText } from "@/components/form/InputText";
import { InputPassword } from "@/components/form/InputPassword";
import { Link as RouterLink } from "react-router-dom";
import { useCreateUser } from "@/hooks/api-firebase/useCreateUser";
import { SignInWithGoogle } from "@/components/shared/SignInWithGoogle";

export function Register() {
  const formCtx = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(schema),
  });

  const mutation = useCreateUser();

  return (
    <Box position={"fixed"} display={"flex"} sx={{ inset: 0 }}>
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
              control={<InputCheckbox field="isAgree" />}
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
            <Button
              type="submit"
              disabled={mutation.isPending}
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
          <Typography variant="body2">Already have an account?</Typography>
          <Link variant="body2" component={RouterLink} to={"/login"}>
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
