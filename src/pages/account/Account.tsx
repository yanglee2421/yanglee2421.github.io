// MUI Imports
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Stack,
  Button,
  Avatar,
  alpha,
} from "@mui/material";
import { RefreshOutlined, SaveOutlined } from "@mui/icons-material";

// Form Imports
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Store Imports
import { useAuthStore } from "@/hooks/store";

// Components Imports
import { ItemText } from "@/components";
import { UploadAvator } from "./UploadAvator";

// Utils Imports
import { stringToColor } from "@/utils";

// Query Imports
import { useMutation } from "@tanstack/react-query";

// Firebase Imports
import { Auth, updateProfile } from "firebase/auth";

// Toast Imports
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";

export function Account() {
  const { authValue, updateAuth } = useAuthStore(
    useShallow((store) => {
      return {
        authValue: store.value,
        updateAuth: store.update,
      };
    })
  );

  const formCtx = useForm<FormValues>({
    defaultValues: {
      displayName: authValue.auth.currentUser?.displayName || "",
    },

    resolver: zodResolver(schema),
  });

  const mutation = useMutation<Auth, Error, { displayName: string }>({
    async mutationFn({ displayName }) {
      const auth = authValue.auth;
      const user = auth.currentUser;

      if (!user) {
        throw new Error("Not authorization");
      }

      await updateProfile(user, {
        displayName,
      });

      return auth;
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      updateAuth();

      formCtx.reset({
        displayName: data.currentUser?.displayName || "",
      });

      toast.success("Save successlly!");
    },
  });

  const handleSubmit = formCtx.handleSubmit((data) => {
    mutation.mutate(data);
  });

  const handleReset = () => {
    formCtx.reset();
  };

  return (
    <>
      <Stack spacing={6} padding={4}>
        <Card>
          <CardHeader></CardHeader>
          <CardContent>
            <Grid container spacing={4}></Grid>
          </CardContent>
        </Card>

        <FormProvider {...formCtx}>
          <Card
            component={"form"}
            onSubmit={handleSubmit}
            onReset={handleReset}
          >
            <CardHeader
              title="User profile"
              subheader="Update you profile"
              avatar={
                <Avatar
                  src={authValue.auth.currentUser?.photoURL || ""}
                  alt="avator"
                  sx={{
                    color: authValue.auth.currentUser?.displayName
                      ? stringToColor(
                          authValue.auth.currentUser.displayName || ""
                        )
                      : void 0,
                    bgcolor: authValue.auth.currentUser?.displayName
                      ? alpha(
                          stringToColor(
                            authValue.auth.currentUser.displayName || ""
                          ),
                          0.12
                        )
                      : void 0,
                  }}
                >
                  {authValue.auth.currentUser?.displayName
                    ?.at(0)
                    ?.toUpperCase()}
                </Avatar>
              }
              action={<UploadAvator></UploadAvator>}
            ></CardHeader>
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <ItemText name="displayName" label="Display Name"></ItemText>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                disabled={mutation.isPending}
                type="submit"
                variant="contained"
                startIcon={<SaveOutlined></SaveOutlined>}
              >
                save
              </Button>
              <Button
                type="reset"
                variant="outlined"
                startIcon={<RefreshOutlined></RefreshOutlined>}
              >
                reset
              </Button>
            </CardActions>
          </Card>
        </FormProvider>
      </Stack>
    </>
  );
}

const schema = z.object({
  displayName: z.string().min(1),
});

export type FormValues = z.infer<typeof schema>;
