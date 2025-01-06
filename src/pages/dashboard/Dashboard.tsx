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

const initData = () => {
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
};

const Microphone = () => {
  const audio = React.use(stream);

  const [pxs, setPxs] = React.useState(0);
  const [data, setData] = React.useState(initData);

  const theme = useTheme();

  const elRef = React.useRef(null);
  const timer = React.useRef(0);

  React.useEffect(() => {
    const el = elRef.current;

    if (!el) return;

    const observer = new ResizeObserver(
      ([{ contentBoxSize: [{ inlineSize }] }]) => {
        React.startTransition(() => {
          setPxs(inlineSize);
        });
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
      analyser.disconnect();
    };
  }, [audio, pxs]);

  return (
    <Card>
      <CardHeader title="Microphone" />
      <CardContent>
        <ResponsiveContainer ref={elRef} height={320}>
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

const Sinewave = () => {
  const audio = React.use(stream);

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(320);

  const divRef = React.useRef<HTMLDivElement>(null);
  const ref = React.useRef<HTMLCanvasElement>(null);
  const timer = React.useRef(0);

  const theme = useTheme();

  React.useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const cvs = ref.current;
    if (!cvs) return;

    const observer = new ResizeObserver(
      ([{ contentBoxSize: [{ inlineSize }] }]) => {
        setWidth(inlineSize);
      },
    );
    observer.observe(div);

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const cvs = ref.current;
    if (!cvs) return;

    const audioCtx = new AudioContext();
    const distortion = audioCtx.createWaveShaper();
    const gainNode = audioCtx.createGain();
    const biquadFilter = audioCtx.createBiquadFilter();
    const convolver = audioCtx.createConvolver();
    const source = audioCtx.createMediaStreamSource(audio);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvasCtx = cvs.getContext("2d");
    analyser.connect(source);

    if (!canvasCtx) return;
    const WIDTH = cvs.width;
    const HEIGHT = cvs.height;

    const draw = () => {
      timer.current = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = "rgb(200, 200, 200)";
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "rgb(0, 0, 0)";

      const sliceWidth = WIDTH * 1.0 / bufferLength;
      let x = 0;

      canvasCtx.beginPath();
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0,
          y = v * HEIGHT / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(WIDTH, HEIGHT / 2);
      canvasCtx.stroke();
      canvasCtx.closePath();
    };

    draw();

    return () => {
      audioCtx.close();
      analyser.disconnect();
    };
  }, []);

  return (
    <Card>
      <CardHeader title="Sinewave" />
      <CardContent>
        <div ref={divRef} style={{ height, position: "relative" }}>
          <canvas
            ref={ref}
            width={width}
            height={height}
            style={{
              position: "absolute",
              insetInlineStart: 0,
              insetBlockStart: 0,
            }}
          >
          </canvas>
        </div>
      </CardContent>
    </Card>
  );
};

const Frequencybars = () => {
  const audio = React.use(stream);

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(320);

  const divRef = React.useRef<HTMLDivElement>(null);
  const ref = React.useRef<HTMLCanvasElement>(null);
  const timer = React.useRef(0);

  React.useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const cvs = ref.current;
    if (!cvs) return;

    const observer = new ResizeObserver(
      ([{ contentBoxSize: [{ inlineSize }] }]) => {
        setWidth(inlineSize);
      },
    );
    observer.observe(div);

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const cvs = ref.current;
    if (!cvs) return;

    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvasCtx = cvs.getContext("2d");
    analyser.connect(audio);

    if (!canvasCtx) return;
    const WIDTH = cvs.width;
    const HEIGHT = cvs.height;

    const draw = () => {
      timer.current = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      canvasCtx.fillStyle = "rgb(0, 0, 0)";
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      const barWidth = (WIDTH / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        canvasCtx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
        canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
      }
    };

    draw();

    return () => {
      audioCtx.close();
      analyser.disconnect();
    };
  }, []);

  return (
    <Card>
      <CardHeader title="Frequencybars" />
      <CardContent>
        <div ref={divRef} style={{ height, position: "relative" }}>
          <canvas
            ref={ref}
            width={width}
            height={height}
            style={{
              position: "absolute",
              insetInlineStart: 0,
              insetBlockStart: 0,
            }}
          >
          </canvas>
        </div>
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
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Sinewave />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Frequencybars />
      </Grid2>
    </Grid2>
  );
}
