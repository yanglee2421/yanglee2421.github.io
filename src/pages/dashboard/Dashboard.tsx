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
import { useSize } from "@/hooks/dom/useSize";

const streamPro = navigator.mediaDevices.getUserMedia({ audio: true });

const Microphone = () => {
  const audio = React.use(streamPro);

  const elRef = React.useRef<HTMLCanvasElement>(null);
  const divRef = React.useRef<HTMLDivElement>(null);
  const timer = React.useRef(0);

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

    const draw = () => {
      timer.current = requestAnimationFrame(draw);

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
      canvasCtx.strokeStyle = theme.palette.primary.main;
      canvasCtx.lineWidth = 2;
      canvasCtx.beginPath();
      canvasCtx.moveTo(0, canvasHeight);

      renderData.forEach((i, idx) => {
        canvasCtx.lineTo(
          idx + 1,
          canvasHeight - Math.floor(i.value * 1 * canvasHeight / 128),
        );
      });

      canvasCtx.stroke();
      canvasCtx.closePath();
    };

    draw();

    return () => {
      cancelAnimationFrame(timer.current);
      source.disconnect();
      audioContext.close();
      analyser.disconnect();
    };
  }, [audio, theme.palette.primary.main]);

  return (
    <Card>
      <CardHeader title="Microphone" />
      <CardContent>
        <Box ref={divRef} sx={{ height: 256 }}>
          <canvas ref={elRef} width={width} height={height}></canvas>
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
  const timer = React.useRef(0);

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

    const draw = function () {
      timer.current = requestAnimationFrame(draw);

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
    theme.palette.primary.main,
  ]);

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
          >
          </canvas>
        </Box>
      </CardContent>
    </Card>
  );
};

const Frequencybars = () => {
  const stream = React.use(streamPro);

  const divRef = React.useRef<HTMLDivElement>(null);
  const ref = React.useRef<HTMLCanvasElement>(null);
  const timer = React.useRef(0);

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

    const drawAlt = () => {
      timer.current = requestAnimationFrame(drawAlt);

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
    theme.palette.primary.main,
  ]);

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
          >
          </canvas>
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
    </Grid2>
  );
}
