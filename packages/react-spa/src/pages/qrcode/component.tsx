import { Box, Button, useTheme } from "@mui/material";
import React from "react";
import { prepareZXingModule, readBarcodes } from "zxing-wasm";
import zxingWasmPath from "zxing-wasm/full/zxing_full.wasm?url";

prepareZXingModule({
  overrides: {
    locateFile: (path: string, prefix: string) => {
      if (path.endsWith(".wasm")) {
        return new URL(zxingWasmPath, import.meta.url).href;
      }
      return prefix + path;
    },
  },
  fireImmediately: true,
});

export const Component = () => {
  const [frontCamera, setFrontCamera] = React.useState(false);

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const streamRef = React.useRef<MediaStream>(null);
  const abortControllerRef = React.useRef<AbortController>(null);
  const animationFrameIdRef = React.useRef<number>(null);

  const theme = useTheme();

  const handleDrawer = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
  };

  const handlePlayVideo = async (frontCamera: boolean) => {
    const video = videoRef.current;
    if (!video) return;

    const videoSize = video.getBoundingClientRect();
    streamRef.current = await navigator.mediaDevices.getUserMedia({
      video: {
        width: videoSize.width,
        height: videoSize.height,
        facingMode: frontCamera ? "user" : "environment",
      },
      audio: false,
    });

    video.srcObject = streamRef.current;
    abortControllerRef.current = new AbortController();
    video.addEventListener(
      "loadedmetadata",
      () => {
        video.play();
      },
      abortControllerRef.current,
    );
  };

  const handleStopVideo = () => {
    streamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });
    abortControllerRef.current?.abort();
    streamRef.current = null;
    abortControllerRef.current = null;
  };

  const handleScan = async () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = new OffscreenCanvas(video.videoWidth, video.videoHeight);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const blob = await canvas.convertToBlob();
      const result = await readBarcodes(blob);
      if (result.length) {
        console.log(result);
        cancelAnimationFrame(animationFrameIdRef.current || 0);
      } else {
        animationFrameIdRef.current = requestAnimationFrame(handleScan);
      }
    } catch {
      animationFrameIdRef.current = requestAnimationFrame(handleScan);
    }
  };

  const handleStopScan = () => {
    cancelAnimationFrame(animationFrameIdRef.current || 0);
  };

  React.useEffect(() => {
    handlePlayVideo(frontCamera);

    return () => {
      handleStopVideo();
    };
  }, [frontCamera]);

  React.useEffect(() => {
    handleScan();

    return () => {
      handleStopScan();
    };
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          streamRef.current?.getTracks().forEach((track) => {
            track.stop();
          });
        }}
      >
        STOP
      </Button>
      <Button
        onClick={() => {
          setFrontCamera((previous) => !previous);
        }}
      >
        toggle
      </Button>

      <Box sx={{ position: "relative" }}>
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
        <video
          ref={videoRef}
          width={375}
          height={667}
          style={{
            border: 1,
            borderColor: theme.palette.divider,
            borderStyle: "solid",
          }}
        ></video>
      </Box>
    </>
  );
};
