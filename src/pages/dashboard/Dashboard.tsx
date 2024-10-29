import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid2,
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
        <Typography variant="h3">
          <Translation ns="/dashboard">{(t) => t("dashboard")}</Translation>
        </Typography>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Card>
          <CardHeader title="WebSocket" subheader={data} />
          <CardContent>
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
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
          </CardActions>
        </Card>
      </Grid2>
    </Grid2>
  );
}
