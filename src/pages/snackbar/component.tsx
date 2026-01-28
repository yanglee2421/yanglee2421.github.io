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

const createToday = () => {
  const today = dayjs();
  const date = today.format("YYYY-MM-DD");
  const time = today.format("HH:mm:ss");

  return [date, time] as const;
};

export const Component = () => {
  const snackbar = useSnackbar();
  const time = useLocaleTime();
  const date = useLocaleDate();

  /**
   * 1. React Compiler treats functions executed in components as pure functions
   * 2. During re-render, the function is only executed again if the parameters of the pure function change
   * 3. The dateString and timeString returned below remain consistent due to React Compiler's optimization
   */
  const [dateString, timeString] = createToday();

  return (
    <Stack spacing={3}>
      <Paper sx={{ padding: 2.5 }}>
        <Typography
          variant="h1"
          component={"time"}
          dateTime={timeString}
          sx={{ display: "block" }}
        >
          {time}
        </Typography>
        <Typography
          variant="subtitle1"
          component={"time"}
          dateTime={dateString}
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
