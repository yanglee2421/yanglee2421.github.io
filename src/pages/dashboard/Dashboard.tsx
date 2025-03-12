import { StopOutlined } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
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
import { useSize } from "@/hooks/dom/useSize";
import { minmax } from "@/utils/minmax";
import { ErrorBoundary } from "react-error-boundary";

const drawLine = (
  canvasCtx: CanvasRenderingContext2D,
  prevX: number,
  prevY: number,
  x: number,
  y: number,
  lineWidth: number,
  strokeStyle: string,
) => {
  canvasCtx.beginPath();
  canvasCtx.moveTo(prevX, prevY);
  canvasCtx.lineTo(x, y);
  canvasCtx.lineWidth = lineWidth;
  canvasCtx.strokeStyle = strokeStyle;
  canvasCtx.stroke();
  canvasCtx.closePath();
};

const drawAxis = (
  canvasCtx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  strokeStyle: string,
) => {
  canvasCtx.beginPath();
  canvasCtx.moveTo(0, 0);
  canvasCtx.lineTo(0, canvasHeight);
  canvasCtx.lineTo(canvasWidth, canvasHeight);
  canvasCtx.lineWidth = 1;
  canvasCtx.strokeStyle = strokeStyle;
  canvasCtx.stroke();
  canvasCtx.closePath();
};

const drawText = (
  canvasCtx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  textSize: number,
  strokeStyle: string,
  canvasWidth?: number,
) => {
  canvasCtx.beginPath();
  canvasCtx.font = `${textSize}px serif`;
  canvasCtx.fillStyle = strokeStyle;
  canvasCtx.textBaseline = "top";
  canvasCtx.fillText(text, x, y, canvasWidth);
  canvasCtx.closePath();
};

const streamPro = navigator.mediaDevices.getUserMedia({ audio: true });

const getY = (val: number, max: number, height: number) =>
  Math.floor(height - (val / max) * height);

const Microphone = () => {
  const audio = React.use(streamPro);

  const elRef = React.useRef<HTMLCanvasElement>(null);
  const divRef = React.useRef<HTMLDivElement>(null);
  const cursorRef = React.useRef<null | number>(null);

  const theme = useTheme();
  const [width, height] = useSize(divRef);

  React.useEffect(() => {
    const canvas = elRef.current;
    if (!canvas) return;
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;

    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(audio);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    source.connect(analyser);

    let renderData: Array<{ value: number; time: number }> = [];
    let timer = 0;

    const draw = () => {
      timer = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        const value = dataArray[i] - 128;
        sum += value ** 2;
      }
      const volume = Math.sqrt(sum / bufferLength);
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      renderData.push({
        time: performance.now(),
        value: Math.floor(volume),
      });

      renderData = renderData.slice(-canvasWidth);

      canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      drawAxis(canvasCtx, canvasWidth, canvasHeight, theme.palette.divider);
      drawText(canvasCtx, "hallo", 6, 0, 12, theme.palette.text.secondary);

      for (let idx = 1; idx < renderData.length; idx++) {
        const prevX = idx - 1;
        const prev = renderData[prevX];
        const prevY = getY(prev.value, 128, canvasHeight);
        const i = renderData[idx];
        const y = getY(i.value, 128, canvasHeight);

        drawLine(
          canvasCtx,
          prevX,
          prevY,
          idx,
          y,
          2,
          theme.palette.primary.main,
        );
      }

      const cursor = cursorRef.current;

      if (typeof cursor !== "number") return;

      const x = Math.floor(minmax(cursor, { min: 0, max: canvasWidth }));
      const val = renderData[x]?.value || 0;

      drawLine(canvasCtx, x, 0, x, canvasHeight, 1, theme.palette.error.main);
      drawText(
        canvasCtx,
        "volume: " + val,
        x + 6,
        Math.floor(canvasHeight / 4),
        12,
        theme.palette.error.main,
      );
    };

    draw();

    return () => {
      cancelAnimationFrame(timer);
      source.disconnect();
      audioContext.close();
      analyser.disconnect();
    };
  }, [
    audio,
    theme.palette.primary.main,
    theme.palette.divider,
    theme.palette.text.secondary,
    theme.palette.error.main,
  ]);

  return (
    <Card>
      <CardHeader title="Microphone" />
      <CardContent>
        <Box ref={divRef} sx={{ height: 256 }}>
          <canvas
            ref={elRef}
            width={width}
            height={height}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                cursorRef.current =
                  e.clientX - e.currentTarget.getBoundingClientRect().left;
              }
            }}
            onPointerMove={(e) => {
              if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                cursorRef.current =
                  e.clientX - e.currentTarget.getBoundingClientRect().left;
              }
            }}
            onPointerUp={(e) => {
              e.currentTarget.releasePointerCapture(e.pointerId);
              cursorRef.current = null;
            }}
            style={{ touchAction: "none" }}
          ></canvas>
        </Box>
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

  const divRef = React.useRef<HTMLDivElement>(null);
  const ref = React.useRef<HTMLCanvasElement>(null);

  const theme = useTheme();
  const [width, height] = useSize(divRef);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const canvasCtx = canvas.getContext("2d");
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

    analyser.fftSize = 2048;

    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    let timer = 0;
    const draw = function () {
      timer = requestAnimationFrame(draw);

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      analyser.getByteTimeDomainData(dataArray);
      canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = theme.palette.primary.main;
      canvasCtx.beginPath();

      const sliceWidth = (canvasWidth * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvasHeight) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvasWidth, canvasHeight / 2);
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
      cancelAnimationFrame(timer);
      audioCtx.close();
      analyser.disconnect();
      gainNode.disconnect();
      biquadFilter.disconnect();
      convolver.disconnect();
      source.disconnect();
      distortion.disconnect();
    };
  }, [stream, theme.palette.primary.main]);

  return (
    <Card>
      <CardHeader title="Sinewave" />
      <CardContent>
        <Box ref={divRef} sx={{ height: 256, position: "relative" }}>
          <canvas
            ref={ref}
            width={width}
            height={height}
            style={{
              position: "absolute",
              insetInlineStart: 0,
              insetBlockStart: 0,
            }}
          ></canvas>
        </Box>
      </CardContent>
    </Card>
  );
};

