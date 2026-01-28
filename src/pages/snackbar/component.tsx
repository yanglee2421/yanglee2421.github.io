import { useLocaleDate } from "@/hooks/dom/useLocaleDate";
import { useLocaleTime } from "@/hooks/dom/useLocaleTime";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";

export const Component = () => {
  const snackbar = useSnackbar();
  const time = useLocaleTime();
  const date = useLocaleDate();

  const today = dayjs();

  return (
    <Stack spacing={3}>
      <Paper sx={{ padding: 2.5 }}>
        <Typography
          variant="h1"
          component={"time"}
          dateTime={today.format("HH:mm:ss")}
          sx={{ display: "block" }}
        >
          {time}
        </Typography>
        <Typography
          variant="subtitle1"
          component={"time"}
          dateTime={today.format("YYYY-MM-DD")}
          sx={{ display: "block" }}
        >
          {date}
        </Typography>
      </Paper>
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
    </Stack>
  );
};
