import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid2,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Translation } from "react-i18next";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const stream = navigator.mediaDevices.getUserMedia({
  video: false,
  audio: true,
});

const LegendContent = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="overline"
        color="textSecondary"
      >
        volume
      </Typography>
    </Box>
  );
};

const Microphone = () => {
  const audio = React.use(stream);

  const [pxs, setPxs] = React.useState(0);
  const [data, setData] = React.useState(() => {
    const val = [{
      value: 0,
      time: performance.now(),
    }];

    while (val.length < window.innerWidth) {
      val.push({
        value: 0,
        time: performance.now(),
      });
    }

    return val;
  });

  const theme = useTheme();

  const elRef = React.useRef(null);
  const timer = React.useRef(0);

  React.useEffect(() => {
    const el = elRef.current;

    if (!el) return;

    const observer = new ResizeObserver(
      ([{ contentBoxSize: [{ inlineSize }] }]) => {
        setPxs(inlineSize);
      },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(audio);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    source.connect(analyser);

    const fn = () => {
      timer.current = requestAnimationFrame(fn);

      analyser.getByteTimeDomainData(dataArray);

      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        const value = dataArray[i] - 128;
        sum += value * value;
      }
      const volume = Math.sqrt(sum / bufferLength);

      React.startTransition(() => {
        setData((prev) => {
          const nextValue = [...prev, {
            time: performance.now(),
            value: Math.floor(volume * 100),
          }];

          while (nextValue.length < pxs) {
            nextValue.push({
              value: 0,
              time: performance.now(),
            });
          }

          return nextValue.slice(-pxs);
        });
      });
    };

    fn();

    return () => {
      cancelAnimationFrame(timer.current);
      source.disconnect();
      audioContext.close();
    };
  }, [audio, pxs]);

  return (
    <Card>
      <CardHeader title="Microphone" />
      <CardContent>
        <ResponsiveContainer ref={elRef} height={400}>
          <LineChart data={data}>
            <XAxis
              dataKey={"time"}
              tick={false}
              tickSize={0}
              stroke={theme.palette.divider}
              strokeWidth={1}
              allowDecimals
            />
            <YAxis
              dataKey={"value"}
              tick={false}
              domain={[0, 5000]}
              max={5000}
              tickSize={0}
              label={"aa"}
              stroke={theme.palette.divider}
              strokeWidth={1}
              hide
              allowDecimals
            />

            <Line
              type="monotone"
              dataKey={"value"}
              stroke={theme.palette.primary.main}
            />
            <Legend
              content={LegendContent}
            />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export function Dashboard() {
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
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Microphone />
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
      </Grid2>
    </Grid2>
  );
}
