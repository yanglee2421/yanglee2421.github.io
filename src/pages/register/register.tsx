import {
  Box,
  Divider,
  FormControlLabel,
  IconButton,
  Link,
  Typography,
  Button,
} from "@mui/material";
import { FacebookOutlined, GitHub, Google, Twitter } from "@mui/icons-material";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ItemText, ItemPassword, ItemCheckbox } from "@/components/form";
import { Link as RouterLink } from "react-router-dom";
import { useCreateUser } from "@/hooks/api-firebase/useCreateUser";
import { GuestGuard } from "@/components/guard/GuestGuard";
import { useHeadTitle } from "@/hooks/dom/useHeadTitle";

export function Register() {
  useHeadTitle("Register");

  const formCtx = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(schema),
  });

  const mutation = useCreateUser();

  const handleSubmit = formCtx.handleSubmit((data) => {
    mutation.mutate(data, {});
  });

  return (
    <GuestGuard>
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
              voluptate, eaque amet porro harum veniam natus. Optio, quod
              debitis asperiores nesciunt explicabo nisi nam eos.
            </Typography>
          </Box>
          <Box component={"form"} onSubmit={handleSubmit}>
            <FormProvider {...formCtx}>
              <ItemText name="email" label="Email" />
              <ItemPassword name="password" label="Password" />
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
    </GuestGuard>
  );
}

const schema = z.object({
  email: z.string().email().max(128),
  password: z.string().min(8).max(16),
});

export type FormValues = z.infer<typeof schema>;
