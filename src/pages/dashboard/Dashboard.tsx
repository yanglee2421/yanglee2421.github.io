import { StopOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
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

const streamPro = navigator.mediaDevices.getUserMedia({
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
  const audio = React.use(streamPro);

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
    const stopAnimate = () => cancelAnimationFrame(timer.current);

    if (!audio.active) {
      stopAnimate();
      return;
    }

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
      stopAnimate();
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

const createEchoDelayEffect = (audioContext: AudioContext) => {
  const delay = audioContext.createDelay(1);
  const dryNode = audioContext.createGain();
  const wetNode = audioContext.createGain();
  const mixer = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  delay.delayTime.value = 0.75;
  dryNode.gain.value = 1;
  wetNode.gain.value = 0;
  filter.frequency.value = 1100;
  filter.type = "highpass";

  return {
    apply() {
      wetNode.gain.setValueAtTime(0.75, audioContext.currentTime);
    },
    discard() {
      wetNode.gain.setValueAtTime(0, audioContext.currentTime);
    },
    isApplied() {
      return wetNode.gain.value > 0;
    },
    placeBetween(inputNode: AudioNode, outputNode: AudioNode) {
      inputNode.connect(delay);
      delay.connect(wetNode);
      wetNode.connect(filter);
      filter.connect(delay);

      inputNode.connect(dryNode);
      dryNode.connect(mixer);
      wetNode.connect(mixer);
      mixer.connect(outputNode);
    },
  };
};

const Sinewave = () => {
  const stream = React.use(streamPro);

  const [width, setWidth] = React.useState(0);
  const [height] = React.useState(320);

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

    const canvasCtx = cvs.getContext("2d");
    if (!canvasCtx) return;

    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;
    const gainNode = audioCtx.createGain();
    const biquadFilter = audioCtx.createBiquadFilter();
    const convolver = audioCtx.createConvolver();
    const echoDelay = createEchoDelayEffect(audioCtx);
    const source = audioCtx.createMediaStreamSource(stream);
    const distortion = audioCtx.createWaveShaper();
    source.connect(distortion);
    distortion.connect(biquadFilter);
    biquadFilter.connect(gainNode);
    convolver.connect(gainNode);
    echoDelay.placeBetween(gainNode, analyser);
    gainNode.connect(analyser);
    // analyser.connect(audioCtx.destination);

    canvasCtx.clearRect(0, 0, width, height);

    analyser.fftSize = 2048;

    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    const draw = function () {
      timer.current = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);
      canvasCtx.clearRect(0, 0, width, height);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = theme.palette.primary.main;
      canvasCtx.beginPath();

      const sliceWidth = (width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(width, height / 2);
      canvasCtx.stroke();
      canvasCtx.closePath();
    };

    draw();

    distortion.oversample = "4x";
    biquadFilter.gain.setTargetAtTime(0, audioCtx.currentTime, 0);

    if (echoDelay.isApplied()) {
      echoDelay.discard();
    }

    biquadFilter.disconnect(0);
    biquadFilter.connect(gainNode);

    return () => {
      cancelAnimationFrame(timer.current);
      audioCtx.close();
      analyser.disconnect();
      gainNode.disconnect();
      biquadFilter.disconnect();
      convolver.disconnect();
      source.disconnect();
      distortion.disconnect();
    };
  }, [
    stream,
    width,
    height,
    theme.palette.primary.main,
  ]);

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
  const stream = React.use(streamPro);

  const [width, setWidth] = React.useState(0);
  const [height] = React.useState(320);

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

    const canvasCtx = cvs.getContext("2d");
    if (!canvasCtx) return;

    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;
    const gainNode = audioCtx.createGain();
    const biquadFilter = audioCtx.createBiquadFilter();
    const convolver = audioCtx.createConvolver();
    const echoDelay = createEchoDelayEffect(audioCtx);
    const source = audioCtx.createMediaStreamSource(stream);
    const distortion = audioCtx.createWaveShaper();
    source.connect(distortion);
    distortion.connect(biquadFilter);
    biquadFilter.connect(gainNode);
    convolver.connect(gainNode);
    echoDelay.placeBetween(gainNode, analyser);
    gainNode.connect(analyser);
    // analyser.connect(audioCtx.destination);

    analyser.fftSize = 256;
    const bufferLengthAlt = analyser.frequencyBinCount;
    const dataArrayAlt = new Uint8Array(bufferLengthAlt);

    canvasCtx.clearRect(0, 0, width, height);

    const drawAlt = () => {
      timer.current = requestAnimationFrame(drawAlt);

      analyser.getByteFrequencyData(dataArrayAlt);
      canvasCtx.clearRect(0, 0, width, height);

      const barWidth = (width / bufferLengthAlt) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLengthAlt; i++) {
        barHeight = dataArrayAlt[i];

        canvasCtx.fillStyle = theme.palette.primary.main;
        canvasCtx.fillRect(
          x,
          height - barHeight / 2,
          barWidth,
          barHeight / 2,
        );

        x += barWidth + 1;
      }
    };

    drawAlt();

    distortion.oversample = "4x";
    biquadFilter.gain.setTargetAtTime(0, audioCtx.currentTime, 0);

    if (echoDelay.isApplied()) {
      echoDelay.discard();
    }

    biquadFilter.disconnect(0);
    biquadFilter.connect(gainNode);

    return () => {
      cancelAnimationFrame(timer.current);
      audioCtx.close();
      analyser.disconnect();
      gainNode.disconnect();
      biquadFilter.disconnect();
      convolver.disconnect();
      source.disconnect();
      distortion.disconnect();
    };
  }, [
    stream,
    width,
    height,
    theme.palette.primary.main,
  ]);

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

const ControlCard = () => {
  const stream = React.use(streamPro);

  return (
    <Card>
      <CardHeader title="Control" />
      <CardActions>
        <Button
          startIcon={<StopOutlined />}
          onClick={() => stream.getAudioTracks().forEach((i) => i.stop())}
          variant="contained"
          color="error"
        >
          Stop
        </Button>
      </CardActions>
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
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <ControlCard />
      </Grid2>
    </Grid2>
  );
}
