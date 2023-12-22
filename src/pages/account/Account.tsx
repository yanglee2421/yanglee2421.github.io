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
import { LoadingButton } from "@mui/lab";

// Form Imports
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Store Imports
import { useAuth, useAuthStore } from "@/hooks/store";

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
import toast from "react-hot-toast";

export function Account() {
  const auth = useAuth();

  const formCtx = useForm({
    defaultValues: {
      displayName: auth.currentUser?.displayName || "",
    },

    resolver: yupResolver(
      yup.object().shape({
        displayName: yup.string().max(128).required(),
      })
    ),
  });

  const setLastUpdateAt = useAuthStore((store) => store.setLastUpdateAt);
  const mutation = useMutation<Auth, Error, { displayName: string }>({
    async mutationFn({ displayName }) {
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
      setLastUpdateAt(Date.now());

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
          <Card>
            <CardHeader
              title="User profile"
              subheader="Update you profile"
              avatar={
                <Avatar
                  src={auth.currentUser?.photoURL || ""}
                  alt="avator"
                  sx={{
                    color: auth.currentUser?.displayName
                      ? stringToColor(
                          auth.currentUser.displayName.at(0)?.toUpperCase() ||
                            ""
                        )
                      : void 0,
                    bgcolor: auth.currentUser?.displayName
                      ? alpha(
                          stringToColor(
                            auth.currentUser.displayName.at(0)?.toUpperCase() ||
                              ""
                          ),
                          0.12
                        )
                      : void 0,
                  }}
                >
                  {auth.currentUser?.displayName?.at(0)?.toUpperCase()}
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
              <LoadingButton
                onClick={handleSubmit}
                loading={mutation.isPending}
                variant="contained"
                startIcon={<SaveOutlined></SaveOutlined>}
              >
                save
              </LoadingButton>
              <Button
                onClick={handleReset}
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
