import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshOutlined, SaveOutlined } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Button,
  Avatar,
  alpha,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "firebase/auth";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";
import { InputText } from "@/components/form/InputText";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import { stringToColor } from "@/utils/stringToColor";
// import { UploadAvator } from "./UploadAvator";
import type { Auth } from "firebase/auth";

export function Account() {
  const { authValue, updateAuth } = useAuthStore(
    useShallow((store) => {
      return {
        authValue: store.value,
        updateAuth: store.update,
      };
    }),
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
    <Card component={"form"} onSubmit={handleSubmit} onReset={handleReset}>
      <FormProvider {...formCtx}>
        <CardHeader
          title="User profile"
          subheader="Update you profile"
          avatar={
            <Avatar
              src={authValue.auth.currentUser?.photoURL || ""}
              alt="avator"
              sx={{
                color: authValue.auth.currentUser?.displayName
                  ? stringToColor(authValue.auth.currentUser.displayName || "")
                  : void 0,
                bgcolor: authValue.auth.currentUser?.displayName
                  ? alpha(
                      stringToColor(
                        authValue.auth.currentUser.displayName || "",
                      ),
                      0.12,
                    )
                  : void 0,
              }}
            >
              {/* {authValue.auth.currentUser?.displayName?.at(0)?.toUpperCase()} */}
            </Avatar>
          }
          // action={<UploadAvator />}
        />
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <InputText field="displayName" label="Display Name" />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            disabled={mutation.isPending}
            type="submit"
            variant="contained"
            startIcon={<SaveOutlined />}
          >
            save
          </Button>
          <Button
            type="reset"
            variant="outlined"
            startIcon={<RefreshOutlined />}
          >
            reset
          </Button>
        </CardActions>
      </FormProvider>
    </Card>
  );
}

const schema = z.object({
  displayName: z.string().min(1),
});

export type FormValues = z.infer<typeof schema>;
