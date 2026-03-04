import { useLocaleDate } from "@/hooks/dom/useLocaleDate";
import { useLocaleTime } from "@/hooks/dom/useLocaleTime";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import { SocketDemo } from "./SocketDemo";

const createToday = () => {
  const today = dayjs();
  const date = today.format("YYYY-MM-DD");
  const time = today.format("HH:mm:ss");

  return [date, time] as const;
};

const StyledInput = styled("input")({
  paddingInline: 12,
  paddingBlock: 4,
  margin: 0,

  boxSizing: "border-box",
  height: 40,

  border: 0,

  backgroundColor: "transparent",

  outline: "none",
});

const FluentInput = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",

        boxSizing: "border-box",
        display: "inline-block",

        border: `1px solid ${theme.palette.text.secondary}`,
        borderBottomColor: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius + "px",

        "&::after": {
          content: '""',
          display: "block",

          position: "absolute",
          inset: -1,
          insetBlockStart: "auto",

          boxSizing: "border-box",
          width: "auto",
          height: 4,

          padding: 0,
          margin: 0,

          borderWidth: 0,
          borderStyle: "solid",
          borderColor: theme.palette.primary.main,
          borderBottomWidth: 2,
          borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
          // borderRadius: theme.shape.borderRadius + "px",

          // backgroundColor: theme.palette.primary.main,
          clipPath: `inset(calc(100% - ${2}px) 0 0)`,

          transform: "scaleX(0)",
          transition: theme.transitions.create("transform"),
        },

        "&:focus-within": {
          "&::after": {
            transform: "scaleX(1)",
          },
        },
      }}
    >
      <StyledInput placeholder="Fluent Input" />
    </Box>
  );
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
          <Grid container spacing={3}>
            <Grid size={6}>
              <FluentInput />
            </Grid>
            <Grid size={6}>
              <TextField variant="standard" fullWidth />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
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
        </CardActions>
      </Card>
      <SocketDemo />
    </Stack>
  );
};
