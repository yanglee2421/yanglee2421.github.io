import { useLocaleStore } from "@/hooks/store/useLocaleStore";
import { ListOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid2,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { timeout } from "@yotulee/run";
import React from "react";
import { Translation } from "react-i18next";

export function Dashboard() {
  const [data, setData] = React.useState("");
  const ref = React.useRef<WebSocket | null>(null);
  const [input, setInput] = React.useState("");
  const update = useLocaleStore((s) => s.update);

  React.useEffect(() => {
    const controller = new AbortController();
    const connect = () => {
      ref.current = new WebSocket("ws://localhost:8080");

      ref.current.addEventListener("open", () => {}, {
        signal: controller.signal,
      });
      ref.current.addEventListener("close", async () => {
        await timeout(200);
        connect();
      }, {
        signal: controller.signal,
      });
      ref.current.addEventListener("message", (e) => {
        setData(String(e.data));
      }, {
        signal: controller.signal,
      });
      ref.current.addEventListener("error", () => {}, {
        signal: controller.signal,
      });
    };

    connect();

    return () => {
      controller.abort();
      ref.current?.close();
      ref.current = null;
    };
  }, [setData]);

  return (
    <Grid2 container spacing={6}>
      <Grid2 size={{ xs: 12 }}>
        <Typography variant="h4">
          <Translation ns="/dashboard">{(t) => t("Dashboard")}</Translation>
        </Typography>
        <Typography color="secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title="WebSocket"
            subheader={data || "Placeholder"}
            action={
              <IconButton
                onClick={() => {
                  update((d) => {
                    d.showMenuInMobile = !d.showMenuInMobile;
                  });
                }}
              >
                <ListOutlined />
              </IconButton>
            }
          />
          <CardContent>
            <Grid2 container spacing={6}>
              <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  fullWidth
                />
              </Grid2>
            </Grid2>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => {
                ref.current?.send(input);
              }}
              variant="contained"
            >
              send
            </Button>
            <Button variant="outlined">reset</Button>
          </CardActions>
        </Card>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Card>
          <CardHeader title="Button" />
          <CardContent>
            <Stack spacing={3}>
              <Stack spacing={3} useFlexGap flexWrap={"wrap"} direction={"row"}>
                <Button variant="contained" color="primary">primary</Button>
                <Button variant="contained" color="secondary">secondary</Button>
                <Button variant="contained" color="error">error</Button>
                <Button variant="contained" color="success">success</Button>
                <Button variant="contained" color="warning">warning</Button>
              </Stack>
              <Stack spacing={3} useFlexGap flexWrap={"wrap"} direction={"row"}>
                <Button variant="outlined" color="primary">primary</Button>
                <Button variant="outlined" color="secondary">secondary</Button>
                <Button variant="outlined" color="error">error</Button>
                <Button variant="outlined" color="success">success</Button>
                <Button variant="outlined" color="warning">warning</Button>
              </Stack>
              <Stack spacing={3} useFlexGap flexWrap={"wrap"} direction={"row"}>
                <Button variant="text" color="primary">primary</Button>
                <Button variant="text" color="secondary">secondary</Button>
                <Button variant="text" color="error">error</Button>
                <Button variant="text" color="success">success</Button>
                <Button variant="text" color="warning">warning</Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}
