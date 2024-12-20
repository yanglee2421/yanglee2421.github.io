import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
} from "@mui/material";
import { type Container } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadBubblesPreset } from "@tsparticles/preset-bubbles";
import { loadSlim } from "@tsparticles/slim";
import React from "react";
import { Camera } from "@/components/shared/Camera";
import { Slider } from "./Slider";

const snowPro = initParticlesEngine(async (engine) => {
  await loadBubblesPreset(engine);
  await loadSlim(engine);
});

const ParticlesUI = () => {
  React.use(snowPro);
  const particlesLoaded = async (container?: Container) => {
    console.log(container);
  };

  return (
    <Particles
      options={{
        preset: "bubbles",
        background: { opacity: 0 },
      }}
      particlesLoaded={particlesLoaded}
    />
  );
};

export const Lab = () => {
  const id = React.useId();

  const handleCutImage = () => {
    const video = document.getElementById(id);

    if (!(video instanceof HTMLVideoElement)) {
      return;
    }

    const cvs = document.createElement("canvas");
    const ctx = cvs.getContext("2d");
    if (!ctx) {
      return;
    }

    const size = video.getBoundingClientRect();
    cvs.width = size.width;
    cvs.height = size.height;
    ctx.drawImage(
      video,
      0,
      0,
      size.width,
      size.height,
      0,
      0,
      cvs.width,
      cvs.height,
    );

    const link = document.createElement("a");
    link.href = cvs.toDataURL();
    link.download = Date.now() + ".png";
    link.click();
    link.remove();
  };

  return (
    <>
      <Stack spacing={6} sx={{ zIndex: 1, position: "relative" }}>
        <Card>
          <CardHeader title="Slider" />
          <CardContent>
            <Slider />
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Camera" />
          <CardContent>
            <Camera id={id} />
          </CardContent>
          <CardActions>
            <Button onClick={handleCutImage} variant="contained">
              cut image
            </Button>
          </CardActions>
        </Card>
      </Stack>
      <ParticlesUI />
    </>
  );
};
