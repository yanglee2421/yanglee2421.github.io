import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { type ReadResult } from "zxing-wasm";
import ZXingWorker from "./zxing.worker?worker";

class QRCodeScanner {
  listeners: Set<(_: ReadResult[]) => void> = new Set();
  running = false;
  worker: InstanceType<typeof ZXingWorker> | null = null;
  controller: AbortController | null = null;
  video: HTMLVideoElement;

  constructor(video: HTMLVideoElement) {
    this.video = video;
  }

  on(fn: (_: ReadResult[]) => void) {
    this.listeners.add(fn);

    return () => {
      this.off(fn);
    };
  }
  off(fn: (_: ReadResult[]) => void) {
    this.listeners.delete(fn);
  }
  start() {
    this.running = true;
    this.worker = new ZXingWorker();
    this.controller = new AbortController();

    this.worker.addEventListener(
      "message",
      (event) => {
        this.listeners.forEach((listener) => {
          listener(event.data);
        });
      },
      this.controller,
    );

    this.loop();
  }
  stop() {
    this.listeners.clear();
    this.running = false;
    this.worker?.terminate();
    this.worker = null;
    this.controller?.abort();
    this.controller = null;
  }
  async loop() {
    if (!this.running) return;

    try {
      const blob = await window.createImageBitmap(this.video);
      this.worker?.postMessage(blob, [blob]);
    } finally {
      requestAnimationFrame(this.loop.bind(this));
    }
  }
}

class Camera {
  #listeners: Set<(_: Error) => void> = new Set();
  #stream: MediaStream | null = null;
  #controller: AbortController | null = null;
  video: HTMLVideoElement;

  constructor(video: HTMLVideoElement) {
    this.video = video;
  }

  on(fn: (_: Error) => void) {
    this.#listeners.add(fn);
    return () => {
      this.off(fn);
    };
  }
  off(fn: (_: Error) => void) {
    this.#listeners.delete(fn);
  }
  async play(frontCamera: boolean) {
    const canPlay = await this.canPlay();

    if (!canPlay) {
      this.#listeners.forEach((listener) => {
        listener(new Error("No video input devices found."));
      });
      return;
    }

    const videoSize = this.video.getBoundingClientRect();
    this.#stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: videoSize.width,
        height: videoSize.height,
        facingMode: frontCamera ? "user" : "environment",
        frameRate: { ideal: 30, max: 30 },
      },
      audio: false,
    });
    const tracks = this.#stream.getVideoTracks();

    await Promise.allSettled(
      tracks.map(async (track) => {
        const capabilities = track.getCapabilities();

        if (!Reflect.get(capabilities, "focusMode")) {
          return;
        }

        await track.applyConstraints({
          advanced: [
            {
              focusMode: "continuous",
              focusDistance: 0.5,
            },
          ] as unknown as MediaTrackConstraintSet[],
        });
      }),
    );

    this.#controller = new AbortController();

    this.video.addEventListener(
      "loadedmetadata",
      () => {
        this.video.play();
      },
      this.#controller,
    );

    this.video.srcObject = this.#stream;
  }
  stop() {
    this.#listeners.clear();
    this.#stream?.getTracks().forEach((track) => {
      track.stop();
    });
    this.#stream = null;
    this.#controller?.abort();
    this.#controller = null;
    this.video.srcObject = null;
  }
  async canPlay() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const canPlay = devices.some((device) => device.kind === "videoinput");

    return canPlay;
  }
}

export const Component = () => {
  const [frontCamera, setFrontCamera] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [result, setResult] = React.useState<string | null>(null);

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const theme = useTheme();

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const camera = new Camera(video);
    camera.play(frontCamera);
    camera.on((error) => {
      setError(error);
    });

    return () => {
      camera.stop();
    };
  }, [frontCamera]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (error) return;

    const scanner = new QRCodeScanner(video);
    scanner.start();
    scanner.on((result) => {
      console.log(result);
      setResult(result[0]?.text || null);
      scanner.stop();
    });

    return () => {
      scanner.stop();
    };
  }, [error]);

  return (
    <>
      <Button
        onClick={() => {
          setFrontCamera((previous) => !previous);
        }}
      >
        toggle
      </Button>
      <Typography>{result}</Typography>
      <Box
        sx={{
          position: "relative",
          border: 1,
          borderColor: theme.palette.divider,
          borderStyle: "solid",
        }}
        width={375}
        height={667}
      >
        <canvas
          ref={canvasRef}
          width={375}
          height={667}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            backgroundColor: "transparent",
          }}
        ></canvas>
        {error ? (
          <div>{error.message}</div>
        ) : (
          <video ref={videoRef} width={375} height={667}></video>
        )}
      </Box>
    </>
  );
};
