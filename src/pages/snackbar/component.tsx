import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
} from "@mui/material";
import { useSnackbar } from "notistack";

export const Component = () => {
  const snackbar = useSnackbar();

  return (
    <Card>
      <CardHeader title="Snackbar" />
      <CardContent>
        <Stack spacing={1.5} useFlexGap flexWrap={"wrap"} direction={"row"}>
          <Button
            onClick={() => {
              snackbar.enqueueSnackbar("This is a default snackbar", {
                variant: "default",
                persist: true,
              });
            }}
          >
            default
          </Button>
          <Button
            onClick={() => {
              snackbar.enqueueSnackbar("This is a success snackbar", {
                variant: "success",
              });
            }}
            color="success"
          >
            success
          </Button>
          <Button
            onClick={() => {
              snackbar.enqueueSnackbar("This is an error snackbar", {
                variant: "error",
              });
            }}
            color="error"
          >
            error
          </Button>
          <Button
            onClick={() => {
              snackbar.enqueueSnackbar("This is a warning snackbar", {
                variant: "warning",
              });
            }}
            color="warning"
          >
            warning
          </Button>
          <Button
            onClick={() => {
              snackbar.enqueueSnackbar("This is an info snackbar", {
                variant: "info",
              });
            }}
            color="info"
          >
            info
          </Button>
        </Stack>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};