const Frequencybars = () => {
  const stream = React.use(streamPro);

  const divRef = React.useRef<HTMLDivElement>(null);
  const ref = React.useRef<HTMLCanvasElement>(null);

  const theme = useTheme();
  const [width, height] = useSize(divRef);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const canvasCtx = canvas.getContext("2d");
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

    let timer = 0;
    const drawAlt = () => {
      timer = requestAnimationFrame(drawAlt);

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      analyser.getByteFrequencyData(dataArrayAlt);
      canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

      const barWidth = (canvasWidth / bufferLengthAlt) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLengthAlt; i++) {
        barHeight = dataArrayAlt[i];

        canvasCtx.fillStyle = theme.palette.primary.main;
        canvasCtx.fillRect(
          x,
          canvasHeight - barHeight / 2,
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
      cancelAnimationFrame(timer);
      audioCtx.close();
      analyser.disconnect();
      gainNode.disconnect();
      biquadFilter.disconnect();
      convolver.disconnect();
      source.disconnect();
      distortion.disconnect();
    };
  }, [stream, theme.palette.primary.main]);

  return (
    <Card>
      <CardHeader title="Frequencybars" />
      <CardContent>
        <Box ref={divRef} sx={{ height: 256, position: "relative" }}>
          <canvas
            ref={ref}
            width={width}
            height={height}
            style={{
              position: "absolute",
              insetInlineStart: 0,
              insetBlockStart: 0,
            }}
          ></canvas>
        </Box>
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

type RenderNode = {
  x: number;
  y: number;
};

const SvgCard = () => {
  const [renderNodes, setRenderNodes] = React.useState<RenderNode[]>([]);

  const divRef = React.useRef<HTMLDivElement>(null);
  const seed = React.useRef(1);

  const [width, height] = useSize(divRef);
  const theme = useTheme();

  React.useEffect(() => {
    const timer = setInterval(() => {
      seed.current = Math.floor(Math.random() * 700);
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    let timer = 0;
    const draw = () => {
      timer = requestAnimationFrame(draw);

      setRenderNodes((p) => {
        const val = [
          ...p,
          { x: performance.now(), y: getY(seed.current, 700, height) },
        ];
        return val.slice(-width);
      });
    };
    draw();

    return () => {
      cancelAnimationFrame(timer);
    };
  }, [width, height]);

  return (
    <Card>
      <CardHeader title="SVG" />
      <CardContent>
        <Box ref={divRef} sx={{ height: 300, position: "relative" }}>
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              insetInlineStart: 0,
              insetBlockStart: 0,
            }}
          >
            <line
              x1={0}
              y1={height}
              x2={width}
              y2={height}
              stroke={theme.palette.divider}
              strokeWidth={1}
            />
            <line
              x1={0}
              y1={0}
              x2={0}
              y2={height}
              stroke={theme.palette.divider}
              strokeWidth={1}
            />
            <polyline
              points={renderNodes.map((i, idx) => `${idx},${i.y}`).join(" ")}
              fill="none"
              stroke={theme.palette.primary.main}
              strokeWidth={2}
            />
            <circle cx={0} cy={200} r={4} fill="red" />
            <text
              x={10}
              y={height - 10}
              fontSize={12}
              textAnchor="middle"
              color={theme.palette.text.secondary}
            >
              1
            </text>
          </svg>
        </Box>
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
      <ErrorBoundary
        fallbackRender={(props) => (
          <Grid2 size={{ xs: 12 }}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <Typography>{props.error.message}</Typography>
              <Button
                color="error"
                variant="contained"
                onClick={props.resetErrorBoundary}
                sx={{ mt: 2 }}
              >
                Retry
              </Button>
            </Alert>
          </Grid2>
        )}
      >
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <Microphone />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <Sinewave />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <Frequencybars />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <ControlCard />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <SvgCard />
        </Grid2>
      </ErrorBoundary>
    </Grid2>
  );
}
